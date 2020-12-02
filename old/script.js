
const zone = document.getElementById('zone');
const ctx = zone.getContext('2d');

let waistSnake = 10;
let left = 300;
let speed = 5;
let x = 100;
let y = 100;
let height = 5;
const color = "green"

var pixelSnake = {
  draw: function(x, y, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, height, height);
  }
};

function snake(taille) {
  for (let i = 0; i < taille; i++) {
    pixelSnake.draw(x, y, height, color);
    x += 5;

  }
}

window.onload = snake(5);

setInterval(snake(+1), 100)
