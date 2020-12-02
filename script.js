const canvas = document.getElementById('zone');
const ctx = canvas.getContext('2d');

const width = height = 20;

let x = Math.trunc(Math.random() * canvas.width/width) * width;
let y = Math.trunc(Math.random() * canvas.height/height) * height;

let depX = depY = 0;

let path = [];

let lengthPath = lengthInitPath = 5;
let jumpPath = 1;
let lengthMaxPath = 100;

let hist, range;
let countFor = 0;
let jumpFor = 10;
let timeout = 0;

let life = 5;

let appleX = Math.trunc(Math.random() * canvas.width/width) * width;
let appleY = Math.trunc(Math.random() * canvas.height/height) * height;
let appleRadius = 10;

let score = 0;

window.onload=function() {

  const intervalID = setInterval(game,100);

  document.addEventListener("keydown",keyboard);
}

function game() {

  ctx.clearRect(0,0, canvas.width, canvas.height);

  x += depX * width;
  y += depY * height;

  if(lengthPath <= lengthMaxPath) {
    if((countFor++) % 10 == 1) {
      jumpFor--;
      if(jumpFor < 0) {
        lengthPath += jumpPath;
      }
    }
  }

  path.push({x:x, y:y});

  while (path.length> lengthPath) {
    path.shift();
  }

  ctx.fillStyle="#f1c40f";

  for (var i = 0; i < path.length; i++) {
    ctx.fillRect(path[i].x, path[i].y, width-3, height-3)
  }

  if(x == appleX && y == appleY) {
    score += 10 + 2 * ((lengthPath - lengthInitPath)/jumpPath);
    if (lengthPath>lengthInitPath) {
      lengthPath -= jumpPath;
    }
    appleX = Math.trunc(Math.random() * canvas.width / width) * width;
    appleY = Math.trunc(Math.random() * canvas.height / height) * height;
  } else if(timeout++ > 100) {
    timeout = 0;

    appleX = Math.trunc(Math.random() * canvas.width / width) * width;
    appleY = Math.trunc(Math.random() * canvas.height / height) * height;

  }

  //affichage serpent
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

  if(x < 0 || x > canvas.width || y < 0 || y > canvas.width ) {
    timeout = 0;
    while (path.length > 1) {
      path.shift();
    }
    x = Math.trunc(Math.random() * canvas.width/width) * width;
    y = Math.trunc(Math.random() * canvas.height/height) * height;

    lengthPath = lengthInitPath;

    appleX = Math.trunc(Math.random() * canvas.width / width) * width;
    appleY = Math.trunc(Math.random() * canvas.height / height) * height;

    life--;

    if(life === 0) {
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

function keyboard(e) {
  switch (e.keyCode) {
    case 37:
      if(hist == 39){break;}
      depX = -1;
      depY = 0;
      hist = e.keyCode;
      break;

    case 38:
      if(hist == 40){break;}
      depX = 0;
      depY = -1;
      hist = e.keyCode;
      break;

    case 39:
      if(hist == 37){break;}
      depX = 1;
      depY = 0;
      hist = e.keyCode;
      break;

    case 40:
      if(hist == 38){break;}
      depX = 0;
      depY  = 1;
      hist = e.keyCode;
      break;

    case 32:
      depX = 0;
      depY = 0;
      break;

  }
}
