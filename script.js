import * as Snake from "./modules/Snake.js";
import * as Bug from "./modules/Bug.js";

const canvas = document.getElementById('zone');
const ctx = canvas.getContext('2d');

let timeout = 0;
let life = 5;
let score = 0;

window.onload=function() {

  let snake = new Snake.Snake(canvas);
  let bug = new Bug.Bug(canvas);
  const intervalID = setInterval(game,300, snake, bug);
  document.addEventListener("keydown", (e) => { keyboard(e, snake); });

}

function game(snake, bug) {

  ctx.clearRect(0,0, canvas.width, canvas.height);

  snake.move();

  if (snake.getHead().x == bug.xBug && snake.getHead().y == bug.yBug) {
    score += 10 + 2 * ((snake.length)/snake.growthRate);
    snake.grow(bug.xBug, bug.yBug);
    timeout = 0;
    bug.popUpRandom(canvas);
  } else if (timeout++ > 100) {
    timeout = 0;
    bug.popUpRandom(canvas);
  }

  bug.draw(ctx);
  snake.draw(ctx);

 //affichage score
  ctx.font = '16px Arial';
  ctx.fillStyle = '#fff';
  ctx.fillText('Score : ' + score, 5, 20);

  //affichage vies
  ctx.fillText('Vies restantes: ' + life, canvas.width - 130, 20);

  if(snake.getHead().x < 0 || snake.getHead().x > canvas.width || snake.getHead().y < 0 || snake.getHead().y > canvas.width ) {
    timeout = 0;
    life--;

    snake = new Snake.Snake(canvas);

    // le bloc de code suivant ne marche pas
    if(life == 0) {
      ctx.font = '40px Arial';
      ctx.fillStyle = '#fff'
      ctx.fillText('GAME OVER', canvas.width / 2 - 130, canvas.heigth /2);
      document.getElementById('game-over').play();
      clearTimeout(intervalID);
    } else {
      document.getElementById('life').play();
    }

  }
}

function keyboard(e, snake) {
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
