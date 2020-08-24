import { PLAYER } from './constants';

/**
 * Handle actor movement via the direction keys
 * @param {Phaser.Physics.Arcade.Image} actor 
 * @param {Phaser.Types.Input.Keyboard.CursorKeys} cursors 
 */
export const handleMovement = (actor, cursors) => {
    if (cursors.left.isDown) {
        actor.body.setVelocityX(-PLAYER.SPEED);
    }
    if (cursors.right.isDown) {
        actor.body.setVelocityX(PLAYER.SPEED);
    }
    if (cursors.up.isDown) {
        actor.body.setVelocityY(-PLAYER.SPEED);
    }
    if (cursors.down.isDown) {
        actor.body.setVelocityY(PLAYER.SPEED);
    }
    if ( !cursors.left.isDown && !cursors.right.isDown) {
        actor.body.setVelocityX(0, 0);
    }
    if (!cursors.up.isDown && !cursors.down.isDown) {
        actor.body.setVelocityY(0, 0);
    }
};
