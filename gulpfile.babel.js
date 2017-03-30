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
gulp.task('dev', sequence('build', 'watch'));

// Test task for testing HTML, Sass and JavaScript
gulp.task('test', sequence('html:test', 'sass:test', 'js:test'));

// Watch HTML, CSS and JavaScript files
gulp.task('watch', ['server'], () => {
  gulp.watch('src/*.html', ['html:min']);
  gulp.watch('src/*.php', ['copy:php']);
  gulp.watch(['src/*.php', 'src/*.txt'], ['copy:other']);
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/css/**/*.css', ['copy:css']);
  gulp.watch('src/js/main.js', ['js']);
  gulp.watch(['src/images/**/*', '!src/images/**/*.rar'], ['images']);
});

// Create default task (cmd: gulp)
gulp.task('default', ['dev']);
