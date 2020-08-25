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
