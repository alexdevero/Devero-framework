import gulp from 'gulp'

import plumber from 'gulp-plumber'
import zip from 'gulp-zip'

// Zip dist directory
gulp.task('zip:dist', (done) => {
  return gulp.src('./dist/**/*')
    .pipe(plumber())
    .pipe(gulp.dest('./_ship/material-3.0/source-code'))
    .on('end', () => {
      done()
    })

  // done()
})

// Zip mockups directory
gulp.task('zip:mockups', (done) => {
  return gulp.src('./_mockups/**/*')
    .pipe(plumber())
    .pipe(gulp.dest('./_ship/material-3.0/mockups'))
    .on('end', () => {
      done()
    })

  // done()
})

// Zip all directory
gulp.task('zip:license', (done) => {
  return gulp.src('./Licensing.zip')
    .pipe(plumber())
    .pipe(gulp.dest('./_ship/material-3.0'))
    .on('end', () => {
      done()
    })

  // done()
})

gulp.task('zip:template', (done) => {
  return gulp.src('./_ship/material-3.0/**/*', { base: './_ship/' })
    .pipe(plumber())
    .pipe(zip('material-3.0-template.zip'))
    .pipe(gulp.dest('./_ship/'))
    .on('end', () => {
      done()
    })

  // done()
})
