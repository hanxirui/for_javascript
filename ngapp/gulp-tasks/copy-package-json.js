module.exports = function(gulp) {
	gulp.task('copyPackageJson', function() {
		return gulp.src('package.json')
			.pipe(gulp.dest('dist'));
	});
};