/**
 * Created by trigkit4 on 16/1/18.
 */
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');

gulp.task('compress', function () {
    return gulp.src('./judge.js')
        .pipe(uglify())
        .pipe(rename('./lib/judge.min.js'))
        .pipe(gulp.dest('./'))
});
gulp.task('lint', function () {
    return gulp.src('./judge.js')
        .pipe(jshint())
});