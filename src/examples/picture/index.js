'use strict';

const Picimo = window.Picimo = require('picimo');
const app = window.app = new Picimo.App({ alpha: true, appendTo: document.getElementById('picimo') });

app.scene.setSize(956, 956, 'contain');

app.scene.appendPicture('./kleinerkopf.png', {
    name: 'kopf',
    posX: 50,
    scale: 0.9,
    displayPosition: {
        top: 0,
        left: 0,
        width: 956,
        height: 956,
    }
}, );

app.scene.appendPicture('./rect-100.png', {
    name: 'rect',
    sceneFit: 'contain'
});

//=--==-========================---===
// picture controls
//=--==---==--========================--=

jQuery(function($) {

    var ctrl = window.ctrl = {};

    ['posX', 'posY', 'anchorX', 'anchorY', 'rotateDegree', 'scale'].map(function (id) {
        return {
            id: id,
            $input: $('#' + id),
            output: $(`output[for=${id}]`).get(0),
            val: function () { return parseFloat(this.$input.val()) }
        };
    }).forEach(function (el) {

        ctrl[el.id] = el;
        el.$input.on('input', function () { el.output.value = Math.round(parseFloat(this.value)*10.0)/10.0 });

    });

    app.on('resize', function () {

        ctrl.posX.$input.attr('min', -app.scene.width);
        ctrl.posX.$input.attr('max', app.scene.width);
        ctrl.posY.$input.attr('min', -app.scene.height);
        ctrl.posY.$input.attr('max', app.scene.height);

    });

    app.on('frameBegin', function () {

        const pic = app.scene.findNode('kopf');
        const dp = pic.displayPosition;

        if (dp) {
            dp.anchorX = ctrl.anchorX.val();
            dp.anchorY = ctrl.anchorY.val();
        }

        pic.rotateDegree = ctrl.rotateDegree.val();
        pic.scale = ctrl.scale.val();
        pic.posX = ctrl.posX.val();
        pic.posY = ctrl.posY.val();

    });

});

