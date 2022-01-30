import { GAME } from '../Scripts/globals.js';
import GameObject from './GameObject.js';
import { CONFIG, HERO } from '../Scripts/globals.js';

class Backgrounds extends GameObject {
  constructor(context, canvas, x, y, width, height, CONFIG) {
    super(context, x, y, width, height, CONFIG);
  }

  init() {
    this.backgroundStart = new Image();
    this.backgroundStart.src = '../Assets/background1.png';

    this.backgroundPlay = new Image();
    this.backgroundPlay.src = '../Assets/background2.png';

  }

  update(timePassedSinceLastRender) {
    switch (GAME.state) {
      case 'startable':
        GAME.crop = 400;
        break;
      case 'play':
        if (HERO.position < 400) {
          GAME.background = 'change';
        }
        if (GAME.background === 'change') {
          if (GAME.crop > 0) {
            GAME.crop -= 2;
            GAME.reverseCrop = GAME.crop;
          }
        }
        break;
      case 'end':
        if (GAME.reverseCrop < 400) {
          GAME.reverseCrop += 2;
        }
        break;
    }
  }

  render() {
    switch (GAME.state) {
      case 'startable':
        this.context.resetTransform();
        this.context.drawImage(this.backgroundStart, 0, 0, 550, 650);
        break;
      case 'play':

        this.context.drawImage(
          this.backgroundPlay,
          0,
          GAME.crop,
          550,
          650,
          0,
          0,
          550,
          650
        );

        break;
      case 'end':
        this.context.drawImage(
          this.backgroundPlay,
          0,
          GAME.reverseCrop,
          550,
          650,
          0,
          0,
          550,
          650
        );
        this.context.resetTransform();
        break;
    }
  }
}

export default Backgrounds;
