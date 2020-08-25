import Phaser from 'phaser';
import BaseEntity from './BaseEntity';
import { PLAYER } from '../../utils/constants';

class Player extends BaseEntity {
    /**
    * @param {Phaser.Scene} scene
    * @param {number} x
    * @param {number} y
    */
    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        // sprite and physics stuff
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(0.2);
        this.body.setSize(280, 280);
        this.body.setCollideWorldBounds(true);

        // stats
        this.power = PLAYER.POWER;
        this.speed = PLAYER.SPEED;
        this.fireDelay = PLAYER.FIRE_DELAY;
        this.bulletVelocity = PLAYER.BULLET_VELOCITY;
        this.canFire = true;
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
            bulletGroup
                .create(this.x, this.y, 'bullet1')
                .setSize(50, 100)
                .setVelocityY(-this.bulletVelocity);
        }
    };
}

export default Player;
