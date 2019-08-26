var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var through2 = require('through2');
var requireConfigPaths = _.values(require('../require-config').paths)
	.map(function(filepath) {
		return filepath.substring(1) + '.js';
	});

module.exports = function(gulp) {
	gulp.task('copy3rd', function() {
		gulp.src(requireConfigPaths)
			.pipe(gulp.dest('dist/3rd'));
	});
};