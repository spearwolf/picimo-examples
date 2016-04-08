'use strict';

require('picimo-stats');
const Picimo = window.Picimo = require('picimo');
import Benchy from './lib/benchy';

console.log('Welcome to the %c %cnobinger%c benchmark v1 %c%c a picimo demo! ', 'background-color:yellow', 'font-style:italic;background-color:yellow', 'font-style:normal;background-color:yellow', 'background-color:transparent', 'background-color:red;color:#fff' );

var app = window.app = new Picimo.App({
    alpha     : true,
    showStats : false
});

app.loadVertexShader('sprite', '/assets/shaders/sprite/shader.vert');
app.loadFragmentShader('sprite', '/assets/shaders/sprite/shader.frag');
app.addProgram('sprite', 'sprite', 'sprite');

app.scene.setSize(800, 600, "contain");

var atlas = app.loadTextureAtlas('./nobinger.json');
var benchy = new Benchy();

app.scene.appendSpriteGroup(atlas, {
    name: 'sprites',
    capacity: 10000,
    sprites: 'simple'
}, benchy);

//app.scene.appendChild(
    //app.create('scenegraph.spriteGroup', atlas, { capacity: 10000, sprites: 'simple' }, benchy) );

//-------------------------
// bunny counter display
//--------------------------

let counterTextNode = document.createTextNode('');
document.getElementById('counterDisplay').appendChild(counterTextNode);

var updateCounterDisplay = (function (element, bunnyCount) {
    element.nodeValue = bunnyCount;
}).bind(null, counterTextNode);

benchy.on('createBunnys', updateCounterDisplay);
benchy.on('removeBunnys', updateCounterDisplay);

//------------------------------
// scroll sprites layer by mouse
//---------------------------------

app.on('mouseMove', (move, ctrl) => {
    if (move.isDrag && (ctrl.isBtnLeftDown || ctrl.isBtnRightDown)) {
        let pixelRatio = app.scene.pixelRatio;
        app.scene.transform.translate(move.translateX / pixelRatio, move.translateY / pixelRatio);
    }
});

