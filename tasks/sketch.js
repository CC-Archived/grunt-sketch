/*
 * [grunt-sketch](http://github.com/CodeCatalyst/grunt-sketch) v1.0.3
 * Copyright (c) 2014-2015 [CodeCatalyst, LLC](http://www.codecatalyst.com/).
 * Open source under the [MIT License](http://en.wikipedia.org/wiki/MIT_License).
 */

'use strict';

var _ = require( 'underscore' );
var async = require( 'async' );
var numCPUs = require( 'os' ).cpus().length;
var spawn = require( 'child_process' ).spawn;
var which = require( 'which' );

module.exports = function ( grunt ) {

	// Task parameter and option value conversion helper functions.

	function flatten( value ) {
		return _.isArray( value ) ? value.join( ',' ) : value;
	}

	function yesNo( value ) {
		return value ? 'YES' : 'NO';
	}

	// Tasks definitions.

	var bin = 'sketchtool';

	var tasks = [
		{
			name: 'sketch_export',
			action: 'export',
			destinationOption: 'output',
			parameters: [
				{
					name: 'type',
					options: [ 'pages', 'artboards', 'slices' ],
					required: true
				}
			],
			options: [
				{
					name: 'background'
				},
				{
					name: 'bounds',
					convert: flatten
				},
				{
					name: 'compact',
					convert: yesNo
				},
				{
					name: 'compression'
				},
				{
					name: 'formats',
					convert: flatten
				},
				{
					name: 'groupContentsOnly',
					alias: 'group-contents-only',
					convert: yesNo
				},
				{
					name: 'items',
					convert: flatten
				},
				{
					name: 'overwrite',
					alias: 'overwriting',
					convert: yesNo
				},
				{
					name: 'progressive',
					convert: yesNo
				},
				{
					name: 'reveal',
					convert: yesNo
				},
				{
					name: 'saveForWeb',
					alias: 'save-for-web',
					convert: yesNo
				},
				{
					name: 'scales',
					convert: flatten
				},
				{
					name: 'trimmed',
					convert: yesNo
				}
			],
			help: 'Exports elements from a Sketch document.'
		},
		{
			name: 'sketch_list',
			action: 'list',
			destinationOption: 'outputJSON',
			parameters: [
				{
					name: 'type',
					options: [ 'pages', 'layers', 'artboards', 'slices' ],
					required: true
				}
			],
			help: 'Lists the elements available for export from a Sketch document.'
		},
		{
			name: 'sketch_dump',
			action: 'dump',
			destinationOption: 'outputJSON',
			help: 'Dumps the structure of a Sketch document as JSON.'
		}
	];

	// Ensure SketchTool is installed and available in the path.
	function ensureSketchtool() {
		try {
			which.sync( bin );
		} catch ( err ) {
			grunt.warn(
				'\nSketchTool must be installed and in your PATH for this task to work.\n' +
				'Please see: https://github.com/CodeCatalyst/grunt-sketch\n'
			);
			return false;
		}
		return true;
	}

	// Internal helper functions.

	function registerTask( task ) {
		grunt.registerMultiTask( task.name, task.help, function () {
			var done = this.async();
			if ( ensureSketchtool() ) {
				var options = this.options();

				async.eachLimit( this.files, numCPUs, function ( file, next ) {
					var command = createCommand( task, file, options );
					if ( command ) {
						executeCommand( command, next );
					}
					else {
						next();
					}
				}, done );
			} else {
				done(false);
			}

		} );
	}

	function getSourceFile( file ) {
		var src = file.src[0];
		if ( !_.isString( src ) ) {
			src = file.orig.src[ 0 ];
		}
		return src;
	}

	function getDestinationFile( file ) {
		return file.dest;
	}

	function convertValue( value, convert ) {
		return _.isFunction( convert ) ? convert( value ) : value;
	}

	function validateCommandParameter( parameter, value ) {
		if ( parameter.required && _.isUndefined( value ) ) {
			grunt.warn( '"' + parameter.name + '" is required.' );
			return false;
		}
		if ( parameter.options && ! _.contains( parameter.options, value ) ) {
			grunt.warn(
				'"' + value + '" is not a valid option for "' + parameter.name + '".\n' +
				'Valid option are: ' + parameter.options.join( ', ' ) + '.\n'
			);
			return false;
		}
		return true;
	}

	function formatCommandOption( name, value ) {
		return '--' + name + '=' + value;
	}

	function createCommand( task, file, options ) {
		var source = getSourceFile( file );
		var destination = getDestinationFile( file );

		if ( !grunt.file.exists( source ) ) {
			grunt.warn( 'Source file "' + source + '" not found.' );
			return null;
		}

		var args = [];

		if ( task.action ) {
			args.push( task.action );
		}

		if ( _.isArray( task.parameters ) ) {
			task.parameters.forEach( function ( parameter ) {
				var value = parameter.value || options[ parameter.name ];
				if ( !validateCommandParameter( parameter, value ) ) {
					return null;
				}
				if ( !_.isUndefined( value ) ) {
					args.push( convertValue( value, parameter.convert ) );
				}
			} );
		}

		args.push( source );

		if ( task.destinationOption && !_.isUndefined( destination ) ) {
			args.push( formatCommandOption( task.destinationOption, destination ) );
		}

		if ( _.isArray( task.options ) ) {
			task.options.forEach( function ( option ) {
				var value = option.value || options[ option.name ];
				if ( !_.isUndefined( value ) ) {
					args.push( formatCommandOption( option.alias || option.name, convertValue( value, option.convert ) ) );
				}
			} );
		}

		return args;
	}

	function executeCommand( args, next ) {
		var process = spawn( bin, args, { stdio: 'inherit' } );

		process.on( 'error', function ( err ) {
			grunt.warn( err );
		} );

		process.on( 'close', function ( code ) {
			if ( code > 0 ) {
				return grunt.warn( 'Exited with error code ' + code );
			}
			next();
		} );
	}

	// Register the tasks declared above.

	tasks.forEach( function ( task ) {
		registerTask( task );
	} );
};
