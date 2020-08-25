import Phaser from 'phaser';
import BaseEntity from './BaseEntity';
import { flashRed } from '../../utils/tweens';
import { explosionOnActor } from '../../utils/anims';

class Enemy extends BaseEntity {
    /**
    * @param {Phaser.Scene} scene
    * @param {number} x
    * @param {number} y
    */
    constructor(scene, x, y) {
        super(scene, x, y, 'enemy1');
        this.ctx = scene;
        this.setScale(0.2);
        this.toggleFlipY();

        this.life = 10;
    };

    /**
     * 
     * @param {Number} dmg 
     */
    takeDamage(dmg) {
        this.life -= dmg;
        if (this.life < 1) {
            this.die();
            return;
        }
        if (this.life > 0) {
            flashRed(this.ctx, this);
        }
    }

    die() {
        explosionOnActor(this.ctx, this);
        this.destroy();
    }
};

export default Enemy;
