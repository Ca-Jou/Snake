
const zone = document.getElementById('zone');
const ctx = zone.getContext('2d');

let move = setInterval(moveSnake, 100);
let waistSnake = 10;
let left = 300;
let speed = 5;


var ball = {
  x: 100,
  y: 100,
  radius: 25,
  color: 'blue',
  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
};

ball.draw()

function moveSnake() {
  if(left < 600) {
    left += speed;
  } else {
    left = 0;
  }
  snake.style.left = (left - waistSnake) + "px";


}
