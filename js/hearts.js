export default class Hearts {
    constructor(game) {
        this.image = document.getElementById("image_heart");
        this.game = game;
        this.size = game.gameWidth / 70;
    }

    update(deltaTime) {

    }

    draw(ctx) {
        for(let i = 0; i < this.game.lives; i++) {
            ctx.align = "left";
            ctx.drawImage(this.image, 5 * i + this.size * (i + 1) - this.size + 5, 5, this.size, this.size);
        }
    }
}