import Phaser from 'phaser';
import BaseEntity from './BaseEntity';
import { PLAYER } from '../../utils/constants';
import { flashRed } from '../../utils/tweens';

class Player extends BaseEntity {
    /**
    * @param {Phaser.Scene} scene
    * @param {number} x
    * @param {number} y
    */
    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        // keep ref to context
        this.ctx = scene;

        // sprite and physics stuff
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(0.2);
        this.body.setSize(280, 280);
        this.body.setCollideWorldBounds(true);

        // stats
        this.lives = PLAYER.LIVES;
        this.power = PLAYER.POWER;
        this.speed = PLAYER.SPEED;
        this.fireDelay = PLAYER.FIRE_DELAY;
        this.bulletVelocity = PLAYER.BULLET_VELOCITY;
        this.canFire = true;

        // bindings
        this.handleHitByEnemy = this.handleHitByEnemy.bind(this);
    };

    /** 
     * @param {Phaser.Types.Input.Keyboard.CursorKeys} cursors 
     */
    handleCursors(cursors) {
        if (cursors.left.isDown) {
            this.body.setVelocityX(-PLAYER.SPEED);
        }
        if (cursors.right.isDown) {
            this.body.setVelocityX(PLAYER.SPEED);
        }
        if (cursors.up.isDown) {
            this.body.setVelocityY(-PLAYER.SPEED);
        }
        if (cursors.down.isDown) {
            this.body.setVelocityY(PLAYER.SPEED);
        }
        if ( !cursors.left.isDown && !cursors.right.isDown) {
            this.body.setVelocityX(0, 0);
        }
        if (!cursors.up.isDown && !cursors.down.isDown) {
            this.body.setVelocityY(0, 0);
        }
    };

    /**
     * @param {Phaser.Physics.Arcade.Group} bulletGroup
     * @param {Phaser.Types.Input.Keyboard.CursorKeys} cursors 
     */
    handleFire = (bulletGroup, cursors) => {
        if (cursors.space.isDown && this.canFire) {
            this.canFire = false;
            setTimeout(() => this.canFire = true, this.fireDelay);
            const bullet = bulletGroup
                .create(this.x, this.y, 'bullet1')
                .setSize(50, 100)
                .setVelocityY(-this.bulletVelocity);
            bullet.power = this.power;
        }
    };

    handleHitByEnemy(_, enemy) {
        enemy.die(false);
        flashRed(this.ctx, this);
        this.looseLife();
    }

    looseLife() {
        this.lives--;
        this.ctx.scene.get('UI').updateLives(this.lives);
        if (this.lives < 1) this.gameOver();
    }

    gameOver() {
        this.ctx.scene.start('GameOver');
    }
}

export default Player;
