/*
||--------------------------------------------------------
|| Gulp Modules
||--------------------------------------------------------
*/

var gulp = require('gulp'),
    jade = require('gulp-jade'),
    gutil = require('gulp-util'),
    optipng = require('gulp-optipng'),
    usemin = require('gulp-usemin'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    compass = require('gulp-compass'),
    plumber = require('gulp-plumber'),
    gulpFilter = require('gulp-filter'),
    minify = require('gulp-minify-css'),
    bower = require('main-bower-files'),
    livereload = require('gulp-livereload');


// --------------------------------------------------------
//  paths
// --------------------------------------------------------

var paths = {
    public: '/dist'
}

// --------------------------------------------------------
//  Gulp Tasks
// --------------------------------------------------------

gulp.task('imageOptimize', function(){
    gulp.src('public/images/*.png')
    .pipe(optipng(['-o2']))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('moveTemplates', function(){
    gulp.src('public/templates/*.html')
    .pipe(gulp.dest('dist/templates'));
});

gulp.task('mainBowerFiles', function(){

    var fontFilter = gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf']);

    return gulp.src(bower())
    .pipe(fontFilter)
    .pipe(gulp.dest("dist/fonts/"));
});

gulp.task('usemin', function(){
    gulp.src('public/index.html')
    .pipe(usemin({
        js: [uglify()],
        css: [minify()]
    }))
    .pipe(gulp.dest('dist/'))
});

gulp.task('dist',['usemin','mainBowerFiles','imageOptimize', 'moveTemplates']);

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