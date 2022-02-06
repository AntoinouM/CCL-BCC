import GameObject from "./GameObject.js";
import {
    BONUS
  } from '/Scripts/globals.js'

class Bonuses extends GameObject {

  constructor(context, canvas, x, y, width, height, type, CONFIG) {
    super(context, canvas, x, y, width, height, CONFIG);
    this.dt = 1;
    this.type = type;
    this.state = "rocket"
    this.timer = 0;
}

init() {

    this.sprites = {
        rocket: {
            src: '../Assets/rocket.png',
            frames: 4,
            fps: 4,
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
        this.x += BONUS.speed;
}

render() {
    super.render();

        this.context.translate(this.x, this.y);

        let coords = this.getImageSpriteCoordinates(this.sprites[this.state]);

        this.context.drawImage(
            this.sprites[this.state].image,
            coords.sourceX,
            coords.sourceY,
            coords.sourceWidth,
            coords.sourceHeight,
            -BONUS.width / 2,
            -BONUS.height / 2,
            BONUS.width,
            BONUS.height);

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

export default Bonuses;