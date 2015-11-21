
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	replace = require('gulp-replace'),
	del = require('del');
	
gulp.task('styles', function(){
	gulp.src('css\\**\\*.css')
	.pipe(concat('tweetwall.css'))
	.pipe(gulp.dest('dist\\css'));
});

gulp.task('replace-urls', function(){
	gulp.src(['tweetwall.html'])
	.pipe(replace('bower_components\\', 'js\\'))
	.pipe(gulp.dest('dist'))
});

gulp.task('move', function(){
	gulp.src(['js\\tweetwall.js', 'bower_components\\**\\*.js'])
	.pipe(gulp.dest('dist\\js'));
});

gulp.task('clean', function() {
    return del(['dist']);
});

gulp.task('default', ['clean'], function(){
	gulp.start('styles', 'replace-urls', 'move');
});