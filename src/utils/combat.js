import { BULLET_VELOCITY, PLAYER } from './constants';

let canFire = true;

/**
 * 
 * @param {Phaser.Physics.Arcade.Image} actor 
 * @param {Phaser.Physics.Arcade.Group} bulletGroup
 * @param {Phaser.Types.Input.Keyboard.CursorKeys} cursors 
 */
export const handleFire = (actor, bulletGroup, cursors) => {
    if (cursors.space.isDown && canFire) {
        canFire = false;
        setTimeout(() => canFire = true, PLAYER.FIRE_DELAY);
        const bullet = bulletGroup
            .create(actor.x, actor.y, 'bullet1')
            .setScale(0.2)
            .setSize(50, 100);
        bullet.body.setVelocityY(-BULLET_VELOCITY);
    }
};

/** 
 * @param {Phaser.Physics.Arcade.Image} enemy 
 * @param {Phaser.Physics.Arcade.Image} bullet 
 */
export const handleEnemyHit = (enemy, bullet) => {
    bullet.destroy();
};

/**
 * @param {Phaser.Scene} ctx
 * @param {Phaser.Physics.Arcade.Group} bulletGroup
 */
export const bulletCleanup = (ctx, bulletGroup) => {
    const gameHeight = ctx.scale.height;
    bulletGroup.children.each(bullet => {
        if (bullet.y < 0 || bullet.y > gameHeight) {
            bullet.destroy();
        }
    });
};
