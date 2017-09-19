"use strict";

const gulp = require('gulp'),
	gutil = require('gulp-util'),
	seq = require('run-sequence'),
	runtime = require( './runtime' ),
	notifier = require('node-notifier')
	;

gulp.task( 'build', cb => {

	if( gutil.env.production ) {
		runtime.production = true;
	}

	seq( 'css', 'javascript', 'favicons', () => {
		notifier.notify( {
			'title': '[DRY] Build finished',
			'message': 'Build successfully finished'
		} );
		cb();
	} );
} );