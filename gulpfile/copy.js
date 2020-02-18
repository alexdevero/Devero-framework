'use strict'

import gulp from 'gulp'

import changed from 'gulp-changed'
import plumber from 'gulp-plumber'
import prune from 'gulp-prune'

// Copy CSS files
gulp.task('copy:css', (done) => {
  return gulp.src([
    './src/styles/css/*',
    './node_modules/bootstrap/dist/css/bootstrap.css',
    './node_modules/bootstrap/dist/css/bootstrap.css.map',
    './node_modules/bootstrap/dist/css/bootstrap.min.css',
    './node_modules/bootstrap/dist/css/bootstrap.min.css.map'
  ])
    .pipe(plumber())
    .pipe(prune('./dist/styles/vendor'))
    .pipe(changed('./dist/styles/vendor'))
    .pipe(gulp.dest('./dist/styles/vendor'))
    .on('end', () => {
      done()
    })
})

// Copy font files
gulp.task('copy:fonts', (done) => {
  return gulp.src('./src/fonts/*')
    .pipe(plumber())
    .pipe(prune('./dist/fonts'))
    .pipe(changed('./dist/fonts'))
    .pipe(gulp.dest('./dist/fonts'))
    .on('end', () => {
      done()
    })
})

// Copy JS plugins files
gulp.task('copy:jsplugins', (done) => {
  return gulp.src([
    './src/scripts/plugins/*',
    './node_modules/vanilla-lazyload/dist/lazyload.min.js',
    './node_modules/vanilla-lazyload/dist/lazyload.min.js.map',
    // './node_modules/particlesjs/dist/particles.min.js'
  ])
    .pipe(plumber())
    .pipe(prune('./dist/scripts/plugins/'))
    .pipe(changed('./dist/scripts/plugins/'))
    .pipe(gulp.dest('./dist/scripts/plugins/'))
    .on('end', () => {
      done()
    })
})

// Copy JS vendor files
gulp.task('copy:jsvendor', (done) => {
  return gulp.src([
    './src/scripts/vendor/*',
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/jquery/dist/jquery.slim.min.js',
    './node_modules/jquery/dist/jquery.min.map',
    './node_modules/jquery/dist/jquery.slim.min.map',
    './node_modules/bootstrap/dist/js/bootstrap.js',
    './node_modules/bootstrap/dist/js/bootstrap.js.map',
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js.map'
  ])
    .pipe(plumber())
    .pipe(prune('./dist/scripts/vendor/'))
    .pipe(changed('./dist/scripts/vendor/'))
    .pipe(gulp.dest('./dist/scripts/vendor/'))
    .on('end', () => {
      done()
    })
})

// Copy other files
gulp.task('copy:other', (done) => {
  return gulp.src([
    './src/browserconfig.xml',
    './src/humans.txt',
    './src/manifest.json',
    './src/robots.txt',
    './src/contact.php'
  ])
    .pipe(plumber())
    .pipe(changed('./dist'))
    .pipe(gulp.dest('./dist'))
    .on('end', () => {
      done()
    })
})

// Copy video files
gulp.task('copy:videos', (done) => {
  return gulp.src([
    './src/videos/*'
  ])
    .pipe(plumber())
    .pipe(prune('./dist/videos'))
    .pipe(changed('./dist/videos'))
    .pipe(gulp.dest('./dist/videos'))
    .on('end', () => {
      done()
    })
})
