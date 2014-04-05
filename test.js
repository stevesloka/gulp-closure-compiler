'use strict';
var assert = require('assert');
var closureCompiler = require('./index');
var gutil = require('gulp-util');
var vinylFile = require('vinyl');

it('should minify JS', function (done) {
	var execFile = function(cmd, args, cb) {
    assert.equal(cmd, 'java');
    assert.equal(args[0], '-jar');
    assert.equal(args[1], '-XX:+TieredCompilation');
    assert.equal(args[2], 'compiler.jar');
    assert.ok(/^--flagfile=/.test(args[3]));
    assert.ok(/^--js_output_file=/.test(args[4]));
    done();
  };
  var options = {
     compilerPath: 'compiler.jar',
     fileName: 'foo.js'
  };

  var stream = closureCompiler(options, execFile);

  var fakeFile = new vinylFile({
    cwd: 'cwd',
    path: 'path',
    contents: new Buffer('abufferwiththiscontent')
  });
  stream.write(fakeFile);
  stream.end()

});