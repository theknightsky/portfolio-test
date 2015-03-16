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
//  paths
// --------------------------------------------------------

var paths = {
    js: {
        angular: 'bower_components/angular/angular.js',
        angularAnimate: 'bower_components/angular-animate/angular-animate.js',
        uiRouter: 'bower_components/angular-ui-router/release/angular-ui-router.min.js',
        app: 'public/js/app.js'
    },
    css: {
        roboto: 'bower_components/roboto-fontface/roboto-fontface.css',
        app: 'public/stylesheets/css/app.css'
    }
}

// --------------------------------------------------------
//  Gulp Tasks
// --------------------------------------------------------

gulp.task('dist',function(){

    gulp.src('public/index.html')
    .pipe(minify())
    .pipe(gulp.dest('public/dist/'));

    gulp.src('public/templates/*.html')
    .pipe(minify())
    .pipe(gulp.dest('public/dist/templates/'));

    gulp.src('public/images/*')
    .pipe(gulp.dest('public/dist/images/'));

    gulp.src('bower_components/roboto-fontface/fonts/*')
    .pipe(gulp.dest('public/dist/css/fonts/'));

    gulp.src([paths.css.roboto, paths.css.app])
    .pipe(minify())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('public/dist/css/'));

    gulp.src([paths.js.angular, paths.js.angularAnimate, paths.js.uiRouter, paths.js.app])
    .pipe(uglify())
    // .pipe(concat('app.js'))
    .pipe(gulp.dest('public/dist/js'));
});

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