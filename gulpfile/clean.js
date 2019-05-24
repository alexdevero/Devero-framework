'use strict'

import gulp from 'gulp'

import plumber from 'gulp-plumber'
import rimraf from 'gulp-rimraf'

// Clean dist
gulp.task('clean:dist', (done) => {
  console.log('Clean \'dist\' folder')

  return gulp.src('./dist/**/*', {
    read: false
  })
    .pipe(plumber())
    .pipe(rimraf())
    .on('end', () => {
      done()
   })

  // cb()
})

// Clean ship
gulp.task('clean:ship', (done) => {
  console.log('Clean \'ship\' folder')

  return gulp.src('./_ship/*', {
    read: false
  })
    .pipe(plumber())
    .pipe(rimraf())
    .on('end', () => {
      done()
   })

  // done()
})
