var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
// Watchify启动Gulp并保持运行状态，当你保存文件时自动编译。 帮你进入到编辑-保存-刷新浏览器的循环中。
var watchify = require('watchify');
var tsify = require('tsify');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
// var ts = require('gulp-typescript');
// var tsProject = ts.createProject('tsconfig.json');
var paths = { pages: [ 'src/*.html' ] };

// 将browserify实例包裹在watchify的调用里，控制生成的结果。
var watchedBrowserify = watchify(
	browserify({
		basedir: '.',
		// 我们为Broswerify指定了debug: true。 这会让tsify在输出文件里生成source maps。
		// source maps允许我们在浏览器中直接调试TypeScript源码，而不是在合并后的JavaScript文件上调试。
		debug: true,
		entries: [ 'src/main.ts' ],
		cache: {},
		packageCache: {}
	}).plugin(tsify)
);

gulp.task('copy-html', function() {
	return gulp.src(paths.pages).pipe(gulp.dest('dist'));
});

function bundle() {
	return (
		watchedBrowserify
			.bundle()
			.pipe(source('bundle.js'))
			// begin uglify
			.pipe(buffer())
			.pipe(sourcemaps.init({ loadMaps: true }))
			.pipe(uglify())
			.pipe(sourcemaps.write('./'))
			// end uglify
			.pipe(gulp.dest('dist'))
	);
}

gulp.task('default', [ 'copy-html' ], bundle);

watchedBrowserify.on('update', bundle);
watchedBrowserify.on('log', gutil.log);
