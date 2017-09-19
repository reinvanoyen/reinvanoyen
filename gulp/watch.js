"use strict";

const gulp = require( 'gulp' );

gulp.task( 'watch', function() {

	gulp.watch( 'style/sass/**/*.scss', ['css'] );

	gulp.watch( 'js/**/*.js', ['javascript'] );
	//gulp.watch( 'app/**/*' ).on( 'change', bs.reload );
	gulp.watch( 'style/img/**/*', ['images'] );
} );