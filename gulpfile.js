const gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    browserSync = require('browser-sync'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename');

gulp.task('server', () => {
    browserSync({
        server: {
            baseDir: 'src'
        }
    });
    gulp.watch('src/*.html').on('change', browserSync.reload);
})

gulp.task('style', () => {
    return gulp.src('src/sass/**/*.+(scss|sass)')
        .pipe(sass({
            outputStyle: 'compressed'
        })).on('error', sass.logError)
        .pipe(rename({
            suffix: '.min',
            prefix: ''
        }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
})

gulp.task('watch', () => {
    gulp.watch('src/sass/**/*.+(scss|sass)', gulp.parallel('style'));
})

gulp.task('default', gulp.parallel('watch', 'server', 'style'));
