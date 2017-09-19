"use strict";

const gulp = require('gulp'),
	fi = require('gulp-if'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	runtime = require('./runtime')
	;

gulp.task( 'images', () => {

	return gulp.src( 'style/img/**/*' )
		.pipe( fi( runtime.production, imagemin( {
			progressive: true,
			svgoPlugins: [ { removeViewBox: false } ],
			use: [ pngquant() ]
		} ) ) )
		.pipe( gulp.dest( 'build/css/img/' ) )
		;
} );