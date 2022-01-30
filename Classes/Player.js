import GameObject from './GameObject.js';
import {
  switchState
} from '../Scripts/switch.js';
// import constants
import {
  ground,
  CONFIG,
  HERO,
  canvas,
  MAX_DISTANCE,
  VERTICAL_FORCE,
  GAME,
  MOUSE,
} from '../Scripts/globals.js'

class Player extends GameObject {

  constructor(context, canvas, x, y, width, height, CONFIG) {
    super(context, canvas, x, y, width, height, CONFIG);
    this.dx = 0;
    this.dy = 0;
    this.lastDirectionX = 1;
    this.velocity = HERO.velocity;
    this.verticalForce = 0;
    this.mouseX = 0;
    this.mouseDistance = 0;
    this.gravity = HERO.gravity;
    this.state = "walk";

  }

  init() {

    // this is where you check the cursor position and do if statement to do things with the information
    window.addEventListener("mousemove", (event) => {
      this.mouseX = event.clientX - canvas.offsetLeft;
      MOUSE.x = event.clientX - canvas.offsetLeft;
      MOUSE.y = event.clientY - canvas.offsetTop;
    });
    canvas.addEventListener('click', (event) => {
      if (GAME.state === 'play' && HERO.gameStartDelay <=0) {
        if (this.y === ground) {
          this.verticalForce -= VERTICAL_FORCE;
        }
      }
    });

    // create a data structure that hold the information of your sprite
    this.sprites = {
      walk: {
        src: '../Assets/astroWalkFinal.png',
        frames: 6,
        fps: 8,
        image: null,
        frameSize: {
          width: 400,
          height: 400,
        }
      },
      idle: {
        src: '../Assets/astroIdle.png',
        frames: 4,
        fps: 4,
        image: null,
        frameSize: {
          width: 400,
          height: 400,
        }
      },
      rise: {
        src: '../Assets/astroRise3.png',
        frames: 8,
        fps: 4,
        image: null,
        frameSize: {
          width: 400,
          height: 400,
        }
      },
      fly: {
        src: '../Assets/astroFly2.png',
        frames: 4,
        fps: 8,
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


  };

  update(timePassedSinceLastRender) {
// Georg's
if (GAME.state === 'play') HERO.gameStartDelay -= timePassedSinceLastRender;


    // rotating image
    if (Math.floor(this.mouseX) < this.x) {
      this.dx = -1;

    } else if (Math.floor(this.mouseX) > this.x) {
      this.dx = 1;
    }


    // changing x in regard of the mouse position
    if (this.mouseX <= this.x) {

      if (Math.floor((this.x) - this.mouseX) < MAX_DISTANCE) {
        this.mouseDistance = Math.floor(this.x - this.mouseX);
      } else {
        this.mouseDistance = MAX_DISTANCE;
      }
    } else if (this.mouseX > this.x) {

      if (Math.floor(this.mouseX - (this.x)) < MAX_DISTANCE) {
        this.mouseDistance = Math.floor(this.mouseX - (this.x));
      } else {
        this.mouseDistance = MAX_DISTANCE;
      }
    }

    // store the last direction we moved in
    if (this.dx !== 0) this.lastDirectionX = this.dx;
    HERO.YposToDelta = Math.floor(HERO.position / CONFIG.height * 100);

    // movement implementation
    // changing this.x regarding the distance with the mouse
    this.x += timePassedSinceLastRender * this.dx * this.velocity * (this.mouseDistance / 10);

    // create a variable to influence the falling speed if too close to the top
    let gravityDelta = 1;

    if ((HERO.position + HERO.height) * 100 / CONFIG.height < 40) {
      gravityDelta = 1 + (CONFIG.height / (HERO.position + HERO.height)) / 10;
    } else {
      gravityDelta = 1
    }

    // y movement with simplified Euleur algorythm
    // vertical velocity
    this.verticalForce -= this.gravity * timePassedSinceLastRender * gravityDelta
    // vertical position
    this.y += this.verticalForce * timePassedSinceLastRender;
    HERO.position = this.y;

    // ground check
    if (this.y > ground && GAME.canLose === 'no') {
      this.y = ground;
      this.verticalForce = 0;
    } else if (this.y >= CONFIG.height - HERO.height / 3 && GAME.canLose === 'yes' && GAME.state != 'end') {
      switchState('end');
    } else if (GAME.state === 'end') {
        this.y = ground
      
    }


    // verticalForce input if contact with clouds
    if (HERO.cloudContact === true && GAME.state === 'play') {
      this.verticalForce = -VERTICAL_FORCE;
      HERO.cloudContact = false;
    }

    if (GAME.state === 'end') {
      HERO.fallingSpeed = 0;
    } else {
      HERO.fallingSpeed = this.verticalForce;
    }
    
    // boundaries checking
    // check for right boundary
    if (this.x > this.CONFIG.width) this.x = this.CONFIG.width;
    // check for left boundary
    if (this.x < 0) this.x = 0;
    // check for top boundary
    if (this.y <= 0) this.y = 0;

    // define the state variable in regard of mouse distance and if on the ground
    if (this.y === ground) {
      if (HERO.yDirection === 'down' && GAME.state === 'end' && GAME.reverseCrop != 400) {
        this.state = "fly";
      } else {
      if (this.mouseDistance > 2) {
        this.state = "walk";
      } else {
        this.state = "idle";
      }
    }
    } else {
      if (Math.floor(this.verticalForce * 100) > 0) {
        this.state = "fly";
        HERO.yDirection = "down";
      } else {
        this.state = "rise";
        HERO.yDirection = "up";
      }


    }
    // declaring a secondary startig condition
    if (HERO.position <= 400) {
      GAME.canLose = 'yes';
    }
  }

  render() {
    super.render();

    this.context.translate(this.x, this.y);

    // flip the image if we're moving to the left
    this.context.scale(this.lastDirectionX, 1);

    let coords = this.getImageSpriteCoordinates(this.sprites[this.state]);

    this.context.drawImage(
      this.sprites[this.state].image,
      coords.sourceX,
      coords.sourceY,
      coords.sourceWidth,
      coords.sourceHeight,
      -this.width / 2,
      -this.height / 2,
      HERO.width,
      HERO.height);

    this.context.resetTransform();
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

export default Player;