import { ballCollision } from "/js/collisionDetection.js";

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
        let collision = ballCollision(this.game.ball, this);
        switch (collision) {
            //left
            case 1:
                this.game.ball.speed.x = -this.game.ball.speed.x;
                this.lives--;
                break;

            //right
            case 2:
                this.game.ball.speed.x = -this.game.ball.speed.x;
                this.lives--;
                break;
            
            //top
            case 3:
                this.game.ball.speed.y = -this.game.ball.speed.y;
                this.lives--;
                break;

            //bottom    
            case 4:
                this.game.ball.speed.y = -this.game.ball.speed.y;
                this.lives--;
                break;
        }

        if(this.lives == 0) this.markedForDestroy = true;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}