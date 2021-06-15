export default class Hearts {
    constructor(game) {
        this.image = document.getElementById("image_heart");
        this.game = game;
        this.size = 27;
    }

    update(deltaTime) {

    }

    draw(ctx) {
        for(let i = 0; i < this.game.lives; i++) {
            ctx.align = "left";
            ctx.drawImage(this.image, 5*i + this.size*(i+1) - 20, 5, this.size, this.size);
        }
    }
}