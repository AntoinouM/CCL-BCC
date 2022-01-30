// global constants
const CONFIG = {
    width: 550,
    height: 650,
    debug: false,
}
const HERO = {
    width: 80,
    height: 80,
    velocity: 0.02,
    gravity: -0.001,
    yDirection: 'down',
    fallingSpeed: 0,
    position: 596,
    YposToDelta : 91.83,
    cloudContact: false,
    gameStartDelay: 0.2,
}

const MOUSE = {
    x: 0,
    y: 0,
}

const CLOUDS = {
    width: 40,
    height: 40,
    gravity: -0.5,
    margin: 50,
    apparitionTimeMin: 1000,
    apparitionTimeMax: 2200,
    counter: 3000,
    sizeDelta: 1,
}

const BONUS = {
    width: 47,
    height: 47,
    speed: 2,
    apparitionTimeMin: 9000,
    apparitionTimeMax: 17000,
    counter: 3000,
}

const GAME = {
    state: 'startable',
    background: 'fix',
    canLose: 'no',
    crop: 400,
    reverseCrop: 0,
    gameObjects : [],
    collectibles : [],
    rockets: [],
    scoreDisplays: [],
    scores: [],
    imagesToDel : [],
    score : 0,
    highScore: 0,
}

const VERTICAL_FORCE = 0.62;
const horizonHeight = HERO.height / 2 - 5;
const MAX_DISTANCE = 450;
const ground = CONFIG.height - HERO.height / 1.5;
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');


export {
    horizonHeight,
    ground,
    CONFIG,
    HERO,
    canvas,
    context,
    MAX_DISTANCE,
    VERTICAL_FORCE,
    CLOUDS,
    BONUS,
    GAME,
    MOUSE,
};