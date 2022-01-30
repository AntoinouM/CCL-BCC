import GameObject from "./GameObject.js";
import Player from "./Player.js";
import {
  CONFIG,
  HERO,
  CLOUDS,
  GAME,
} from '../Scripts/globals.js'

class Collectible extends GameObject {

  constructor(context, canvas, x, y, width, height, CONFIG) {
    super(context, canvas, x, y, width, height, CONFIG);
    this.dy = 0;
    this.dx = 0;
    this.gravity = CLOUDS.gravity;
    this.state = Math.floor(Math.random() * 5);
    this.planets = [];
    this.timer = 0;
    this.counter = 10000;
  }



  init() {

    this.sprites = {
      0: {
        src: '../Assets/ast.png',
        frames: 16,
        fps: 7,
        image: null,
        frameSize: {
          width: 400,
          height: 400,
        }
      },
      1: {
        src: '../Assets/jupiter.png',
        frames: 16,
        fps: 4,
        image: null,
        frameSize: {
          width: 400,
          height: 400,
        }
      },
      2: {
        src: '../Assets/terra.png',
        frames: 15,
        fps: 6,
        image: null,
        frameSize: {
          width: 400,
          height: 400,
        }
      },
      3: {
        src: '../Assets/neptune.png',
        frames: 5,
        fps: 5,
        image: null,
        frameSize: {
          width: 400,
          height: 400,
        }
      },
      4: {
        src: '../Assets/venus.png',
        frames: 5,
        fps: 5,
        image: null,
        frameSize: {
          width: 400,
          height: 400,
        }
      }
    }


    // Here Object.values transform the object into an array
    Object.values(this.sprites).forEach(sprite => {
      sprite.image = new Image();
      sprite.image.src = sprite.src;
    })
  }

  update(timePassedSinceLastRender) {

    let fallIncreaser;
    switch (GAME.state) {
      case 'play':
        if (HERO.position <= 300) {
          fallIncreaser = (CONFIG.height / (HERO.position + HERO.height - 20)) * 1.4;
        } else if (HERO.position <= 450) {
          if (fallIncreaser = ((CONFIG.height / (HERO.position + HERO.height - 20)) * 0.7) < 1){
            fallIncreaser = 1
          } else {
          fallIncreaser = (CONFIG.height / (HERO.position + HERO.height - 20)) * 0.85;
          }
        } else {
          if (GAME.canLose === 'no' && HERO.yDirection === 'up') {
           fallIncreaser = 1 
          } else { fallIncreaser = 1.5 }
          }
 
           
        // making it go down
        this.y -= this.gravity /* fallIncreaser / 3*/;
        if (GAME.crop < 400 && GAME.crop !=0) {
          this.y -= this.gravity * 5
        } else {
          this.y -= this.gravity * fallIncreaser 
        }
        break;
      case 'end':
        break;
      default:
        break;
    }

  }

  render() {
    super.render();
    let coords;

    switch (GAME.state) {
      case 'play':
        this.context.translate(this.x, this.y);

        coords = this.getImageSpriteCoordinates(this.sprites[this.state]);
    
        this.context.drawImage(
          this.sprites[this.state].image,
          coords.sourceX,
          coords.sourceY,
          coords.sourceWidth,
          coords.sourceHeight,
          -this.width / 2,
          -this.height / 2,
          this.width,
          this.height);
    
        this.context.resetTransform();
        break;
      case 'end':
        break;
    }

  }

  getImageSpriteCoordinates(sprite) {

    let frameX = Math.floor(performance.now() / 1000 * sprite.fps % sprite.frames);

    let coords = {
      sourceX: frameX * sprite.frameSize.width,
      sourceY: 0,
      sourceWidth: sprite.frameSize.width,
      sourceHeight: sprite.frameSize.height,
    };
    return coords;

  }
}


export default Collectible;