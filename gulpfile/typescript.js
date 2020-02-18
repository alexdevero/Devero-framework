'use strict'

import gulp from 'gulp'

import babel from 'gulp-babel'
import browserSync from 'browser-sync'
import changed from 'gulp-changed'
import plumber from 'gulp-plumber'
import removeCode from 'gulp-remove-code'
import ts from 'gulp-typescript'
import webpack from 'webpack'
import webpackStream from 'webpack-stream'

const environment = (process.env.NODE_ENV && process.env.NODE_ENV.trim() !== 'development') ? 'development' : 'production'

const moduleConfig = {
  mode: `${environment}`,
  entry: './src/scripts/main.ts',
  output: {
    filename: 'main.js'
  },
  module: {
    rules: [{
      test: /\.ts$/,
      loader: ['ts-loader']
    }]
  }
}

// Process main JavaScript file
gulp.task('ts:development', (done) => {
  return gulp.src('./src/scripts/main.ts')
    .pipe(plumber())
    .pipe(changed('./dist/scripts'))
    .pipe(webpackStream(moduleConfig, webpack))
    .pipe(gulp.dest('./dist/scripts'))
    .pipe(browserSync.stream({
      match: '**/*.ts'
    }))

  // done()
})

// Minify JavaScript files
gulp.task('ts:min', (done) => {
  const rename = require('gulp-rename')
  const uglify = require('gulp-uglify')

  return gulp.src('./src/scripts/main.ts')
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
      match: '**/*.ts'
    }))
    .on('end', () => {
      done()
    })

  // done()
})

gulp.task('ts:source', (done) => {
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

gulp.task('ts:test', (done) => {
  const eslint = require('gulp-eslint');

  return gulp.src('./src/ts/main.ts')
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .on('end', () => {
      done()
    })

  // done()
})
