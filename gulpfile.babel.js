'use strict';

import gulp from 'gulp';
import requireDir from 'require-dir';
import sequence from 'gulp-sequence';

requireDir('./gulp/');

// Automate copying
gulp.task('copy:all', [
  'copy:css',
  'copy:html',
  'copy:fonts',
  'copy:jsplugins',
  'copy:jsvendor',
  'copy:other',
  'copy:php'
]);

// Builds the website
gulp.task('build', sequence(['html:min', 'copy:all'], ['images', 'sass', 'sass:min', 'js', 'js:min']));

// Clean dist folder
gulp.task('clean', ['clean:dist']);

// Setup development environment
gulp.task('dev', sequence('build', 'server'));

// Test task for testing HTML, Sass and JavaScript
gulp.task('test', sequence('html:test', 'sass:test', 'js:test'));

// Start server and watch HTML, CSS and JavaScript files for changes
gulp.task('server', ['browser-sync'], () => {
  const browserSync = require('browser-sync');
  const reload = browserSync.reload;

  gulp.watch('src/*.html', ['html:min'], reload);
  gulp.watch('src/*.php', ['copy:php'], reload);
  gulp.watch(['src/*.php', 'src/*.txt'], ['copy:other'], reload);
  gulp.watch('src/scss/**/*.scss', ['sass'], reload);
  gulp.watch('src/css/**/*.css', ['copy:css'], reload);
  gulp.watch('src/js/main.js', ['js'], reload);
  gulp.watch(['src/images/**/*', '!src/images/**/*.rar'], ['images'], reload);
});

// Create default task (cmd: gulp)
gulp.task('default', ['dev']);
