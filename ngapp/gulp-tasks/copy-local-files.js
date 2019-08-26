var del = require('del');
module.exports = function(gulp) {
	gulp.task('copyLocalFiles', function() {
		del.sync('dist');
		return gulp.src([
			'bower_components/**/*',
			'node_modules/**/*',
			'src/**/*',
			'web',
			'integrate-tests',
			'karma.conf.js',
			'protractor.conf.js',
			'package.json',
			'bower.json'
		], {
			base: './'
		}).pipe(gulp.dest('dist'));
	});
};