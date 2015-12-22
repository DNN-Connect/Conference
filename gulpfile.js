var gulp = require('gulp'),
  path = require('path'),
  concat = require('gulp-concat'),
  less = require('gulp-less'),
  browserify = require('browserify');

gulp.task('less', function() {
  return gulp.src('src/less/module.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest('src'));
});

gulp.task('css', ['less'], function() {
  return gulp.src(['src/module.css',
      'bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css'
    ])
    .pipe(concat('module.css'))
    .pipe(gulp.dest('.'));
});

gulp.task('js', function() {
  return gulp.src([
    'bower_components/moment/min/moment.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js'
    ])
  .pipe(gulp.dest('js'));
});

