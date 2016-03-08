/* global Stats */
'use strict';

const Picimo = require('picimo');

Picimo.App.on('create', function (app, options) {
    if (options.showStats) {

        app.on('init', function () {

            var stats = new Stats();

            stats.setMode(0);
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.right = '0px';
            stats.domElement.style.top = '0px';

            document.body.appendChild(stats.domElement);

            app.on('frameBegin', stats.begin.bind(stats));
            app.on('frameEnd', stats.end.bind(stats));

        });

    }
});

