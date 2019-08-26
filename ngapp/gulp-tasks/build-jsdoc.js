var jsdoc = require('gulp-jsdoc3');
var config = require('../jsdoc.json');

module.exports = function(gulp) {
	gulp.task('buildJsdoc', function(cb) {
		gulp.src(['./src/**/*.js', '!.spec.js'])
			.pipe(jsdoc(config, cb));
	});
};