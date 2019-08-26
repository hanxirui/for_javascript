var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
module.exports = function(gulp) {
    gulp.task('buildScss', function() {
        return gulp.src(['./src/scss/arm_green.scss', './src/scss/dark_blue.scss'])
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest('./src/css/icon'));
    });
};