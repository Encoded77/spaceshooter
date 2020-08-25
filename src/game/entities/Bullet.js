import BaseEntity from './BaseEntity';

class Bullet extends BaseEntity {

    constructor(scene, x, y) {
        super(scene, x, y, 'bullet1');
        this.setScale(0.1, 0.5);
    }
};

export default Bullet;
