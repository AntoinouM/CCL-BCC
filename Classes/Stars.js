import GameObject from "./GameObject.js";
import {
    CONFIG,
    BONUS,
    GAME,
    HERO
} from '../Scripts/globals.js'

class Stars extends GameObject {

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
                src: '/Assets/rocket.png',
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

        this.imageP = new Image();
        this.imageP.src = '../Assets/passingPlanet.png';

    };

    update(timePassedSinceLastRender) {

        if (this.type === 1) {
            
            this.y += 0.4;
            
            this.dt = 1 - (this.y / 500)
        } else if (this.type === 2) {
            this.x += BONUS.speed;
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
        switch (GAME.state) {
            case 'startable':

                break;
            case 'play':

                break;
            case 'end':

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
        } else {
            this.context.translate(this.x, this.y);
            this.context.drawImage(this.imageP, -100, 100, 100, 100)
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


export default Stars;