'use strict';

import gulp from 'gulp';
import plumber from 'gulp-plumber';

// Concatenate JavaScript files
gulp.task('js:concat', function() {
  const concat = require('gulp-concat');

  return gulp.src('./src/js/main.js')
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('./dist/js/'));
});

// Minify JavaScript files
gulp.task('js', () => {
  const babel = require('gulp-babel');
  const changed = require('gulp-changed');
  const connect = require('gulp-connect');

  return gulp.src('src/js/main.js')
    .pipe(plumber())
    .pipe(changed('dist/js'))
    .pipe(babel())
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

// Minify JavaScript main file
gulp.task('js:min', () => {
  const babel = require('gulp-babel');
  const changed = require('gulp-changed');
  const connect = require('gulp-connect');
  const rename = require('gulp-rename');
  const uglify = require('gulp-uglify');

  return gulp.src('src/js/main.js')
    .pipe(plumber())
    .pipe(changed('dist/js'))
    .pipe(babel())
    .pipe(uglify().on('error', (e) => {
      console.log(e + '\r\n There\'s something wrong with the JavaScript file(s).')
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

gulp.task('js:test', () => {
  const eslint = require('gulp-eslint');

  return gulp.src('./src/js/main.js')
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
});