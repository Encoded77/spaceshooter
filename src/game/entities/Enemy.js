import Phaser from 'phaser';
import BaseEntity from './BaseEntity';

class Enemy extends BaseEntity {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemy1');
        this.setScale(0.2);
        this.toggleFlipY();
    };

    // TODO: die, handle life lost etc
};

export default Enemy;
