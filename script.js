
const zone = document.getElementById('zone');
const snake = document.getElementById('snake');
let move = setInterval(moveSnake, 500);
let waistSnake = 10;
let left = 50;

function moveSnake() {
  if(left < 100) {
    left += 1;
  }
  snake.style.left = (left - waistSnake) + "%";


}
