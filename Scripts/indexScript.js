import Player from '../Classes/Player.js';
import Collectible from '../Classes/Collectible.js';
import Buttons from '../Classes/Buttons.js';
import Stars from '../Classes/Stars.js';
import Backgrounds from '../Classes/Backgrounds.js';
import RandomDispatcher, {
  randomNumberBetween
} from './RandomDispatcher.js';


// import constants
import {
  ground,
  CONFIG,
  HERO,
  canvas,
  context,
  CLOUDS,
  GAME,
  BONUS,
  MOUSE,
} from './globals.js'
import {
  switchState
} from './switch.js';

// variables
let lastTickTimestamp = 0;
let background;
let player;
let randomX;
let randomY;
let spawnTimeDelta;
let scoreDisplay = new Image();
scoreDisplay.src = '../Assets/scores.png';
let backgroundMusic = new Audio('../Assets/Sounds/Future Idyll.mp3');
let swosh1 = new Audio('../Assets/Sounds/swosh-02.flac');
let swosh2 = new Audio('../Assets/Sounds/swosh-13.flac');
let swosh3 = new Audio('../Assets/Sounds/swosh-19.flac');
let swoshs = [swosh1, swosh2, swosh3];
let scores = new Image();


// audio configuration
backgroundMusic.volume = 0.18;
backgroundMusic.loop = true;
swosh1.volume = 0.4;
swosh2.volume = 0.4;
swosh3.volume = 0.4;

/**
 * Initialize the game
 */
const init = function () {


  // set width/height attributes on the canvas.
  canvas.setAttribute('width', CONFIG.width);
  canvas.setAttribute('height', CONFIG.height);

  background = new Backgrounds(context, canvas, 0, 0, 550, 650, CONFIG);
  GAME.gameObjects.push(background);


  canvas.addEventListener('click', () => {
    if (MOUSE.x > 195 && MOUSE.x < 355 && MOUSE.y > 400 && MOUSE.y < 466 && GAME.state === 'startable') {
      switchState('play');
      backgroundMusic.play();
    }
  });


  player = new Player(context, canvas, 0, ground, HERO.width, HERO.height, CONFIG);
  GAME.gameObjects.push(player);

  let randomDispatcherStar = new RandomDispatcher(function () {
    let randomStarX = randomNumberBetween(8, CONFIG.width - 8);
    let star = new Stars(context, canvas, randomStarX, 0, 10, 10, 1, CONFIG)
    GAME.gameObjects.push(star);
  }, {
    min: 200,
    max: 1500
  });

  let randomPlanet = new RandomDispatcher(function () {
    let randomStarY = randomNumberBetween(100, CONFIG.height / 3);
    let backgrndPlanet = new Stars(context, canvas, 0, randomStarY, 10, 10, 3, CONFIG)
    GAME.gameObjects.push(backgrndPlanet);
  }, {
    min: 15000,
    max: 25000
  });

  switchState('startable')

  // kick off first iteration of render()
  lastTickTimestamp = performance.now();
  requestAnimationFrame(gameLoop);



};


const gameLoop = () => {


  // calculate how much time has passed since last render (last tick)
  // we are using performance.now() instead of timestamp to compare it to the first (initial) value
  // of lastTickTimestamp properly. It should provide the same precision as timestamp.
  let timePassedSinceLastRender = performance.now() - lastTickTimestamp;

  update(timePassedSinceLastRender);
  render();

  lastTickTimestamp = performance.now();

  // call next iteration
  requestAnimationFrame(gameLoop);
}


const update = (timePassedSinceLastRender) => {

  // creating a counter for spawning Planets and Rockets
  CLOUDS.counter -= timePassedSinceLastRender;
  BONUS.counter -= timePassedSinceLastRender;

  // creating a coefficient to accelerate the spawning time regarding the HERO position
  if (GAME.state === 'play') {
    if (HERO.YposToDelta < 40) {
      spawnTimeDelta = 3
    } else if (HERO.YposToDelta < 55) {
      spawnTimeDelta = 2
    } else if (HERO.position < 400) {
      if(GAME.canLose === 'no') {
        spawnTimeDelta = 1.5
      } else { 
      spawnTimeDelta = 1.1
      }
    } else {
      spawnTimeDelta = 1
    }
  }

  // creating a variable to decrease the size of the planet overtime
  if (GAME.state === 'play') {
    CLOUDS.sizeDelta -= 0.00003;
    if (CLOUDS.sizeDelta < 0.5) {
      CLOUDS.sizeDelta = 0.5
    }
  }

  // assigning some random variables for a random spawning point
  randomX = randomNumberBetween(CLOUDS.width, CONFIG.width - CLOUDS.width);
  while (randomX < player.x + 100 && randomX > player.x - 100) {
    randomX = randomNumberBetween(CLOUDS.width, CONFIG.width - CLOUDS.width);
  }

  // .log(Math.floor(randomX), Math.floor(player.x))
  randomY = randomNumberBetween(70, CONFIG.height / 2);

  if (GAME.state === 'play') {
    // spawn my items when the counter reaches 0
    if (Math.floor(CLOUDS.counter <= 0)) {
      let planet = new Collectible(context, canvas, randomX, -CLOUDS.height, CLOUDS.width * CLOUDS.sizeDelta, CLOUDS.height * CLOUDS.sizeDelta, CONFIG);
      GAME.gameObjects.push(planet);
      GAME.collectibles.push(planet);
      if (Math.floor(CLOUDS.counter) <= -1)
        CLOUDS.counter = randomNumberBetween(CLOUDS.apparitionTimeMin / spawnTimeDelta, CLOUDS.apparitionTimeMax / spawnTimeDelta);
    }

    if (Math.floor(BONUS.counter <= 0)) {
      let rocket = new Stars(context, canvas, -BONUS.width, randomY, BONUS.width, BONUS.height, 2, CONFIG);
      GAME.gameObjects.push(rocket);
      GAME.collectibles.push(rocket);
      if (Math.floor(BONUS.counter) <= -1)
        BONUS.counter = randomNumberBetween(BONUS.apparitionTimeMin, BONUS.apparitionTimeMax);
    }

  }

  GAME.gameObjects.forEach(function (gameObject) {
    gameObject.update(timePassedSinceLastRender);
  });

  // collect all colliding gameobjects
  let removeItems = [];
  GAME.collectibles.forEach((collectible) => {
    if (checkCollisionBetween(player, collectible)) {
      removeItems.push(collectible);
      HERO.cloudContact = true;
      swoshs[Math.floor(Math.random() * 3)].play();
      GAME.score += 10;
    }
  });

  // remove colliding collectibles
  removeItems.forEach((collectible) => {
    GAME.collectibles.splice(GAME.collectibles.indexOf(collectible), 1);
    GAME.gameObjects.splice(GAME.gameObjects.indexOf(collectible), 1);
  });

}

/**
 * Main Render function
 */
const render = () => {
  // clear the stage
  context.clearRect(0, 0, CONFIG.width, CONFIG.height);


  GAME.gameObjects.forEach((gameObject) => {
    gameObject.render();
  });
  if (GAME.state === 'end') {
    scores.src = '../Assets/scores.png';
    context.drawImage(scores, 0, 0, 550, 650)
    context.fillStyle = "white"
    context.font = "35px cursive"
    context.fillText(`${GAME.score}`, (CONFIG.width / 2) - (context.measureText(GAME.score).width / 2), 200)
    context.fillText(`${GAME.highScore}`, (CONFIG.width / 2) - (context.measureText(GAME.highScore).width / 2), 320)
    const restartBtn = new Buttons(
      context,
      canvas,
      195,
      400,
      160,
      66,
      CONFIG
    );
    restartBtn.render();
  }
}

let checkCollisionBetween = (gameObjectA, gameObjectB) => {

  let bbA = gameObjectA.getBoundingBox();
  let bbB = gameObjectB.getBoundingBox();

  if (
    bbA.x < bbB.x + bbB.w &&
    bbA.x + bbA.w > bbB.x &&
    bbA.y < bbB.y + bbB.h &&
    bbA.y + bbA.h > bbB.y
  ) {
    // collision happened
    return true;
  } else return false;

}

// Wait for the windows 'load' event before initializing.
window.addEventListener('load', () => {
  init();
});
