# grunt-sketch [![Build Status](https://travis-ci.org/CodeCatalyst/grunt-sketch.png?branch=master)](https://travis-ci.org/CodeCatalyst/grunt-sketch)

> A grunt plugin for exporting images from [Sketch](http://bohemiancoding.com/sketch/) documents via [SketchTool](http://bohemiancoding.com/sketch/tool/).

## Installation

Download and install [SketchTool](http://bohemiancoding.com/sketch/tool/), and add it to your `PATH`.

This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins.

Once you're familiar with that process, you may install this plugin with this command:

```bash
npm install grunt-sketch --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sketch');
```

## Example

```js
grunt.initConfig({
	// ...

	sketch_export: {
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
		src: 'src/sketch/Grunt Logo.sketch',
		dest: 'build/assets'
	},

	// ...
});
```

## Tasks

### Task: sketch_export

Exports elements from a Sketch document.

#### options.type
Type: `String`
Valid values: `pages`, `artboards`, or `slices`.

The type of document element(s) to export.

#### options.items
Type: `Array`
Example values: `Page 1`, `2F21380F-F294-4B5A-AB5C-2ECC21F745BA`

The names or identifiers of the document elements to export.

#### options.formats
Type: `Array`
Valid values: `png`, `jpg`, `pdf`, `eps`, `svg`

The file formats to export.

#### options.scales
Type: `Array`
Example values: `1.0`, `2.0`

The scales to export.

#### options.bounds
Type: `String`
Example value: `-631.000000,-336.000000,380.000000,444.000000`

The boundary rectangle to export.

#### options.overwrite
Type: `Boolean`

Indicates whether to overwrite existing files when exporting.

#### options.compression
Type: `Number`

Indicates the compression level to use when exporting, if applicable.

#### options.progressive
Type: `Boolean`

Indicates whether to export in progressive format, if applicable.

#### options.saveForWeb
Type: `Boolean`

Indicates whether to "save for the web" - stripping unnecessary metadata.

### Task: sketch_list

Lists document element information in JSON format.

#### options.type
Type: `String`
Valid values: `pages`, `artboards`, or `slices`.

The type of document element(s) to list.

### Task: sketch_dump

Dumps document structure information in JSON format.

## Acknowledgements

* [Bohemian Coding](http://bohemiancoding.com/about-us/), for creating [Sketch](http://bohemiancoding.com/sketch/) and [SketchTool](http://bohemiancoding.com/sketch/tool/).
* [Kevin Kazmierczak](https://github.com/kazmiekr), whose [Grunt plugin for Sencha Cmd](https://github.com/kazmiekr/grunt-sencha-build) served as a very useful reference.
* [Sindre Sorhus](https://github.com/sindresorhus), whose [Grunt plugin for SASS](https://github.com/gruntjs/grunt-contrib-sass) served as a very useful reference.

## License

Copyright (c) 2014 [CodeCatalyst, LLC](http://www.codecatalyst.com/)

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
