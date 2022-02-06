import {
    CONFIG,

} from '../Scripts/globals.js'

class GameObject {

  constructor(context, canvas, x, y, width, height, CONFIG) {
    this.context = context;
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.CONFIG = CONFIG;
    this.init();
  }

  init() {

  }

  update() {

  }

  render() {

    if (CONFIG.debug) {
      this.context.lineWidth = 4;

      let bb = this.getBoundingBox();
      this.context.strokeStyle = 'blue';
      this.context.translate(bb.x, bb.y);
      this.context.strokeRect(0, 0, bb.w, bb.h);
      this.context.resetTransform();

    }
  }

  getBoundingBox() {
    return {
      x: this.x - this.width / 2 + this.width * 0.25,
      y: this.y - this.height / 2 + this.height * 0.05,
      w: this.width * 0.5,
      h: this.height * 0.9
    }
  }
};

export default GameObject;