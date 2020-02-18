import gulp from 'gulp'

import browserSync from 'browser-sync'
import changed from 'gulp-changed'
import handlebars from 'gulp-hb'
import htmlmin from 'gulp-htmlmin'
import plumber from 'gulp-plumber'
import prune from 'gulp-prune'
import removeCode from 'gulp-remove-code'
import rename from 'gulp-rename'

const hbPath = './dist'

// Compile handlebars to HTML
gulp.task('hb:dev', (done) => {
  return gulp.src('./src/templates/*.hbs')
    .pipe(plumber())
    .pipe(prune({ dest: '/dist', ext: ['.hbs', '.html'] }))
    .pipe(changed('dist'))
    .pipe(handlebars({
      data: './src/templates/data/**/*.json',
      helpers: './src/templates/helpers/**/*.js',
      partials: './src/templates/partials/**/*.hbs'
    }))
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream({
      match: '**/*.html'
    }))
    .on('end', () => {
      done()
    })
})

// Compile handlebars to HTML, remove code used for development
gulp.task('hb:prod', (done) => {
  return gulp.src('./src/templates/*.hbs')
    .pipe(plumber())
    .pipe(prune({ dest: '/dist', ext: ['.hbs', '.html'] }))
    .pipe(changed('dist'))
    .pipe(handlebars({
      data: './src/templates/data/**/*.json',
      helpers: './src/templates/helpers/**/*.js',
      partials: './src/templates/partials/**/*.hbs'
    }))
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(removeCode({
      production: true
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream({
      match: '**/*.html'
    }))
    .on('end', () => {
      done()
    })
})

// Compte handlebars to HTML, remove code used for development, minify HTML code
gulp.task('hb:min', (done) => {
  return gulp.src('./src/templates/*.hbs')
    .pipe(plumber())
    .pipe(changed('dist'))
    .pipe(handlebars({
      data: './src/templates/data/**/*.json',
      helpers: './src/templates/helpers/**/*.js',
      partials: './src/templates/partials/**/*.hbs'
    }))
    .pipe(rename({
      extname: '.html',
      suffix: '.min'
    }))
    .pipe(removeCode({
      production: true
    }))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream({
      match: '**/*.html'
    }))
    .on('end', () => {
      done()
    })
})

// Hint HTML files
gulp.task('html:test', () => {
  const htmlhint = require('gulp-htmlhint')

  return gulp.src('./dist/*.html')
    .pipe(plumber())
    .pipe(htmlhint())
    .pipe(htmlhint.reporter())
    .pipe(htmlhint.failReporter({
      suppress: false
    }))
})
