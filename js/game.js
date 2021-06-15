import Ball from "/js/ball.js";
import inputHandler from "/js/input.js";
import Paddle from "/js/paddle.js";
import Brick from "/js/brick.js";
import Hearts from "/js/hearts.js";

import { buildLevel, level1, level2 } from "/js/levels.js";

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4,
    SLEEP: 5
};

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.lives = 3;

        this.gameState = GAMESTATE.MENU;
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.hearts = new Hearts(this);
        this.gameObjects = [];
        this.bricks = [];

        this.levels = [level1, level2];
        this.currentLevel = 0;

        new inputHandler(this.paddle, this);
    }

    start() {
        if(this.gameState !== GAMESTATE.MENU && this.gameState !== GAMESTATE.GAMEOVER && this.gameState !== GAMESTATE.NEWLEVEL) return;
        if(this.gameState === GAMESTATE.GAMEOVER) this.lives = 3;

        this.bricks = buildLevel(this, this.levels[this.currentLevel]);
        this.ball.reset();
        this.gameObjects = [this.ball, this.paddle, this.hearts];
        this.gameState = GAMESTATE.RUNNING;
    }

    update(deltaTime) {
        if(this.lives === 0) this.gameState = GAMESTATE.GAMEOVER;
        if(this.gameState === GAMESTATE.PAUSED || this.gameState === GAMESTATE.MENU || this.gameState === GAMESTATE.GAMEOVER || this.gameState === GAMESTATE.SLEEP) return;

        if(this.bricks.length === 0) {
            this.currentLevel++;
            this.gameState = GAMESTATE.NEWLEVEL;
            this.start();
        }

        [...this.gameObjects, ...this.bricks].forEach((object) => object.update(deltaTime));

        this.bricks = this.bricks.filter(object => !object.markedForDestroy);
    }

    draw(ctx) {
        [...this.gameObjects, ...this.bricks].forEach((object) => object.draw(ctx));

        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "right";
        ctx.fillText("Level: " + (this.currentLevel + 1), this.gameWidth - 15, 35);

        if(this.gameState === GAMESTATE.PAUSED) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0, 0, 0, .5)"
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
        }

        if(this.gameState === GAMESTATE.MENU) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0, 0, 0, .5)"
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Menu", this.gameWidth / 2, this.gameHeight / 3);
            ctx.fillText("Press space to start", this.gameWidth / 2, this.gameHeight / 1.5);
        }

        if(this.gameState === GAMESTATE.GAMEOVER) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0, 0, 0, .5)"
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Game Over", this.gameWidth / 2, this.gameHeight / 3);
            ctx.fillText("Press space to restart", this.gameWidth / 2, this.gameHeight / 1.5);
        }
    }

    pause() {
        if(this.gameState == GAMESTATE.PAUSED) this.gameState = GAMESTATE.RUNNING;
        else if(this.gameState == GAMESTATE.RUNNING) this.gameState = GAMESTATE.PAUSED;
    }

    sleep() {
        this.gameState = GAMESTATE.SLEEP;
        setTimeout(() => {  this.gameState = GAMESTATE.RUNNING; }, 500);
    }
}