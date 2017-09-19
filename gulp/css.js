"use strict";

const gulp = require('gulp'),
	gutil = require('gulp-util'),
	beep = require('beepbeep'),
	sass = require('gulp-sass')
	;

// Linting with PostCSS
const postcss = require('gulp-postcss'),
	scss = require('postcss-scss'),
	reporter = require('postcss-reporter'),
	stylelint = require('stylelint')
	;

const plumber = require('gulp-plumber'),
	base64 = require('gulp-base64'),
	cssnano = require('gulp-cssnano'),
	rev = require('gulp-rev'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	del = require('del'),
	fi = require('gulp-if'),
	error = require('./error'),
	runtime = require('./runtime')
	;

// Load config
const config = require('../config.json');

gulp.task( 'css', () => {

	console.log( gutil.colors.yellow( 'Running [ CSS ] in ' + ( runtime.production ? 'production' : 'development' ) ) );

	del( [ 'build/css/**/*.css' ] );
	del( [ 'build/css/**/*.map' ] );

	if( ! runtime.production ) {
		del( [ 'rev-manifest.json' ] );
	}

	let processors = [
		stylelint( config.stylelint ),
		reporter( {
			clearMessages: true,
			formatter: function( input ) {

				let msgs = input.messages;
				let len = input.messages.length;

				console.log( gutil.colors.white.bgRed.bold( 'FILE [' + input.source + ']' ) );

				msgs.forEach( msg => {
					let color = ( msg.type == 'warning' ? gutil.colors.yellow : gutil.colors.red );
					console.log( gutil.colors.black.bgWhite( '[' + msg.line + ':' + msg.column + ']' ) + ' ' + color( msg.text ) );
				} );

				return gutil.colors.red( len + ' issues to be fixed' );
			}
		} )
	];

	return gulp.src( 'style/sass/**/*.scss' )
		.pipe( plumber( { errorHandler: error } ) )
		.pipe( fi( !runtime.production, postcss( processors, { syntax: scss } ) ) )
		.pipe( fi( !runtime.production, sourcemaps.init() ) )
		.pipe( sass() )
		.pipe( fi( runtime.production, base64( {
			baseDir: 'style',
			extensions: ['svg', 'png', 'jpg', 'jpeg', 'gif'],
			debug: true
		} ) ) )
		.pipe( autoprefixer( 'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1' ) )
		.pipe( fi( runtime.production, cssnano() ) )
		.pipe( fi( runtime.production, rev() ) )
		.pipe( fi( !runtime.production, sourcemaps.write( '.' ) ) )
		.pipe( gulp.dest( 'build/css' ) )
		.pipe( fi( runtime.production, rev.manifest( {
			cwd: process.cwd(),
			merge: true
		} ) ) )
		.pipe( fi( runtime.production, gulp.dest( './' ) ) )
	;
} );