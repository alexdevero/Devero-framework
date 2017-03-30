'use strict';

import gulp from 'gulp';
import plumber from 'gulp-plumber';

// Minify HTML files
gulp.task('html:min', () => {
  const changed = require('gulp-changed');
  const connect = require('gulp-connect');
  const htmlmin = require('gulp-htmlmin');
  const rename = require('gulp-rename');

  return gulp.src('src/*.html')
    .pipe(plumber())
    .pipe(changed('dist'))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

// Hint HTML files
gulp.task('html:test', () => {
  const htmlhint = require('gulp-htmlhint');

  return gulp.src('src/*.html')
    .pipe(plumber())
    .pipe(htmlhint())
    .pipe(htmlhint.reporter())
    .pipe(htmlhint.failReporter({
      suppress: false
    }));
});