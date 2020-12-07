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

  const intervalID = setInterval(game,300, graphics, snake, bug);
  document.addEventListener("keydown", (e) => { keyboardHandler(e, snake); });

}

function game(graphics, snake, bug) {

  graphics.eraseAll();

  snake.move();

  while (snake.body.length < 5) {
    snake.grow(snake.getHead().x, snake.getHead().y);
  }

  if (snake.getHead().x == bug.xBug && snake.getHead().y == bug.yBug) {
    score += 10 + 2 * (Math.trunc(snake.body.length) / snake.growthRate);
    snake.grow(bug.xBug, bug.yBug);
    snake.growthRate ++;
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

  if(snake.getHead().x < 0 || snake.getHead().x > graphics.canvas.width || snake.getHead().y < 0 || snake.getHead().y > graphics.canvas.width ) {
    timeout = 0;
    life--;

    snake = new Snake(graphics);

    // le bloc de code suivant ne marche pas
    if(life == 0) {
      graphics.gameOver();
      clearTimeout(intervalID);
    }
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
