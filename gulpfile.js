/**
 * Created by trigkit4 on 16/1/18.
 */
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const plugins = require('gulp-load-plugins')();

gulp.task('compress', function () {
    return gulp.src('./judge.js')
        .pipe(uglify())
        .pipe(rename('./lib/judge.min.js'))
        .pipe(gulp.dest('./'))
});
gulp.task("deploy", function () {
    return gulp.src('./**/*')
        .pipe(plugins.ghPages());
});
