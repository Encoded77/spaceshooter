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
        console.log('Space');
        this.load.on('progress', handleProgress(this));
        loadAssetMap(this, gameAssets);
        loadXMLAtlasMap(this, gameAtlases);
    };

    create() {
        const {
            width,
            height,
        } = this.game.scale.gameSize
        // background
        this.bg = this.add.tileSprite(width/2, height/2, width, height, 'space');

        // enemies
        this.enemies = this.physics.add.group({
            classType: Enemy,
        });

        // player
        this.player = new Player(this, width/2, height - 50);

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
        this.physics.add.overlap(this.enemies, this.player, this.player.handleHitByEnemy);

        // animations
        this.anims.create({ key: 'explode', frames: this.anims.generateFrameNames('explosion') });
    };

    update() {
        // background handling
        this.bg.tilePositionY -= 3;

        // player actions
        this.player.handleCursors(this.cursors);
        this.player.handleFire(this.bullets, this.cursors);

        // enemy spawn
        if (this.enemies.getLength() < 1) {
            this.spawnEnemies();
        }

        // enemy movement
        this.enemies.children.each(enemy => enemy.move());

        // destroy bullets going past the limit
        bulletCleanup(this, this.bullets);
    };

    spawnEnemies(number = 8) {
        for (let i = 0; i < number; i++) {
            this.enemies.create(
                Phaser.Math.Between(0, this.game.scale.width),
                Phaser.Math.Between(30, 150)
            );
        }
    }
};

export default Space;