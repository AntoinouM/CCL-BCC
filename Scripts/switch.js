import {
  GAME,
  canvas,
  context,
  CONFIG,
  HERO,
  MOUSE,
} from './globals.js';
import Buttons from '../Classes/Buttons.js';
import ScoreDisplay from '../Classes/ScoreDisplay.js';

function switchState(state) {
  GAME.state = state;
  let startBtn;
  let scoreDisplay;

  switch (GAME.state) {
    case 'startable':
      startBtn = new Buttons(context, canvas, 195, 400, 160, 66, CONFIG);
      GAME.gameObjects.push(startBtn);
      break;
    case 'play':
      GAME.imagesToDel = []
        scoreDisplay = new ScoreDisplay(context, 50, 100)
        GAME.gameObjects.push(scoreDisplay)
        GAME.scoreDisplays.push(scoreDisplay)
      GAME.canLose = 'no';
      break;
    case 'end':
      GAME.collectibles.forEach((collectible) => {
        GAME.gameObjects.splice(GAME.gameObjects.indexOf(collectible), 1);
      });
      GAME.scoreDisplays.forEach((scoreDisplay) => {
        GAME.gameObjects.splice(GAME.gameObjects.indexOf(scoreDisplay), 1);
      });
      GAME.collectibles = [];
      GAME.scoreDisplays = [];
      GAME.scores.push(GAME.score)
      GAME.highScore = Math.max(...GAME.scores)

      


      HERO.gameStartDelay = 0.2;
      HERO.fallingSpeed = 0;
      
      canvas.addEventListener('click', () => {
        if (
          MOUSE.x > 195 &&
          MOUSE.x < 355 &&
          MOUSE.y > 400 &&
          MOUSE.y < 466 &&
          GAME.state === 'end'
        ) {
          GAME.score = 0;
          switchState('play');
          GAME.background = 'fix';
          GAME.crop = 400;
          GAME.canLose = 'no';
        }
      });

      break;
    case 'restart':
      break;
    default:
      break;
  }
}

export { switchState };
