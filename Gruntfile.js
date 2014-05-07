/*
 * [grunt-sketch](http://github.com/CodeCatalyst/grunt-sketch) v1.0.1
 * Copyright (c) 2014 [CodeCatalyst, LLC](http://www.codecatalyst.com/).
 * Open source under the [MIT License](http://en.wikipedia.org/wiki/MIT_License).
 */

'use strict';

module.exports = function ( grunt ) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: [ 'tmp' ]
		},

		// Configuration to be run (and then tested).
		sketch_export: {
			test_options: {
				options: {
					type: 'slices',
					items: [
						'Grunt Logo',
						'Symbol',
						'Text'
					],
					scales: [
						1.0,
						2.0
					],
					formats: [
						'png',
						'jpg'
					]
				},
				src: 'test/fixtures/Grunt Logo.sketch',
				dest: 'tmp'
			}
		},

		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js']
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks( 'tasks' );

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask( 'test', [ 'clean', 'sketch_export', 'nodeunit' ] );

	// By default, lint and run all tests.
	grunt.registerTask( 'default', [ 'jshint', 'test' ] );
};