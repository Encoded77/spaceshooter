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

        this.life = 15;
        this.velocity = Phaser.Math.Between(50, 250);
        this.direction = (Math.random() < 0.5) ? 'right' : 'left';
    };

    move() {
        const { x, y, velocity } = this;
        this.setVelocityY(velocity * 0.5);
        this.direction === 'right' 
            ? this.setVelocityX(velocity)
            : this.setVelocityX(-velocity);

        // bounce off borders
        if (x < 0) {
            this.direction = 'right';
        }
        if (x > this.ctx.getWidth()) {
            this.direction = 'left';
        }

        this.cleanup();
    };

    moveTowards(actor, velocity = 100) {
        const { x: dx } = actor;
        const { x } = this;

        this.setVelocityY(velocity);
        if (x < dx) {
            this.setVelocityX(velocity);
        }
        if (x > dx) {
            this.setVelocityX(-velocity);
        }

        this.cleanup();
    };

    cleanup() {
        if (this.y > this.ctx.scale.height) {
            this.destroy();
        }
    }

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

    die(withPoints = true) {
        explosionOnActor(this.ctx, this);
        if (withPoints) {
            this.ctx.scene.get('UI').updateScore(10);
        }
        this.destroy();
    }
};

export default Enemy;
