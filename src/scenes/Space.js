import Phaser from 'phaser';
import BaseScene from './BaseScene';
import Player from '../game/entities/Player';
import Enemy from '../game/entities/Enemy';
import Bullet from '../game/entities/Bullet';
import {
    gameAssets,
    loadAssetMap,
    gameAtlases,
    loadXMLAtlasMap,
    handleProgress
} from '../utils/assets';
import { physicsConfig } from '../utils/constants';
import { bulletCleanup } from '../utils/cleanup';


class Space extends BaseScene {
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
        loadXMLAtlasMap(this, gameAtlases);
    };

    create() {
        const {
            width: x,
            height: y
        } = this.game.scale.gameSize
        // background
        this.bg = this.add.tileSprite(x/2, y/2, x, y, 'space');

        // enemies
        this.enemies = this.physics.add.group({
            classType: Enemy,
        });
        this.enemies.create(x/2, 50);

        // player
        this.player = new Player(this, x/2, y - 50);

        // keys
        this.cursors = this.input.keyboard.createCursorKeys();

        // bullets
        this.bullets = this.physics.add.group({
            classType: Bullet,
        });

        // collions
        this.physics.add.overlap(this.enemies, this.bullets, (enemy, bullet) => {
            enemy.takeDamage(bullet.power);
            bullet.destroy();
        });

        // animations
        this.anims.create({ key: 'explode', frames: this.anims.generateFrameNames('explosion') });
    };

    update() {
        // background handling
        this.bg.tilePositionY -= 3;

        // player actions
        this.player.handleCursors(this.cursors);
        this.player.handleFire(this.bullets, this.cursors);

        // destroy bullets going past the limit
        bulletCleanup(this, this.bullets);
    };
};

export default Space;