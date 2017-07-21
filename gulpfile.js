var gulp        = require('gulp'),
    jshint      = require('gulp-jshint'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    htmlminify  = require("gulp-html-minify"),
    pump        = require('pump'),
    csso        = require('gulp-csso'),
    sourcemaps  = require('gulp-sourcemaps');

// define the default task and add the watch task to it
gulp.task('default', ['compress']);

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src('public/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// configure which files to watch and what tasks to use on file changes

gulp.task('watch', function() {
  gulp.watch('public/css/*.css' || 'public/js/*.js', ['compress']);
});

gulp.task('build-html' , function(){
  return gulp.src("public/mailTemplates/*.html")
    .pipe(htmlminify())
    .pipe(gulp.dest("public/minified/mailTemplates"));
});

gulp.task('css-compress', ['build-html'], function () {
  return gulp.src('public/css/*.css')
    .pipe(csso())
    .pipe(gulp.dest('public/minified/css/'));
});

gulp.task('compress', ['css-compress'], function () {
    pump([
        gulp.src('public/js/*.js'),
        uglify(),
        gulp.dest('public/minified/js')
    ]);
});