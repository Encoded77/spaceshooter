import Phaser from 'phaser';
import {
    gameAssets,
    loadAssetMap,
    handleProgress
} from '../utils/assets';
import { physicsConfig } from '../utils/constants';
import { handleMovement } from '../utils/movement';


class Space extends Phaser.Scene {
    constructor() {
        super({
            key: 'Space',
            physics: physicsConfig
        });

        this.bg; // background object
        this.player;
        this.cursors;
    };

    preload() {
        this.load.on('progress', handleProgress(this));
        loadAssetMap(this, gameAssets);
    };

    create() {
        const {
            width: x,
            height: y
        } = this.game.scale.gameSize

        this.bg = this.add.tileSprite(x/2, y/2, x, y, 'space');

        this.player = this.physics.add.image(x/2, y - 50, 'player').setScale(0.2);
        this.player.body.setSize(280, 280);
        this.player.body.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();
    };

    update() {
        // background handling
        this.bg.tilePositionY -= 4;

        // player movement
        handleMovement(this.player, this.cursors);
    };
};

export default Space;