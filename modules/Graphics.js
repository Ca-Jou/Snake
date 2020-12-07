import Snake from "./Snake.js";
import Bug from "./Bug.js";

export default class Graphics {

    constructor() {
        this._canvas = document.getElementById('zone');
        this.ctx = this._canvas.getContext('2d');
    }

    get canvas() {
        return this._canvas;
    }

    eraseAll() {
        this.ctx.clearRect(0,0, this._canvas.width, this._canvas.height);
    }

    drawBug(bug) {
        this.ctx.fillStyle= "brown";
        this.ctx.beginPath();
        this.ctx.fillRect(bug.xBug, bug.yBug, Bug.WIDTH, Bug.HEIGHT);
        this.ctx.fillStyle="#e74c3c";
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawSnake(snake) {
        this.ctx.fillStyle = "#f1c40f";
        for (let i = 0; i < snake.body.length - 1; i++) {
            this.ctx.fillRect(snake._body[i].x, snake._body[i].y, Snake.WIDTH-3, Snake.HEIGHT-3)
        }

        this.ctx.fillStyle = "#e64369";
        this.ctx.fillRect(snake.getHead().x, snake.getHead().y, Snake.WIDTH-3, Snake.HEIGHT-3)
    }

    showScore(score) {
        this.ctx.font = '16px Arial';
        this.ctx.fillStyle = '#fff';
        this.ctx.fillText('Score : ' + score, 5, 20);
    }

    showLife(life) {
        this.ctx.fillText('Vies restantes: ' + life, this._canvas.width - 130, 20);
    }

    gameOver() {
        this.eraseAll()
        this.ctx.font = '40px Arial';
        this.ctx.fillStyle = '#fff'
        this.ctx.fillText('GAME OVER', this._canvas.width / 2 - 130, this._canvas.height /2);
    }

    dead() {
        this.eraseAll()
        this.ctx.font = '40px Arial';
        this.ctx.fillStyle = '#fff'
        this.ctx.fillText('You lost a life !', this._canvas.width / 2 - 130, this._canvas.height /2);
    }

}