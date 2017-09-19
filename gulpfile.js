"use strict";

const gulp = require('gulp');

require('./gulp/watch.js');
require('./gulp/images.js');
require('./gulp/css.js');
require('./gulp/javascript.js');
require('./gulp/favicons.js');
require('./gulp/build.js');

// default
gulp.task( 'default', [ 'watch' ] );