import GameObject from "./GameObject.js";
import {
    GAME,
    MOUSE
  } from '../Scripts/globals.js'

class Buttons extends GameObject {

  constructor(context, canvas, x, y, width, height, CONFIG) {
    super(context, canvas, x, y, width, height, CONFIG);
    this.context = context
  }

  init() {
  

    this.startButton = new Image();
    this.startButton.src = '../Assets/buttonStart.png';

    this.restartButton = new Image();
    this.restartButton.src = '../Assets/buttonRestart.png';

  }

  update(timePassedSinceLastRender) {

    
  }

  render() {
    switch(GAME.state) {
        case 'startable':
            this.context.drawImage (this.startButton, this.x, this.y, this.width, this.height)
            if (MOUSE.x > 195 && MOUSE.x < 355 && MOUSE.y > 400 && MOUSE.y < 466) {
                this.context.beginPath();
                this.context.rect(198, 403, 154, 61);
                this.context.fillStyle = 'rgba(255, 255, 255, 0.2)'
                this.context.fill()
            }
            break;
        case 'play':

            break;
        case 'end':
          this.context.drawImage (this.restartButton, this.x, this.y, this.width, this.height)
          if (MOUSE.x > 195 && MOUSE.x < 355 && MOUSE.y > 400 && MOUSE.y < 466) {
              this.context.beginPath();
              this.context.rect(198, 403, 154, 61);
              this.context.fillStyle = 'rgba(255, 255, 255, 0.2)'
              this.context.fill()
          }
            break;
  }
  }
}



export default Buttons;