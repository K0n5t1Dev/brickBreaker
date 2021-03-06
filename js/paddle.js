export default class Paddle {
    constructor(game) {
        this.game = game;
        this.image = document.getElementById("image_paddle");
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.width = this.gameWidth / 12;
        this.height = this.width / 6;

        this.maxSpeed = 7;
        this.speed = 0;

        this.position = {
            x: game.gameWidth / 2 - this.width / 2,
            y: game.gameHeight - this.height - 10,
        }
    }

    draw(ctx) {
        ctx.fillStyle = "#0ff";
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update(deltaTime) {
        this.position.x += this.speed;

        if(this.position.x < 0) this.position.x = 0;
        if(this.position.x > this.game.gameWidth - this.width) this.position.x = this.game.gameWidth - this.width;
    }

    moveLeft() {
        this.speed = -this.maxSpeed;
    }

    moveRight() {
        this.speed = this.maxSpeed;
    }

    stop() {
        this.speed = 0;
    }
}