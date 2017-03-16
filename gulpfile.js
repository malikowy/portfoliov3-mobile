var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var cleanJS = require('gulp-uglify');


// komendy  wyswietlane w konsoli
gulp.task('cmds', function() {
    console.log("dodatkowe komendy gulp: gulp minifycss, minifyjs");
});

// dodatkowa funkcja wykonywana z zadaniem "serve"
gulp.task('reload', function() {
    browserSync.reload();
});

// obserwowanie folderu src czyli zrodla gdzie wszystko modyfikuje
gulp.task('bsync', ['sass', 'cmds'], function() {
    browserSync({
        server: 'src'
    });
    gulp.watch('src/*.html', ['reload']);
    gulp.watch('src/scss/**/*.scss', ['sass']);
});

//  obserwowanie folderu SCSS i generowanie CSS
gulp.task('sass', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 3 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});

//  zadanie default
gulp.task('default', ['bsync']);

// minifikacja CSS
gulp.task('minifycss', function() {
    return gulp.src('src/css/**/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('src/css/min'));
});

// minifikacja JS
gulp.task('minifyjs', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(cleanJS())
        .pipe(gulp.dest('src/js/min'))
});