module.exports = function(gulp) {
	gulp.task('copyNodeModules', function() {
		return gulp.src('node_modules/**/*')
			.pipe(gulp.dest('dist/node_modules'));
	});
};