export const physicsConfig = Object.freeze({
    default: 'arcade',
    arcade: {
        gravity: {
            x: 0,
            y: 0
        },
        debug: false,
    }
});

export const PLAYER = Object.freeze({
    LIVES: 3,
    SPEED: 300,
    FIRE_DELAY: 50, // in ms
});

export const BULLET_VELOCITY = 500;
