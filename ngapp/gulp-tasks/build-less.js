var less = require('gulp-less');

module.exports = function(gulp) {
	gulp.task('buildLess', function() {
		return gulp.src('./src/less/**/*.less')
			.pipe(less({
				paths: [__dirname]
			}))
			.pipe(gulp.dest('./src/css'));
	});
};