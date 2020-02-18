'use strict'

import gulp from 'gulp'

import requireDir from 'require-dir'

const environment = process.env.NODE_ENV
if (environment !== undefined) {
  console.log(`Environment: ${environment}`)
}

requireDir('./gulpfile/')

// Clean 'dist' directory
gulp.task('clean', gulp.series('clean:dist'))

// Automate copying
gulp.task('copy', gulp.series('copy:css', 'copy:fonts', 'copy:jsplugins', 'copy:jsvendor', 'copy:other', 'copy:videos'))

// Compile Sass to CSS - default
gulp.task('sass:default', gulp.series('sass:development', 'sass:min', 'sass:themes', 'sass:themesmin'))

// Compile Sass to CSS - production
gulp.task('sass:production', gulp.series('sass:prod', 'sass:min', 'sass:themes', 'sass:themesmin'))

// Theme generator task
gulp.task('themes', gulp.series('sass:themes', 'sass:themesmin'))

// Build task
gulp.task('build:development', gulp.series('hb:dev', 'copy', 'sass:default', 'images', 'js:development'/*, 'js:min'*/))

// Build task for production
gulp.task('build:production', gulp.series('clean:dist', 'hb:prod', 'hb:min', 'copy', 'sass:production', 'images', 'js:source', 'js:min'))

// Automate packaging tasks
gulp.task('zip', gulp.series('zip:dist', 'zip:license', 'zip:mockups', /*'zip:template'*/))

// Watch HTML, CSS and JavaScript files
gulp.task('watch', () => {
  gulp.watch('src/*.php', gulp.parallel('copy:other'))
  gulp.watch('src/css/**/*.css', gulp.parallel('copy:css'))
  gulp.watch('src/templates/**/*.*', gulp.parallel('hb:dev'))
  // gulp.watch('./src/*.html', gulp.parallel('html:development', 'html:min'))
  gulp.watch('./src/styles/**/*.scss', gulp.parallel('sass:development', 'sass:min'))
  gulp.watch('./src/js/**/*.js', gulp.parallel('js:development', 'js:min'))
  gulp.watch('./src/ts/**/*.ts', gulp.parallel('ts:development', 'ts:min'))
  gulp.watch(['./src/images/**/*', '!./src/images/**/*.rar'], gulp.parallel('images'))
})

// Default tasks (cmd: gulp)
gulp.task('default', gulp.series('build:development', gulp.parallel('watch', 'server')))

// Prepare zip archive for sale
gulp.task('ship', gulp.series('clean:ship', 'build:production', 'zip', 'clean:dist', /*'clean:ship'*/))

// Test task for testing HTML, Sass and JavaScript
gulp.task('test', gulp.series('html:test', 'sass:test', 'js:test'))
