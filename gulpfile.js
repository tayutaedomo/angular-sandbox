var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('hello', function() {
  console.log('Hello gulp!');
});

gulp.task('minify_js', function() {
  gulp.src('app/view1/*.js')
  //gulp.src(['/app/view1/*.js', '/app/view2/*.js'])
    .pipe(uglify({ preserveComments: 'some' }))
    //.pipe(concat('app/components/main.min.js'))
    .pipe(gulp.dest('dest/'));
});

gulp.task('copy', function() {
  return gulp.src(['app/view1/*.js'])
    .pipe(gulp.dest('dest'));
});

gulp.task('default', ['hello']);

