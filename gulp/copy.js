'use strict';

import gulp from 'gulp';
import changed from 'gulp-changed';
import plumber from 'gulp-plumber';

// Copy CSS files
gulp.task('copy:css', () => {
  return gulp.src('src/css/*')
    .pipe(plumber())
    .pipe(changed('dist/css'))
    .pipe(gulp.dest('dist/css'));
});

// Copy HTML files
gulp.task('copy:html', () => {
  return gulp.src('src/*.html')
    .pipe(plumber())
    .pipe(changed('dist'))
    .pipe(gulp.dest('dist'))
});

// Copy font files
gulp.task('copy:fonts', () => {
  return gulp.src(['src/fonts/*', '!src/fonts/*.rar'])
    .pipe(plumber())
    .pipe(changed('dist/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

// Copy JavaScript plugins files
gulp.task('copy:jsplugins', () => {
  gulp.src([
      'src/js/plugins/*',
      '!src/js/plugins/*.rar'
    ])
      .pipe(plumber())
      .pipe(changed('dist/js/plugins/'))
      .pipe(gulp.dest('dist/js/plugins/'));
});

// Copy JavaScript vendor files
gulp.task('copy:jsvendor', () => {
  return gulp.src([
      'src/js/vendor/*',
      '!src/js/vendor/*.rar'
    ])
      .pipe(plumber())
      .pipe(changed('dist/js/vendor/'))
      .pipe(gulp.dest('dist/js/vendor/'));
});

// Copy other files
gulp.task('copy:other', () => {
  return gulp.src([
    'src/.htaccess',
    'src/crossdomain.xml',
    'src/humans.txt',
    'src/robots.txt',
    'src/contact.php'
  ])
    .pipe(plumber())
    .pipe(changed('dist'))
    .pipe(gulp.dest('dist'));
});

// Copy PHP files
gulp.task('copy:php', () => {
  return gulp.src('src/*.php')
    .pipe(plumber())
    .pipe(changed('dist'))
    .pipe(gulp.dest('dist'))
});