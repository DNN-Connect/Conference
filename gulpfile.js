var gulp = require('gulp'),
  msbuild = require('gulp-msbuild'),
  browserify = require('gulp-browserify'),
  minifyCss = require('gulp-minify-css'),
  uglify = require('gulp-uglify'),
  assemblyInfo = require('gulp-dotnet-assembly-info'),
  plumber = require('gulp-plumber'),
  config = require('./package.json'),
  zip = require('gulp-zip'),
  filter = require('gulp-filter'),
  merge = require('merge2'),
  gutil = require('gulp-util'),
  markdown = require('gulp-markdown'),
  rename = require('gulp-rename'),
  manifest = require('gulp-dnn-manifest'),
  path = require('path'),
  concat = require('gulp-concat'),
  less = require('gulp-less'),
  lessPluginCleanCSS = require('less-plugin-clean-css'),
  cleancss = new lessPluginCleanCSS({ advanced: true });

gulp.task('less', function() {
  return gulp.src('css/src/less/module.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')],
      plugins: [cleancss]
    }))
    .pipe(gulp.dest('css/src'));
});

gulp.task('css', ['less'], function() {
  gulp.src('node_modules/bootstrap/less/bootstrap.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')],
      plugins: [cleancss]
    }))
    .pipe(rename('bootstrap.min.css'))
    .pipe(gulp.dest('css'));
  gulp.src('node_modules/bootstrap/dist/fonts/*.*')
    .pipe(gulp.dest('fonts'));
  return gulp.src(['css/src/module.css',
      'bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css'
    ])
    .pipe(concat('module.css'))
    .pipe(gulp.dest('.'));
});

gulp.task('js', function() {
  return gulp.src([
    'bower_components/moment/min/moment.min.js',
    'bower_components/interact/dist/interact.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js'
    ])
  .pipe(gulp.dest('js'));
});

gulp.task('browserify', function() {
  gulp.src('js/src/Conference.js')
    .pipe(plumber())
    .pipe(browserify({
      transform: 'reactify',
      ignore: 'react'
    }))
    .pipe(gulp.dest('js/'));
});

gulp.task('watch', function() {
  gulp.watch('js/src/**/*.js', ['browserify']);
});

