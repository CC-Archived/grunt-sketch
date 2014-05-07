/*
 * [grunt-sketch](http://github.com/CodeCatalyst/grunt-sketch) v1.0.1
 * Copyright (c) 2014 [CodeCatalyst, LLC](http://www.codecatalyst.com/).
 * Open source under the [MIT License](http://en.wikipedia.org/wiki/MIT_License).
 */

'use strict';

var grunt = require( 'grunt' );
var path = require( 'path' );

function assertFilesMatch( test, actual, expected, message ) {
	var actualData = grunt.file.read( actual );
	var expectedData = grunt.file.read( expected );

	test.ok( actualData === expectedData, 'expected ' + actual + ' to match ' + expected );
}

exports.sketch = {
	setUp: function ( done ) {
		// setup here if necessary
		done();
	},
	test_options: function ( test ) {
		test.expect( 12 );

		assertFilesMatch( test, 'tmp/Grunt Logo.png', 'test/expected/Grunt Logo.png' );
		assertFilesMatch( test, 'tmp/Grunt Logo@2x.png', 'test/expected/Grunt Logo@2x.png' );

		assertFilesMatch( test, 'tmp/Grunt Logo.jpg', 'test/expected/Grunt Logo.jpg' );
		assertFilesMatch( test, 'tmp/Grunt Logo@2x.jpg', 'test/expected/Grunt Logo@2x.jpg' );

		assertFilesMatch( test, 'tmp/Symbol.png', 'test/expected/Symbol.png' );
		assertFilesMatch( test, 'tmp/Symbol@2x.png', 'test/expected/Symbol@2x.png' );

		assertFilesMatch( test, 'tmp/Symbol.jpg', 'test/expected/Symbol.jpg' );
		assertFilesMatch( test, 'tmp/Symbol@2x.jpg', 'test/expected/Symbol@2x.jpg' );

		assertFilesMatch( test, 'tmp/Text.png', 'test/expected/Text.png' );
		assertFilesMatch( test, 'tmp/Text@2x.png', 'test/expected/Text@2x.png' );

		assertFilesMatch( test, 'tmp/Text.jpg', 'test/expected/Text.jpg' );
		assertFilesMatch( test, 'tmp/Text@2x.jpg', 'test/expected/Text@2x.jpg' );

		test.done();
	}
};
