import Graphics from "./modules/Graphics.js";
import Game from "./modules/Game.js";
import Bug from "./modules/Bug.js";
import Snake from "./modules/Snake.js";

let life = Game.INITIAL_LIFE;
let score = 0;
let timeout = 0;

window.onload=function() {

  let graphics = new Graphics();
  let snake = new Snake(graphics);
  let bug = new Bug(graphics);
  game(graphics, snake, bug);

}

async function game(graphics, snake, bug) {

  document.addEventListener("keydown", (e) => { keyboardHandler(e, snake); });
  let inGame = true;

  while(inGame) {

    graphics.eraseAll();

    snake.move();

    while (snake.body.length < 5) {
      snake.grow(snake.getHead().x, snake.getHead().y);
    }

    if (snake.getHead().x == bug.xBug && snake.getHead().y == bug.yBug) {
      score += Math.trunc(10 + 2 * snake.body.length / snake.growthRate);
      snake.grow(bug.xBug, bug.yBug);
      snake.growthRate++;
      timeout = 0;
      bug.popUpRandom(graphics);
    } else if (timeout++ > 100) {
      timeout = 0;
      bug.popUpRandom(graphics);
    }

    graphics.drawBug(bug);
    graphics.drawSnake(snake);
    graphics.showScore(score);
    graphics.showLife(life);

    console.log('script', snake.dead(graphics));
    if (snake.dead(graphics)) {
      timeout = 0;
      life--;
      if (life >= 0) {
        graphics.dead();
        inGame = false;
        await sleep(1000);
        game(graphics, new Snake(graphics), new Bug(graphics));
      }
    }

    if (life == -1) {
      graphics.gameOver();
      inGame = false;
    }

    await sleep(300);

  }
}

function keyboardHandler(e, snake) {
  let currentDir = snake.direction;
  switch (e.key) {
    case "ArrowLeft":
      if(currentDir == "R"){break;}
      snake.direction = "L";
      currentDir = "L";
      break;

    case "ArrowUp":
      if(currentDir == "D"){break;}
      snake.direction = "U";
      currentDir = "U";
      break;

    case "ArrowRight":
      if(currentDir == "L"){break;}
      snake.direction = "R";
      currentDir = "R";
      break;

    case "ArrowDown":
      if(currentDir == "U"){break;}
      snake.direction = "D";
      currentDir = "D";
      break;

    // case "Escape":
    //   depX = 0;
    //   depY = 0;
    //   break;
  }
}

function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
