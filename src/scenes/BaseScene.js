import Phaser from 'phaser';

class BaseScene extends Phaser.Scene {
    constructor(...args) {
        super(...args);
    };

    getWidth() {
        return this.scale.width
    }

    getHeight() {
        return this.scale.height
    }

    // TODO: scene shared utils here
};

export default BaseScene;
