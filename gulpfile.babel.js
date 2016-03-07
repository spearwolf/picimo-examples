require("babel-register");

const babel = require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const exit = require('gulp-exit');
const gulp = require('gulp');
const gutil = require('gulp-util');
const size = require('gulp-size');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const watchify = require('watchify');
const webserver = require('gulp-webserver');

function compile (name, isWatch) {

    let bundler = watchify(browserify('./src/examples/' + name + '/index.js', { debug: true }).transform(babel));

    function rebundle () {

        gutil.log("Bundling '" + gutil.colors.yellow(name) + "'...");

        return bundler.bundle()
            .on('error', function (err) { console.error(err); this.emit('end'); })
            .pipe(source('index.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('./'))
            .pipe(size({ title: name, showFiles: true }))
            .pipe(gulp.dest('./examples/' + name));
    }

    if (isWatch) {

        bundler.on('update', () => {
            rebundle();
        });

        rebundle();

    } else {
        rebundle().pipe(exit());
    }

}

function watch (name) {
    return compile(name, true);
}

gulp.task('server', function () {
    gulp.src('.')
        .pipe(webserver({
            host: '0.0.0.0',
            port: 8080,
            livereload: true,
            directoryListing: false,
            open: false
        }));
});

gulp.task('build', () => compile('benchy'));
gulp.task('watch', () => watch('benchy'));

gulp.task('default', ['server', 'watch']);

