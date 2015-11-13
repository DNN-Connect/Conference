var gulp = require('gulp'),
 path = require('path'),
 less = require('gulp-less');

gulp.task('less', function () {
  return gulp.src('src/module.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('.'));
});
