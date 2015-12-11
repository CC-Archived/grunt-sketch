/*
 * [grunt-sketch](http://github.com/CodeCatalyst/grunt-sketch) v1.0.3
 * Copyright (c) 2014-2015 [CodeCatalyst, LLC](http://www.codecatalyst.com/).
 * Open source under the [MIT License](http://en.wikipedia.org/wiki/MIT_License).
 */

'use strict';

var grunt = require( 'grunt' );
var exec = require('child_process').exec;

function assertFilesMatch( test, actual, expected, message ) {
	var actualData = grunt.file.read( actual );
	var expectedData = grunt.file.read( expected );

	test.ok( actualData === expectedData, 'expected ' + actual + ' to match ' + expected );
}

exports.sketch = {
	setUp: function ( done ) {
		exec( './generate_fixtures.sh', { cwd: 'test' }, function ( error )  {
			done( error );
		} );

	},
	grunt_logo: function ( test ) {
		test.expect( 12 );

		assertFilesMatch( test, 'tmp/Grunt Logo.png', 'test/fixtures/generated/Grunt Logo.png' );
		assertFilesMatch( test, 'tmp/Grunt Logo@2x.png', 'test/fixtures/generated/Grunt Logo@2x.png' );

		assertFilesMatch( test, 'tmp/Grunt Logo.jpg', 'test/fixtures/generated/Grunt Logo.jpg' );
		assertFilesMatch( test, 'tmp/Grunt Logo@2x.jpg', 'test/fixtures/generated/Grunt Logo@2x.jpg' );

		assertFilesMatch( test, 'tmp/Symbol.png', 'test/fixtures/generated/Symbol.png' );
		assertFilesMatch( test, 'tmp/Symbol@2x.png', 'test/fixtures/generated/Symbol@2x.png' );

		assertFilesMatch( test, 'tmp/Symbol.jpg', 'test/fixtures/generated/Symbol.jpg' );
		assertFilesMatch( test, 'tmp/Symbol@2x.jpg', 'test/fixtures/generated/Symbol@2x.jpg' );

		assertFilesMatch( test, 'tmp/Text.png', 'test/fixtures/generated/Text.png' );
		assertFilesMatch( test, 'tmp/Text@2x.png', 'test/fixtures/generated/Text@2x.png' );

		assertFilesMatch( test, 'tmp/Text.jpg', 'test/fixtures/generated/Text.jpg' );
		assertFilesMatch( test, 'tmp/Text@2x.jpg', 'test/fixtures/generated/Text@2x.jpg' );

		test.done();
	}
};
