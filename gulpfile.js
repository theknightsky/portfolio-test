/*
||--------------------------------------------------------
|| Gulp Modules
||--------------------------------------------------------
*/

var gulp = require('gulp'),
    jade = require('gulp-jade'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    compass = require('gulp-compass'),
    minify = require('gulp-minify-css'),
    livereload = require('gulp-livereload');

// --------------------------------------------------------
//  Gulp Tasks
// --------------------------------------------------------

gulp.task('compass-sass', function(){

    gulp.src('public/stylesheets/sass/*.sass')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(compass({
        css: 'public/stylesheets/css',
        sass: 'public/stylesheets/sass',
        import_path: 'bower_components',
        require: ['susy','breakpoint'],
    }))
    .pipe(minify())
    .pipe(gulp.dest('public/stylesheets/css'))
    // .pipe(concat('main.css'))
    // .pipe(gulp.dest('public/dist/'))
    .pipe(livereload());

});

gulp.task('jade', function(){

    // templates dir
    gulp.src('public/templates/jade/*.jade')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(jade({
        pretty: true
    }))
    .pipe(gulp.dest('public/templates'));


    // templates/_partials dir
    gulp.src('public/templates/_partials/jade/*.jade')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(jade({
        pretty: true
    }))
    .pipe(gulp.dest('public/templates/_partials'));
    

    // public dir - for index.jade
    gulp.src('public/*.jade')
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(jade({
        pretty: true
    }))
    .pipe(gulp.dest('public'))
    .pipe(livereload());

});

gulp.task('watch', function(){
    livereload.listen();
    gulp.watch('public/stylesheets/sass/*.sass', ['compass-sass']);
    gulp.watch('public/**/*.jade', ['jade']);
});

gulp.task('default', ['compass-sass','jade','watch'], function(){});