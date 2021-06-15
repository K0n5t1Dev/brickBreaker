import { ballCollision } from "/js/collisionDetection.js";

export default class Ball {
    constructor(game) {
        this.game = game;
        this.image = document.getElementById("image_ball");

        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.size = game.paddle.width / 9;
        this.reset();
    }

    reset() {
        this.position = {x: this.game.gameWidth / 2, y: this.game.gameHeight / 2};
        this.speed = {x: 8, y: -4};
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }

    update(deltaTime) {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        //wall on left or right
        if(this.position.x + this.size > this.game.gameWidth || this.position.x < 0) { 
            this.speed.x = -this.speed.x;
        }

        //wall on top or bottom
        if(this.position.y + this.size > this.game.gameHeight || this.position.y < 0) { 
            this.speed.y = -this.speed.y;
        }

        //bottom of game
        if(this.position.y + this.size > this.gameHeight) {
            this.game.lives--;
            this.reset();
            this.game.sleep();
        }

        //collision with paddle
        let collision = ballCollision(this.game.ball, this.game.paddle);
        switch (collision) {
            //left
            case 1:
                this.game.ball.speed.x = -this.game.ball.speed.x;
                break;

            //right
            case 2:
                this.game.ball.speed.x = -this.game.ball.speed.x;
                break;
            
            //top
            case 3:
                this.game.ball.speed.y = -this.game.ball.speed.y;
                break;

            //bottom    
            case 4:
                this.game.ball.speed.y = -this.game.ball.speed.y;
                break;
        }
    }
}