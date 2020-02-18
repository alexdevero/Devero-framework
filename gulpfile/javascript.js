'use strict'

import gulp from 'gulp'

import babel from 'gulp-babel'
import browserSync from 'browser-sync'
import changed from 'gulp-changed'
import plumber from 'gulp-plumber'
import removeCode from 'gulp-remove-code'
import webpack from 'webpack'
import webpackStream from 'webpack-stream'

const environment = (process.env.NODE_ENV && process.env.NODE_ENV.trim() !== 'development') ? 'development' : 'production'

const moduleConfig = {
  mode: `${environment}`,
  entry: './src/scripts/main.js',
  output: {
    filename: 'main.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader'
    }, {
      test: /\.ts$/,
      loader: 'ts-loader'
    }]
  }
}

// Process main JavaScript file
gulp.task('js:development', (done) => {
  return gulp.src('./src/scripts/main.js')
    .pipe(plumber())
    .pipe(changed('./dist/scripts'))
    //.pipe(babel()) - implemented via Webpack - babel-loader
    .pipe(webpackStream(moduleConfig, webpack))
    .pipe(gulp.dest('./dist/scripts'))
    .pipe(browserSync.stream({
      match: '**/*.js'
    }))

  // done()
})

// Process main JavaScript file for production
gulp.task('js:pure', () => {
  return gulp.src('./src/scripts/main.js')
    .pipe(changed('./dist/scripts'))
    // .pipe(babel())
    .pipe(webpackStream(moduleConfig, webpack))
    .pipe(removeCode({
      production: development
    }))
    .pipe(gulp.dest('./dist/scripts'))
})

// Minify JavaScript files
gulp.task('js:min', (done) => {
  const rename = require('gulp-rename')
  const uglify = require('gulp-uglify')

  return gulp.src('./src/scripts/main.js')
    .pipe(plumber())
    .pipe(changed('./dist/scripts'))
    //.pipe(babel()) - implemented via Webpack - babel-loader
    .pipe(webpackStream(moduleConfig, webpack))
    .pipe(removeCode({
      production: true
    }))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/scripts'))
    .pipe(browserSync.stream({
      match: '**/*.js'
    }))
    .on('end', () => {
      done()
    })

  // done()
})

gulp.task('js:source', (done) => {
  return gulp.src('./src/scripts/**/*')
    .pipe(plumber())
    .pipe(changed('./dist/scripts'))
    .pipe(removeCode({
      production: true
    }))
    .pipe(gulp.dest('./dist/scripts'))
    .on('end', () => {
      done()
    })

  // done()
})

gulp.task('js:test', () => {
  const eslint = require('gulp-eslint')

  return gulp.src('./src/scripts/main.js')
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})
