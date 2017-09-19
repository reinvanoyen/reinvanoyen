"use strict";

const gutil = require('gulp-util');

module.exports = err => console.log( gutil.colors.red( err ) );