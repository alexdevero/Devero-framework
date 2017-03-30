'use strict';

import gulp from 'gulp';
import rimraf from 'rimraf';

// Clean dist
gulp.task('clean:dist', (cb) => {
 rimraf('./dist', cb)
});
