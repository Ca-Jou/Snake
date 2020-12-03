import * as Snake from "./modules/Snake.js";

const canvas = document.getElementById('zone');
const ctx = canvas.getContext('2d');

let width = 0;
let height = 0;

let timeout = 0;

let life = 5;

let appleX = Math.trunc(Math.random() * canvas.width/width) * width;
let appleY = Math.trunc(Math.random() * canvas.height/height) * height;
let appleRadius = 10;

let score = 0;

window.onload=function() {

  let snake = new Snake.Snake(canvas);
  const intervalID = setInterval(game,500, snake);
  document.addEventListener("keydown", (e) => { keyboard(e, snake); });

}

function game(snake) {

  ctx.clearRect(0,0, canvas.width, canvas.height);

  snake.move();
  snake.draw(ctx);

  if(snake.getTail().getX() == appleX && snake.getTail().getY() == appleY) {
    score += 10 + 2 * ((lengthPath - lengthInitPath)/jumpPath);
    snake.grow(appleX, appleY);
    appleX = Math.trunc(Math.random() * canvas.width / width) * width;
    appleY = Math.trunc(Math.random() * canvas.height / height) * height;
  } else if(timeout++ > 100) {
    timeout = 0;

    appleX = Math.trunc(Math.random() * canvas.width / width) * width;
    appleY = Math.trunc(Math.random() * canvas.height / height) * height;

  }

  //affichage pomme
  ctx.beginPath();
  ctx.arc(appleX + appleRadius, appleY + appleRadius, appleRadius, 0, Math.PI * 2);
  ctx.fillStyle="#e74c3c";
  ctx.fill();
  ctx.closePath();

 //affichage score
  ctx.font = '16px Arial';
  ctx.fillStyle = '#fff';
  ctx.fillText('Score : ' + score, 5, 20);

  //affichage vies
  ctx.fillText('Vies restante: ' + life, canvas.width - 130, 20);

  if(snake.getHead().getX() < 0 || snake.getHead().getX() > canvas.width || snake.getHead().getY() < 0 || snake.getHead().getY() > canvas.width ) {
    timeout = 0;
    life--;

    snake = new Snake.Snake(canvas);

    appleX = Math.trunc(Math.random() * canvas.width / width) * width;
    appleY = Math.trunc(Math.random() * canvas.height / height) * height;



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
