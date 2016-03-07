'use strict';

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

    }

    init (done, sprites) {

        console.log('Benchy#spriteGroup', sprites);

        this.sprites = sprites;
        this.createBunnys(20);

    }

    frame () {

        var sprites = this.sprites;
        var mouse = sprites.app.mouseController;

        if (mouse) {
            if (mouse.isBtnLeftDown) {
                if (sprites.pool.usedCount < sprites.pool.capacity - 10) {
                    this.createBunnys(5, sample(sprites.textureAtlas.frameNames));
                }
            } else if (mouse.isBtnRightDown) {
                if (sprites.pool.usedCount) {
                    this.removeBunnys(5);
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

    createBunnys (bunnyCount, frameName) {

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

    } // createBunnys

    removeBunnys (bunnyCount) {

        var i, bunny;
        for (i = 0; i < bunnyCount && this.allBunnys.length > 1; i++) {
            bunny = this.allBunnys.pop();
            bunny.destroy();
        }

    }

} // class Benchy

