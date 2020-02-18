'use strict'

import gulp from 'gulp'

// import browserSync from 'browser-sync'
import csscomb from 'gulp-csscomb'
import cssnano from 'cssnano'
import plumber from 'gulp-plumber'
import postcss from 'gulp-postcss'
import postcssPresetEnv from 'postcss-preset-env'
import pxtorem from 'postcss-pxtorem'
import removeCode from 'gulp-remove-code'
import rename from 'gulp-rename'
import sass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'

// const development = process.env.NODE_ENV !== undefined && process.env.NODE_ENV.trim() === 'production'

const cssnanoConfig = {
  autoprefixer: false
}

const pxtoremConfig = {
  rootValue: 16,
  unitPrecision: 5,
  propList: ['*'],
  selectorBlackList: [
    'html',
    'body'
  ],
  replace: true,
  mediaQuery: false,
  minPixelValue: 0
}

const processorsDev = [
  postcssPresetEnv({
    stage: 3
  })
]

const processorsProd = [
  cssnano(cssnanoConfig),
  postcssPresetEnv({
    stage: 3
  }),
  pxtorem(pxtoremConfig)
]

// Compile Sass to CSS - default
gulp.task('sass:development', (done) => {
  return gulp.src('./src/styles/styles.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(csscomb())
    .pipe(postcss(processorsDev))
    .pipe(sourcemaps.write('.'))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./dist/styles'))
    .on('end', () => {
      done()
    })
})

// Compile Sass to CSS - production
gulp.task('sass:prod', (done) => {
  return gulp.src('./src/styles/styles.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(removeCode({
      production: true
    }))
    .pipe(csscomb())
    .pipe(postcss(processorsProd))
    .pipe(sourcemaps.write('.'))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./dist/styles'))
    .on('end', () => {
      done()
    })
})

// Compile Sass to CSS - minified
gulp.task('sass:min', (done) => {
  return gulp.src('./src/styles/styles.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(removeCode({
      production: true
    }))
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(csscomb())
    .pipe(postcss(processorsProd))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./dist/styles'))
    .on('end', () => {
      done()
    })
})

// Compile Sass to CSS - themes - default
gulp.task('sass:themes', (done) => {
  return gulp.src('./src/styles/_themes/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(postcss(processorsDev))
    .pipe(csscomb())
    .pipe(sourcemaps.write('.'))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./dist/styles/themes'))
    .on('end', () => {
      done()
    })
})

// Compile Sass to CSS - themes - minified
gulp.task('sass:themesmin', (done) => {
  return gulp.src('./src/styles/_themes/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(csscomb())
    .pipe(postcss(processorsProd))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./dist/styles/themes'))
    .on('end', () => {
      done()
    })
})

// Test all Sass files with Sass-lint
gulp.task('sass:test', (done) => {
  const sassLint = require('gulp-sass-lint')

  return gulp.src('./src/styles/**/*.scss')
    .pipe(plumber())
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
    .on('end', () => {
      done()
    })
})
