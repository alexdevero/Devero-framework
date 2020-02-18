'use strict'

import gulp from 'gulp'

// Compress images
gulp.task('images', (done) => {
  const changed = require('gulp-changed')
  const imagemin = require('gulp-imagemin')
  const plumber = require('gulp-plumber')
  const prune = require('gulp-prune')

  return gulp.src('src/images/**/*')
    .pipe(plumber())
    .pipe(prune('./dist/images'))
    .pipe(changed('dist/images'))
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo({
        plugins: [
          {
            removeViewBox: false
          },
          {
            cleanupIDs: false
          }
        ]
      })
    ]))
    .pipe(gulp.dest('dist/images'))
    .on('end', () => {
      done()
    })
})
