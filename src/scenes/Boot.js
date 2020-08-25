import BaseScene from './BaseScene';

class Boot extends BaseScene {
    create() {
        console.log('Boot');
        this.scene.run('Space');
        this.scene.run('UI');
    }
}

export default Boot;
