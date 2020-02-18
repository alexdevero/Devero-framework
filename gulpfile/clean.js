import gulp from 'gulp'

import ignore from 'gulp-ignore'
import plumber from 'gulp-plumber'
import rimraf from 'gulp-rimraf'

// Clean dist
gulp.task('clean:dist', (done) => {
  console.log('Clean \'dist\' folder')

  return gulp.src('./dist/**/*')
    .pipe(plumber())
    .pipe(rimraf('./dist/**/*'))
    .on('end', () => {
      done()
    })

  // cb()
})

// Clean ship
gulp.task('clean:ship', (done) => {
  console.log('Clean \'ship\' folder')

  return gulp.src('./_ship/*')
    .pipe(plumber())
    .pipe(ignore.exclude('./_ship/material-template.zip'))
    .pipe(rimraf())
    .on('end', () => {
      done()
    })

  // done()
})
