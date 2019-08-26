var fs = require('fs');
var path = require('path');
module.exports = function(rootPath) {
	var lessDirs = listDirs(rootPath);
	lessDirs.forEach(function(dirPath) {
		var lessFiles = listLessFiles(dirPath);
		if (lessFiles.length === 0) return;
		var fileContent = '@import "' + lessFiles.join('";\n@import "') + '";\n';
		var filePath = path.join(dirPath, 'main.less');
		fs.writeFileSync(filePath, fileContent);
	});
};

function listDirs(parentPath) {
	var dirPaths = [];

	fs.readdirSync(parentPath).forEach(function(everyPath) {
		var p = path.join(parentPath, everyPath);
		if (fs.statSync(p).isDirectory() && everyPath !== 'common.icon') {
			dirPaths.push(p);
			Array.prototype.push.apply(dirPaths, listDirs(p));
		}
	});

	return dirPaths;
}

function listLessFiles(dir) {
	var lessFiles = [];

	fs.readdirSync(dir).forEach(function(everyPath) {
		var p = path.join(dir, everyPath);
		var extname = path.extname(everyPath).toLowerCase();
		var filename = path.basename(everyPath);

		if (fs.statSync(p).isFile() && extname === '.less' && filename !== 'main.less') {
			lessFiles.push(filename);
		}
	});

	lessFiles = lessFiles.sort(function(file1, file2) {
		if (file1.toLowerCase() === 'vars.less') return -1;
		else if (file2.toLowerCase() === 'vars.less') return 1;
		else return 0;
	});

	return lessFiles;
}