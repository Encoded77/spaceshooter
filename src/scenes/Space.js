import Phaser from 'phaser';
import {
    gameAssets,
    loadAssetMap,
    handleProgress
} from '../utils/assets';
import { physicsConfig } from '../utils/constants';
import { handleMovement } from '../utils/movement';
import { handleFire, handleEnemyHit, bulletCleanup } from '../utils/combat';


class Space extends Phaser.Scene {
    constructor() {
        super({
            key: 'Space',
            physics: physicsConfig
        });

        this.bg; // background object
        this.player;
        this.cursors;
        this.bullets;
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
        // background
        this.bg = this.add.tileSprite(x/2, y/2, x, y, 'space');

        // enemies
        this.enemies = this.physics.add.group();
        const enemy = this.enemies.create(x/2, 50, 'enemy1').setScale(0.2).setSize(370, 300);
        enemy.angle = 180;

        // player
        this.player = this.physics.add.image(x/2, y - 50, 'player').setScale(0.2);
        this.player.body.setSize(280, 280);
        this.player.body.setCollideWorldBounds(true);

        // keys
        this.cursors = this.input.keyboard.createCursorKeys();

        // bullets
        this.bullets = this.physics.add.group();

        // collions
        this.physics.add.overlap(this.enemies, this.bullets, handleEnemyHit);
    };

    update() {
        // background handling
        this.bg.tilePositionY -= 4;

        // player actions
        handleMovement(this.player, this.cursors);
        handleFire(this.player, this.bullets, this.cursors);

        // destroy bullets going past the limit
        bulletCleanup(this, this.bullets);
    };
};

export default Space;