/**
 * Created by trigkit4 on 16/1/18.
 */
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('compress', function () {
    return gulp.src('./judge.js')
        .pipe(uglify())
        .pipe(rename('./lib/judge.min.js'))
        .pipe(gulp.dest('./'))
});
