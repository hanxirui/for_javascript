var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    less = require('gulp-less'),
    notify = require('gulp-notify'), //当发生异常时提示错误
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    through = require('through2'),
    makeDirLess = require('./gulp-tasks/make-less');

var concat = require('gulp-concat'),
    requirejsOptimize = require('gulp-requirejs-optimize');
var minifyCss = require('gulp-minify-css');

require('./gulp-tasks/build-jsdoc')(gulp);
require('./gulp-tasks/build-scss')(gulp);

gulp.task('buildTheme', function() {
    require('./gulp-tasks/build-theme')(gulp, './src/themes/', './src/less/');
});


gulp.task('cleanBower', function() {
    return require('./gulp-tasks/clean-bower')(gulp);
});

//压缩,合并 js
gulp.task('minifyjs', function() {
    return gulp.src('./dest/bower_components/**/*.js')
        .pipe(requirejsOptimize(function(file) {
            return {
                mainConfigFile: './src/js/require-config.js',
                optimize: 'none',
                useStrict: true,
                baseUrl: './dest/bower_components/'
            };
        }))
        .pipe(gulp.dest('dest'));
});

gulp.task('minifycss', function() { //- 创建一个名为 minifycss 的 task
    gulp.src('dest/**/*.css') //- 需要处理的css文件，放到一个字符串数组里
        .pipe(concat('3rd.css')) //- 合并后的文件名
        .pipe(minifyCss()) //- 压缩处理成一行
        .pipe(gulp.dest('dest')); //- 输出文件本地
});

gulp.task('default', ['buildTheme', 'buildScss', 'cleanBower']);

gulp.task('w', function() {
    return gulp.watch(['src/less/**/*.less', 'src/themes/*.less'], ['buildTheme', 'buildScss']);
});