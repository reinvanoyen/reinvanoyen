"use strict";

const gulp = require('gulp'),
	favicons = require('gulp-favicons'),
	del = require('del'),
	gutil = require('gulp-util'),
	runtime = require('./runtime')
	;

gulp.task( 'favicons', cb => {

	console.log( gutil.colors.yellow( 'Running [ FAVICONS ] in ' + ( runtime.production ? 'production' : 'development' ) ) );

	del( [ 'build/favicons' ] );

	return gulp.src( 'assets/favicons/source.png' )
		.pipe( favicons( {
			icons: {
				android: true,
				appleIcon: true,
				favicons: true,
				opengraph: true,
				appleStartup: false,
				coast: false,
				firefox: false,
				windows: false,
				yandex: false
			},
			settings: {
				appName: null,
				appDescription: null,
				developer: null,
				developerURL: null,
				version: 1.0,
				background: null,
				index: null,
				url: null,
				silhouette: false,
				logging: true
			}
		} ) )
		.pipe( gulp.dest( 'build/favicons' ) )
		;
} );