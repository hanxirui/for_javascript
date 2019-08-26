module.exports = function(gulp) {
	gulp.task('copySrc', function() {
		return gulp.src([
				'src/@(css|images)/**/*',
				'src/js/**/*',
				'src/index.html',
				'require-config.js'
			])
			.pipe(gulp.dest('dist'));
	});
};