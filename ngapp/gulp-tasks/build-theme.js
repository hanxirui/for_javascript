var fs = require('fs');
var path = require('path');

var less = require('gulp-less'),
    notify = require('gulp-notify'), //当发生异常时提示错误
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');

module.exports = function (gulp, themePath, lessRootPath) {
    makeThemeCFile(themePath, lessRootPath);
    gulp.src(['./src/themes/*.lessc'])
        .pipe(sourcemaps.init())
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(less({
            compress: true
        }))
        .pipe(minifyCss())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./src/css'));
};

function makeThemeCFile(themePath, lessRootPath) {
    var lessDirs = listDirs(lessRootPath);
    var fileContent = '';
    lessDirs.forEach(function (dirPath) {
        var lessFiles = listLessFiles(dirPath);
        if (lessFiles.length === 0) return;
        fileContent += '@import "./' + dirPath + '/' + lessFiles.join('";\n@import "./' + dirPath + '/') + '";\n';
    });

    var themeFiles = listLessFiles(themePath);
    themeFiles.forEach(function (themeLessFile) {
        var extname = path.extname(themeLessFile).toLowerCase();
        if (extname === '.less') {
            var filename = path.basename(themeLessFile, '.less');
            var filePath = path.join(themePath, filename + '.lessc');
            fs.writeFileSync(filePath, '@import "' + themeLessFile + '";\n' + 　fileContent);
        }

    });
}

function listDirs(parentPath) {
    var dirPaths = [];
    fs.readdirSync(parentPath).forEach(function (everyPath) {
        var p = path.join(parentPath, everyPath);
        if (fs.statSync(p).isDirectory() && everyPath !== 'common.icon') {
            dirPaths.push(p);
            Array.prototype.push.apply(dirPaths, listDirs(p));
        }
    });
    return dirPaths;
}

function listLessFiles(dir, extNameEqual) {
    var lessFiles = [];

    fs.readdirSync(dir).forEach(function (everyPath) {
        var p = path.join(dir, everyPath);
        var extname = path.extname(everyPath).toLowerCase();
        var filename = path.basename(everyPath);

        if (fs.statSync(p).isFile() && extname === '.less') {
            lessFiles.push(filename);
        }
    });

    lessFiles = lessFiles.sort(function (file1, file2) {
        if (file1.toLowerCase() === 'vars.less') return -1;
        else if (file2.toLowerCase() === 'vars.less') return 1;
        else return 0;
    });

    return lessFiles;
}