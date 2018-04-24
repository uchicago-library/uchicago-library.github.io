'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass'); // Requires the gulp-sass plugin
var browserSync = require('browser-sync').create();


gulp.task('sass', function(){
  return gulp.src('css/**/*.scss') // Gets all files ending with .scss in src/scss and children dirs
    .pipe(sass())
    .pipe(gulp.dest('css'))
	.pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('css/**/*.scss', ['sass']);
  gulp.watch('*.html', browserSync.reload);
})

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
})

gulp.task("default", ["sass", "watch"], function() {
});
