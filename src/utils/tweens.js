
/**
 * @param {Phaser.Scene} scene 
 * @param {*} actor
 * @param {number} duration 
 */
export const flashRed = (scene, actor, duration = 100, repeat = 0) => {
    const c1 = Phaser.Display.Color.HexStringToColor('#ffffff'); // From no tint
    const c2 = Phaser.Display.Color.HexStringToColor('#ff0000'); // To RED

    actor.tweenStep = 0;
    scene.tweens.add({
        targets: actor,
        tweenStep: 100,
        onUpdate: () => {
            let col = Phaser.Display.Color.Interpolate.ColorWithColor(c1, c2, 100, actor.tweenStep);
            let colourInt = Phaser.Display.Color.GetColor(col.r, col.g, col.b);
            actor.setTint(colourInt);
        },
        onComplete: () => {
            actor.setTint(0xFFFFFF); // reset tint to default
        },
        repeat,
        duration,
        yoyo: true // Return to first tint
    });
};
