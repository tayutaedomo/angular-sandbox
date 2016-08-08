var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var babel = require("gulp-babel");

gulp.task('hello', function() {
  console.log('Hello gulp!');
});
gulp.task('default', ['hello']);

gulp.task('copy', function() {
  return gulp.src(['app/view1/*.js'])
    .pipe(gulp.dest('dest'));
});

gulp.task('babel', function() {
  gulp.src('app//directive/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dest/'));
});

var src_list = [
  'app/app.js',
  'app/view1/view1.js',
  'app/view2/view2.js',
  'app/heatmap/heatmap.js',
  'app/vjs-video/vjs-video.js',
  'app/directive/directive.js'
];

gulp.task('concat', function() {
  gulp.src(src_list)
    .pipe(babel())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dest/'));
});

gulp.task('uglify', function() {
  gulp.src('dest/app.js')
    .pipe(uglify({ preserveComments: 'some' }))
    .pipe(gulp.dest('app/components/'));
});

gulp.task('minify', function() {
  gulp.src(src_list)
    .pipe(babel())
    .pipe(concat('app.min.js'))
    .pipe(uglify({ preserveComments: 'some' }))
    .pipe(gulp.dest('app/components/'));
});

