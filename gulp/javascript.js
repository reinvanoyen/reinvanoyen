"use strict";

const gulp = require('gulp'),
	browserify = require('browserify'),
	del = require('del'),
	buffer = require('vinyl-buffer'),
	rev = require('gulp-rev'),
	source = require('vinyl-source-stream'),
	fi = require('gulp-if'),
	plumber = require('gulp-plumber'),
	gutil = require('gulp-util'),
	uglify = require('gulp-uglify'),
	error = require('./error'),
	runtime = require('./runtime')
	;

gulp.task( 'javascript', () => {

	console.log( gutil.colors.yellow( 'Running [ JS ] in ' + ( runtime.production ? 'production' : 'development' ) ) );

	del( [ 'build/js' ] );

	if( ! runtime.production ) {
		del( [ 'rev-manifest.json' ] );
	}

	return browserify( 'js/app.js' )
		.transform( 'babelify', { presets: ['es2015'] } )
		.bundle()
		.pipe( source( 'bundle.js' ) )
		.pipe( gulp.dest( 'build/js' ) )
		.pipe( buffer() )
		.pipe( fi( runtime.production, uglify() ) )
		.pipe( fi( runtime.production, rev() ) )
		.pipe( fi( runtime.production, gulp.dest( 'build/js' ) ) )
		.pipe( fi( runtime.production, rev.manifest( {
			cwd: process.cwd(),
			merge: true
		} ) ) )
		.pipe( fi( runtime.production, gulp.dest( './' ) ) )
		;
} );