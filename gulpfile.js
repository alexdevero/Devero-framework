'use strict';

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var changed = require('gulp-changed');
var gulpCopy = require('gulp-copy');
var html5Lint = require('gulp-html5-lint');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var pngquant = require('imagemin-pngquant');

// Minify HTML files
gulp.task('minifyHTML', function() {
  return gulp.src('src/*.html')
    .pipe(changed('dist'))
    //.pipe(html5Lint())
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest('dist'))
});
// Copy CSS files
gulp.task('copyCSS', function() {
  return gulp.src('src/css/*')
    .pipe(changed('dist/css'))
    .pipe(gulp.dest('dist/css'));
});
// Copy font files
gulp.task('copyFonts', function() {
  return gulp.src('src/fonts/*')
    .pipe(changed('dist/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});
// Copy JS plugins files
gulp.task('copyJSPlug', function() {
  return gulp.src('src/js/plugins/*')
    .pipe(changed('dist/js/plugins/'))
    .pipe(gulp.dest('dist/js/plugins/'));
});
// Copy JS vendor files
gulp.task('copyJSVen', function() {
  return gulp.src('src/js/vendor/*')
    .pipe(changed('dist/js/vendor/'))
    .pipe(gulp.dest('dist/js/vendor/'));
});
// Copy other files
gulp.task('copyOther', function() {
  return gulp.src([
    'src/contact.php',
    'src/crossdomain.xml',
    'src/humans.txt',
    'src/robots.txt'
  ])
    .pipe(changed('dist/'))
    .pipe(gulp.dest('dist'));
});
// Automate copying
gulp.task('copyAll', ['copyCSS', 'copyFonts', 'copyJSPlug', 'copyJSVen', 'copyOther'], function() {});

// Compress images
gulp.task('images', function () {
  return gulp.src(['src/images/**/*', '!src/images/**/*.rar'])
    .pipe(changed('dist/images'))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/images'));
});
// Sass to CSS
gulp.task('sass', function() {
  return gulp.src('src/scss/main.scss')
    //.pipe(changed('dist/css', {extension: '.css'}))
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'uncompressed'}).on('error', sass.logError))
    //.pipe(rename({suffix: '.min'}))
    .pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'));
});
// Sass color themes to CSS
gulp.task('sassThemes', function() {
  return gulp.src('src/scss/themes/*.scss')
    //.pipe(changed('dist/css', {extension: '.css'}))
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'uncompressed'}).on('error', sass.logError))
    //.pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css/themes/'));
});
// Sass fonts to CSS
gulp.task('sassFonts', function() {
  return gulp.src('src/scss/fonts/*.scss')
    //.pipe(changed('dist/css', {extension: '.css'}))
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'uncompressed'}).on('error', sass.logError))
    //.pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css/fonts/'));
});
// Minify JavaScript files
gulp.task('minifyJS', function() {
  return gulp.src('src/js/main.js')
    .pipe(changed('dist/js'))
    //.pipe(uglify())
    //.pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/js'));
});
gulp.task('watch', function() {
  gulp.watch('src/*.html', ['minifyHTML']);
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/js/main.js', ['minifyJS']);
  gulp.watch('src/images/**/*', ['images']);
});
// Automate tasks (cmd: gulp)
gulp.task('default', ['minifyHTML', 'copyAll', 'images', 'sass', 'minifyJS'], function() {});
