/**
 * 
 * @param {Phaser.Scene} ctx 
 * @param {Phaser.Physics.Arcade.Sprite} actor 
 */
export const explosionOnActor = (ctx, actor) => {
    const explosion = ctx.add.sprite(actor.x, actor.y, 'explosion');
    explosion.anims.play('explode');
    explosion.on('animationcomplete', () => explosion.destroy());
};
