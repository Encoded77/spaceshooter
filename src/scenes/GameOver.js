import Phaser from 'phaser';
import BaseScene from './BaseScene';
import { gameOverAssets } from '../utils/assets';

class GameOver extends BaseScene {
    constructor() {
        super('GameOver');
    }

    create() {
        const { width, height } = this.scale;
        const UI = this.scene.get('UI');
        const score = UI.score;
        UI.score = 0; // weird bug where score doesnt reset

        this.add.text(width/2, height/2 - 35, 'GAME OVER')
            .setOrigin(0.5)
            .setFontSize(40);

        this.add.text(width/2, height/2, `Score: ${score}`)
            .setOrigin(0.5);

        this.add.text(width/2, height/2 + 30, 'Press space to replay')
            .setOrigin(0.5);

        this.scene.stop('Space');
        this.scene.stop('UI');
        this.scene.stop('Boot');
        
        const spacebar = this.input.keyboard.addKey('SPACE');
        spacebar.on('up', () => {
            this.scene.start('Boot');
        });
    }
};

export default GameOver;
