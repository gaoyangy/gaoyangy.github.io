const gulp = require('gulp'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util'),
    cssclean = require('gulp-clean-css'),
    gulpLog = require('gulp-log'),
    rimraf = require('rimraf'),
    sass = require('gulp-sass');
const paths = {
    scss: [
        './src/sass/*.sass',
        './src/sass/**/*.sass'
    ]
}

function handleSassError(err) {
    gutil.log(gutil.colors.red('sass error\r\n'), gutil.colors.yellow(err.message))
    this.emit('end');
}
gulp.task('delcss', function() {
    return rimraf('./static/css/*', function() {

    })
})


gulp.task('sass', function() {
    return gulp.src(paths.scss)
        .pipe(sass())
        .pipe(concat('style.min.css'))
        .on('error', handleSassError)
        .pipe(cssclean())
        .pipe(gulp.dest('./static/css'));
})

gulp.task('sass-watch', ['sass'], function() {
    gulp.watch([paths.scss], ['delcss', 'sass']);
})
gulp.task('build', ['delcss', 'sass']);

gulp.task('default', ['delcss', 'sass-watch']);