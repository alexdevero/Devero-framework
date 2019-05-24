'use strict'

import gulp from 'gulp'

import changed from 'gulp-changed'
import plumber from 'gulp-plumber'
import prune from 'gulp-prune'
import rename from 'gulp-rename'

// Copy CSS files
gulp.task('copy:css', (done) => {
  gulp.src([
    './src/css/*',
    './node_modules/bootstrap/dist/css/bootstrap.css',
    './node_modules/bootstrap/dist/css/bootstrap.css.map',
    './node_modules/bootstrap/dist/css/bootstrap.min.css',
    './node_modules/bootstrap/dist/css/bootstrap.min.css.map'
  ])
  .pipe(plumber())
  .pipe(prune('./dist/css/vendor'))
  .pipe(changed('./dist/css/vendor'))
  .pipe(gulp.dest('./dist/css/vendor'))
  .on('end', () => {
    done()
  })

  // Use Reboot provided by Bootstrap
  // return gulp.src('./node_modules/normalize.css/normalize.css')
  //   .pipe(rename({
  //     basename: '_normalize',
  //     extname: '.scss'
  //   }))
  //   .pipe(changed('./src/styles/_base/'))
  //   .pipe(gulp.dest('./src/styles/_base/'))

  // done()
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

    // done()
})

// Copy JS plugins files
gulp.task('copy:jsplugins', (done) => {
  return gulp.src([
      './src/js/plugins/*'
      // './node_modules/vanilla-lazyload/dist/lazyload.min.js',
      // './node_modules/particlesjs/dist/particles.min.js'
    ])
    .pipe(plumber())
    .pipe(prune('./dist/js/plugins/'))
    .pipe(changed('./dist/js/plugins/'))
    .pipe(gulp.dest('./dist/js/plugins/'))
    .on('end', () => {
      done()
    })

    // done()
})

// Copy JS vendor files
gulp.task('copy:jsvendor', (done) => {
  return gulp.src([
      './src/js/vendor/*',
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
    .pipe(prune('./dist/js/vendor/'))
    .pipe(changed('./dist/js/vendor/'))
    .pipe(gulp.dest('./dist/js/vendor/'))
    .on('end', () => {
      done()
    })

    // done()
})

// Copy other files
gulp.task('copy:other', (done) => {
  return gulp.src([
    './src/humans.txt',
    './src/robots.txt',
    './src/contact.php'
  ])
    .pipe(plumber())
    .pipe(changed('./dist'))
    .pipe(gulp.dest('./dist'))
    .on('end', () => {
      done()
    })

    // done()
})

// Copy font files
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

    // done()
})
