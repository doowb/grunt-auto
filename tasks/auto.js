/*
 * grunt-auto
 * https://github.com/doowb/grunt-auto
 *
 * Copyright (c) 2014 Brian Woodward
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {


  grunt.registerMultiTask('auto', 'This is a multitask that should run automatically if not defined in the Gruntfile', function () {

    var options = this.options({
      punctuation: '.',
      separator: ', '
    });

    // Iterate over all specified file groups.
    this.files.forEach(function (f) {
      // Concat specified files.
      var src = f.src.filter(function (filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function (filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

      // Handle options.
      src += options.punctuation;

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

  // if there isn't a target configured for 'auto', then add one.
  if (!grunt.config('auto')) {

    var defaultConfig = {
      options: {},
      files: {
        'tmp/default_options': ['test/fixtures/testing', 'test/fixtures/123'],
      },
    };

    var customOptions = {
      options: {
        separator: ': ',
        punctuation: ' !!!',
      },
      files: {
        'tmp/custom_options': ['test/fixtures/testing', 'test/fixtures/123'],
      },
    };

    grunt.config('auto.default_options', defaultConfig);
    grunt.config('auto.custom_options', customOptions);
  }

};