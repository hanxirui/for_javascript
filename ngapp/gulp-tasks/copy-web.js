module.exports = function(gulp) {
	gulp.task('copyWeb', function() {
		return gulp.src('web/**/*')
			.pipe(gulp.dest('dist/web'));
	});
};