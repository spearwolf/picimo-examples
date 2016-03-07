/* global Stats */
'use strict';

const Picimo = require('picimo');
import Benchy from './lib/benchy';

console.log('Welcome to the %c %cnobinger%c benchmark v1 %c%c a picimo demo! ', 'background-color:yellow', 'font-style:italic;background-color:yellow', 'font-style:normal;background-color:yellow', 'background-color:transparent', 'background-color:red;color:#fff' );

(function () {  // --- stats.js ---- {{{

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

})(); // --- }}}

var app = new Picimo.App({
    canvas    : document.getElementById( 'picimo' ),
    alpha     : true,
    showStats : true
});

app.shader.loadVertexShader('sprite', '/assets/shaders/sprite/shader.vert');
app.shader.loadFragmentShader('sprite', '/assets/shaders/sprite/shader.frag');
app.shader.addProgram('sprite', 'sprite', 'sprite');

app.scene.setSize(800, 600, "contain");

var atlas = app.loadTextureAtlas('./nobinger.json');

app.scene.appendSpriteGroup(atlas, {
    capacity: 10000,
    sprites: 'simple'
}, new Benchy());

//-------------------------
// add some html controls
//-------------------------

//var container = document.createElement('div');
//container.className = 'benchy-controls';
//document.body.appendChild(container);

