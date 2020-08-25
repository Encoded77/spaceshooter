import Phaser from 'phaser';

class BaseEntity extends Phaser.Physics.Arcade.Sprite {
    /**
    * @param {Phaser.Scene} scene
    * @param {number} x
    * @param {number} y
    * @param {string} texture
    */
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
    };

    // TODO: can add shared utils here
}

export default BaseEntity;
