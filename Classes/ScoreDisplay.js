import GameObject from "./GameObject.js";
import { GAME, CONFIG } from "../Scripts/globals.js"

class ScoreDisplay extends GameObject {

  constructor(context, x, y) {
    super(context, x, y);
    this.context = context
    this.points = 0;
  }

  init() {

  }

  update() {
    this.points = GAME.score;
  }

  render() {
  this.context.fillStyle = "white"
  this.context.font = "25px cursive"
  this.context.fillText(`${this.points}`, CONFIG.width - 80, 40)

  }

}

export default ScoreDisplay;