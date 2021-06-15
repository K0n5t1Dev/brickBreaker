import { detectCollision } from "/js/collisionDetection.js";

export default class Brick {
    constructor(game, position) {
        this.game = game;

        this.position = position;
        this.width = game.gameWidth / 15;
        this.height = this.width / 5;

        this.lives = 1;
        this.markedForDestroy = false;

        if(this.lives == 1) {
            this.image = document.getElementById("image_brick");
        }
    }

    update() {
        if(detectCollision(this.game.ball, this)) {
            this.game.ball.speed.y = -this.game.ball.speed.y;
            this.lives--;
            if(this.lives == 0) this.markedForDestroy = true;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}