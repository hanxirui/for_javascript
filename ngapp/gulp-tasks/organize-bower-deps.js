var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var jsFileContent = fs.readFileSync('src/js/require-config.js', {
	encoding: 'utf8'
});

var paths = function() {
	var module = {};
	eval(jsFileContent);
	return module.exports.paths;
}();

var deps = {};
_(paths)
	.values()
	.filter(function(p) {
		return p.substring(0, 18) === '/bower_components/';
	})
	.forEach(function(modulePath) {
		var m = modulePath.match(/\/bower_components\/.+?\//);
		var bowerJsonPath = '..' + m[0] + 'bower.json';
		var bowerJsonPath2 = '..' + m[0] + '.bower.json';
		var bowerJsonContent;
		try {
			bowerJsonContent = require(bowerJsonPath);
		} catch (e) {
			bowerJsonContent = require(bowerJsonPath2);
		}

		var name = bowerJsonContent.name;
		var version = bowerJsonContent.version;
		if (version) version = '>' + version;
		else version = "*";

		deps[name] = version;
	});

var jsonText = JSON.stringify(deps, null, '    ');

console.log(jsonText);