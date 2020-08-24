import player from '../assets/P-blue-b.png';
import space from '../assets/space.png'
import enemy1 from '../assets/Enemy1.png'
import enemy2 from '../assets/Enemy2.png'
import enemy3 from '../assets/Enemy3.png'
import enemy4 from '../assets/Enemy4.png'
import boss1 from '../assets/EnemyBoss.png';
import bullet1 from '../assets/bullet1.png';
import bullet2 from '../assets/bullet2.png';

// load key => value pair of assets 
export const loadAssetMap = (ctx, assets) => {
    Object.entries(assets).map(([key, file]) => ctx.load.image(key, file));
};

export const handleProgress = (ctx) => (val) => {
    console.log(val);
};

export const gameAssets = Object.freeze({
    player,
    space,
    enemy1,
    enemy2,
    enemy3,
    enemy4,
    boss1,
    bullet1,
    bullet2,
});

export const UIAssets = Object.freeze({

});

export const gameOverAssets = Object.freeze({

});
