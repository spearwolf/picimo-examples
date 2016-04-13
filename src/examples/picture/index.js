'use strict';

const Picimo = window.Picimo = require('picimo');

console.log('Welcome to the %c %cpicture playground%c -- %c%c a picimo demo! ', 'background-color:yellow', 'font-style:italic;background-color:yellow', 'font-style:normal;background-color:yellow', 'background-color:transparent', 'background-color:red;color:#fff' );

var app = window.app = new Picimo.App({ alpha: true, appendTo: document.getElementById('picimo') });

app.scene.setSize(956, 956, "contain");

window.pic = app.scene.appendPicture('./kleinerkopf.png', {

    name: 'pic',
    sceneFit: 'contain'

});

