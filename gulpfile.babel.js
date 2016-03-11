'use strict';

require("babel-register");

const glob = require('glob');
const gulp = require('gulp');
const webserver = require('gulp-webserver');

import { createTask, compile, watch } from './lib/gulp/create-build-tasks';

gulp.task('server', function () {
    gulp.src('.')
        .pipe(webserver({
            host: '0.0.0.0',
            port: 3000,
            livereload: true,
            directoryListing: false,
            open: false
        }));
});

let examples = glob.sync('./src/examples/*/').map((dir) => {

    let name = /\.\/src\/examples\/(.*)\/$/.exec(dir)[1];

    createTask(`build:${name}`, compile, name);
    createTask(`watch:${name}`, watch, name);

    return name;

});

gulp.task('build', examples.map((name) => `build:${name}`));
gulp.task('watch', examples.map((name) => `watch:${name}`));

gulp.task('default', ['server', 'watch']);

