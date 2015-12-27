var gulp = require('gulp'),
  path = require('path'),
  concat = require('gulp-concat'),
  less = require('gulp-less'),
  browserify = require('browserify'),
  rename = require('gulp-rename'),
  lessPluginCleanCSS = require('less-plugin-clean-css'),
  cleancss = new lessPluginCleanCSS({ advanced: true });

gulp.task('less', function() {
  return gulp.src('src/less/module.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')],
      plugins: [cleancss]
    }))
    .pipe(gulp.dest('src'));
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
  return gulp.src(['src/module.css',
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

