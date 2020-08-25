import Phaser from 'phaser';
import BaseScene from './BaseScene';
import { UIAssets } from '../utils/assets';

class UI extends BaseScene {
    constructor(...args) {
        super(...args);

        this.score = 0;
        this.lives = 3;
    }

    create() {
        this.livesText = this.add.text(5, 5, `Lives: ${this.lives}`); // TODO: get lives from player
        this.scoreText = this.add.text(5, 20, `Score: ${this.score}`);
    }

    updateScore(num = 0) {
        this.score += num;
        this.scoreText.text = `Score: ${this.score}`;
    }

    updateLives(playerLives) {
        this.lives = playerLives;
        this.livesText = `Lives: ${this.lives}`
    }
};

export default UI;
