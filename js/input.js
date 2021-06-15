import Game from "/js/game.js";
import Paddle from "/js/paddle.js";

export default class inputHandler {
    constructor(paddle, game) {
        document.addEventListener("keydown", event => {
            switch(event.keyCode) {
                case 37:
                    paddle.moveLeft();
                    break;
                
                case 39:
                    paddle.moveRight();
                    break;

                case 27:
                    game.pause();

                case 32:
                    game.start();
            }
        });

        document.addEventListener("keyup", event => {
            switch(event.keyCode) {
                case 37:
                    if(paddle.speed < 0) paddle.stop();
                    break;
                
                case 39:
                    if(paddle.speed > 0) paddle.stop();
                    break;
            }
        });
    }
}