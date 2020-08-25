import Phaser from 'phaser';
import BaseScene from './BaseScene';
import { UIAssets } from '../utils/assets';
import { PLAYER } from '../utils/constants';

class UI extends BaseScene {
    constructor(...args) {
        super(...args);

        this.score = 0;
    }

    create() {
        this.livesText = this.add.text(5, 5, `Lives: ${PLAYER.LIVES}`);
        this.scoreText = this.add.text(5, 20, `Score: ${this.score}`);
    }

    updateScore(num = 0) {
        this.score += num;
        this.scoreText.text = `Score: ${this.score}`;
    }

    updateLives(playerLives) {
        this.livesText.text = `Lives: ${playerLives}`;
    }
};

export default UI;
