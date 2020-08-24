import Phaser from 'phaser';
import Space from './scenes/Space';
import UI from './scenes/UI';
import GameOver from './scenes/GameOver';

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 480,
    height: 640,
    scene: [Space, UI, GameOver],
});
