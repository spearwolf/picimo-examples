'use strict';

const eventize = require('eventize-js');

function sample (arr) {
    return arr[(Math.random() * arr.length)|0];
}

//-----------------------------------------------------------------------------
//
// Benchy
//
//-----------------------------------------------------------------------------

export default class Benchy {

    constructor () {

        this.allBunnys = [];

        eventize(this);

    }

    init (done, sprites) {

        console.log('Benchy#spriteGroup', sprites);

        this.sprites = sprites;
        this.createBunnys();

    }

    frame () {

        var sprites = this.sprites;
        var mouse = sprites.app.mouseController;

        if (mouse && !mouse.isDrag) {
            if (mouse.isBtnLeftDown) {
                if (sprites.pool.usedCount < sprites.pool.capacity - 10) {
                    this.createBunnys(sample(sprites.textureAtlas.frameNames));
                }
            } else if (mouse.isBtnRightDown) {
                if (sprites.pool.usedCount) {
                    this.removeBunnys();
                }
            }
        }

        var gravity     = -0.5;
        var scene       = sprites.parentNode;
        var half_width  = scene.width / 2;
        var half_height = scene.height / 2;

        var i, bunny, len = this.allBunnys.length;

        for (i = 0; i < len; i++) {

            bunny = this.allBunnys[i];

            bunny.rotateDegree += bunny.speedRotate;

            bunny.tx += bunny.speedX;
            bunny.ty += bunny.speedY;
            bunny.speedY += gravity;

            if (bunny.tx > half_width) {
                bunny.speedX = -Math.abs(bunny.speedX);
                bunny.tx = half_width;
            } else if (bunny.tx < -half_width) {
                bunny.speedX = Math.abs(bunny.speedX);
                bunny.tx = -half_width;
            }

            if (bunny.ty > half_height) {
                bunny.speedY = -0.85;
                bunny.ty = half_height;
                if (Math.random() > 0.5) {
                    bunny.speedY -= Math.random() * 6;
                }
            } else if (bunny.ty < -half_height) {
                bunny.speedY = Math.random() * 25;
                bunny.ty = -half_height;
            }

        }

    } // frame

    createBunnys (frameName) {

        let bunnyCount = this.calcBunnyCount(20);

        var i, bunny;
        var scene = this.sprites.parentNode;

        for (i = 0; i < bunnyCount; i++) {

            bunny = this.sprites.createSprite(frameName ? frameName : sample(this.sprites.textureAtlas.frameNames));

            bunny.setTranslate(
                Math.random() * (scene.width  / 2),
                Math.random() * (scene.height / 2) );

            bunny.speedX = Math.random() * 8;
            bunny.speedY = ( Math.random() * 8 ) - 4;

            bunny.rotateDegree = (Math.random() * 90) - 45;
            bunny.speedRotate = Math.random() * 4;

            this.allBunnys.push( bunny );
        }

        this.emit('createBunnys', this.allBunnys.length);

    } // createBunnys

    removeBunnys () {

        let bunnyCount = this.calcBunnyCount();

        var i, bunny;
        for (i = 0; i < bunnyCount && this.allBunnys.length > 5; i++) {
            bunny = this.allBunnys.pop();
            bunny.destroy();
        }

        this.emit('removeBunnys', this.allBunnys.length);

    }

    calcBunnyCount (zeroCount = 0) {

        let totalCount = this.allBunnys.length;
        return totalCount ? (totalCount < 1500 ? 5 : 50) : zeroCount;

    }

} // class Benchy

