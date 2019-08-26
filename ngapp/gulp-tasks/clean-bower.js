var requireConfig = require('../src/js/require-config');
var _ = require('lodash');

module.exports = function (gulp) {
	var paths = _.values(requireConfig.paths);
	var mapJs = _.values(requireConfig.map['*']);


	var jsList = paths.map(function (value, index, all) {
		return value.substring(1, value.length) + '.js';
	});
	var cssList = paths.map(function (value, index, all) {
		return value.substring(1, value.length) + '.css';
	});
	mapJs = mapJs.map(function (value, index, all) {
		return value.substring(1, value.length);
	});
	//处理默认需要带的
	jsList.push('bower_components/requirejs/require.js');
	cssList.push('bower_components/bootstrap/dist/**/*.*');

	var all = [].concat(mapJs, jsList, cssList);
	gulp.src(all, {
			base: '.'
		})
		.pipe(gulp.dest('dest'));

};