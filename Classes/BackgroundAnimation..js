import GameObject from "./GameObject.js";
import {
    CONFIG,
    passingPlanet,
} from '../Scripts/globals.js'

class BackgroundAnimation extends GameObject {

    constructor(context, canvas, x, y, width, height, type, CONFIG) {
        super(context, canvas, x, y, width, height, CONFIG);
        this.dt = 1;
        this.type = type;
        this.timer = 0;
    }

    init() {

    };

    update(timePassedSinceLastRender) {

        if (this.type === 1) {
            
            this.y += 0.4;
            
            this.dt = 1 - (this.y / 500)
        } else if (this.type === 2) {
            let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            this.x += 1 * plusOrMinus;
            this.y += 2;
        } else {
            this.x += 0.8;
            if (this.x <= CONFIG.width / 4) {
                this.y -= 0.3;
            } else if (this.x <= CONFIG.width / 2) {
                this.y -= 0.15;
            } else if (this.x <= CONFIG.width / 2 + 100) {
                this.y *= 1;
            } else if (this.x <= (CONFIG.width / 2) + (CONFIG.width / 4)) {
                this.y += 0.15;
            } else {
                this.y += 0.3
            }
        }      
    }

    render() {
        super.render();

        if (this.type === 1) {
            this.context.translate(this.x, this.y);
            this.context.beginPath();

            this.context.fillStyle = `rgba(255, 255, 255, ${this.dt})`

            this.context.arc(100, -50, 2, 0, 2 * Math.PI);
            this.context.fill();

            this.context.resetTransform();
        } else if (this.type === 2) {
           // etoile filante
        } else {
            this.context.translate(this.x, this.y);
            this.context.drawImage(passingPlanet, -100, 100, 100, 100)
            this.context.resetTransform();
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


export default BackgroundAnimation;