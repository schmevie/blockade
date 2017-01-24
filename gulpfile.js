var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    path = require('path');

gulp.task('dev', ['browser-sync']);

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
    
    gulp.watch(['src/**/*'], ['reload']);
});

gulp.task('reload', function(){
    browserSync.reload();
});