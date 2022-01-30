import GameObject from "./GameObject.js";
import {
    horizonHeight,
    ground,
    CONFIG,
    HERO,
    canvas,
    context,
    MAX_DISTANCE,
    BIRDS,
    CLOUDS,
    BONUS
  } from '/Scripts/globals.js'

class Bonuses extends GameObject {

  constructor(context, x, y, width, height, CONFIG) {
    super(context, x, y, width, height, CONFIG);
    this.dy = 0;
    this.dx = 0;
    this.gravity = CLOUDS.gravity;
  }

  init() {
  

  }

  update(timePassedSinceLastRender) {
    // making it go down
    this.dy -= this.gravity * timePassedSinceLastRender;
    this.y -= this.gravity;
    
  }

  render() {
    this.context.beginPath();
    this.context.fillStyle = 'white';
    this.context.arc(this.x, this.y, CLOUDS.width, 0, 2 * Math.PI);
    this.context.fill();
  }
}

export default Bonuses;