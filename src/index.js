import Phaser from 'phaser';
import Boot from './scenes/Boot';
import Space from './scenes/Space';
import UI from './scenes/UI';
import GameOver from './scenes/GameOver';

class SpaceShooter extends Phaser.Game {
    constructor() {
        super({
            type: Phaser.AUTO,
            width: 480,
            height: 640,
            title: 'Spaceshooter'
        });

        this.scene.add('Boot', Boot);
        this.scene.add('Space', Space);
        this.scene.add('UI', UI);
        this.scene.add('GameOver', GameOver);

        this.scene.start('Boot');
    }
}

export default new SpaceShooter();
