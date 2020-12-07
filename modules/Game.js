import Snake from "./Snake.js";
import Bug from "./Bug.js";

export default class Game {

    static INITIAL_LIFE = 5;

    static graphics = null;
    static snake = null;
    static bug = null;
    static life = Game.INITIAL_LIFE;
    static score = 0;
    static timeout = 0;

    constructor(graphics) {
        Game.graphics = graphics;
        Game.snake = new Snake(graphics);
        Game.bug = new Bug(graphics);
        Game.life = Game.INITIAL_LIFE;
        Game.score = 0;
        Game.timeout = 0;
    }

    play() {
        document.addEventListener("keydown", this.keyboardHandler);
        let inGame = true;
        console.log('play', Game.snake);

        while (inGame) {
            Game.graphics.eraseAll();

            Game.snake.move();
            console.log('play', Game.snake.direction);

            while (Game.snake.body.length < 5) {
                Game.snake.grow(Game.snake.getHead().x, Game.snake.getHead().y);
            }

            if (Game.snake.getHead().x == Game.bug.xBug && Game.snake.getHead().y == Game.bug.yBug) {
                Game.score += 10 + 2 * (Math.trunc(Game.snake.body.length) / Game.snake.growthRate);
                Game.snake.grow(Game.bug.xBug, Game.bug.yBug);
                Game.snake.growthRate++;
                Game.timeout = 0;
                Game.bug.popUpRandom(Game.graphics);
            } else if (Game.timeout++ > 100) {
                Game.timeout = 0;
                Game.bug.popUpRandom(Game.graphics);
            }

            Game.graphics.drawBug(Game.bug);
            Game.graphics.drawSnake(Game.snake);
            Game.graphics.showScore(Game.score);
            Game.graphics.showLife(Game.life);

            if (Game.snake.getHead().x < 0 || Game.snake.getHead().x > Game.graphics.canvas.width || Game.snake.getHead().y < 0 || Game.snake.getHead().y > Game.graphics.canvas.width) {
                Game.timeout = 0;
                Game.life--;
                // inGame = false;

                if (Game.life == 0) {
                    Game.graphics.gameOver();
                    // inGame = false
                }
            }
        }
    }

    keyboardHandler(e) {
        // console.log('keyboardHandler', e.key);
        switch (e.key) {
            case "ArrowLeft":
                if(Game.snake.direction == "R"){break;}
                Game.snake.direction = "L";
                break;

            case "ArrowUp":
                if(Game.snake.direction == "D"){break;}
                Game.snake.direction = "U";
                break;

            case "ArrowRight":
                if(Game.snake.direction == "L"){break;}
                Game.snake.direction = "R";
                break;

            case "ArrowDown":
                if(Game.snake.direction == "U"){break;}
                Game.snake.direction = "D";
                break;

            // case "Escape":
            //   depX = 0;
            //   depY = 0;
            //   break;
        }
        // console.log('keyboardHandler', Game.snake.direction);
    }
}