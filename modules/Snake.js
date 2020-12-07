import SnakeBit from "./SnakeBit.js";

export default class Snake {

    static MAX_LENGTH = 100;
    static WIDTH = 20;
    static HEIGHT = 20;
    static INITIAL_DIR = "R";

    constructor(graphics) {
        this._growthRate = 1;
        this._speed = 1;
        this._body = [new SnakeBit(Math.trunc(Math.random() * graphics.canvas.width/Snake.WIDTH) * Snake.WIDTH, Math.trunc(Math.random() * graphics.canvas.height/Snake.HEIGHT) * Snake.HEIGHT)];
        this._direction = Snake.INITIAL_DIR;
    }

    // methodes metier
    grow(xBug, yBug) {
        if (this._body.length <= Snake.MAX_LENGTH) {
            for (var i = 0; i < this._growthRate; i++) {
                this._body.push(new SnakeBit(xBug, yBug));
            }
        }
    }

    move() {

        let depX = 0;
        let depY = 0;

        switch (this._direction) {
            case "R":
                depX = 1;
                break;

            case "L":
                depX = -1;
                break;

            case "U":
                depY = -1;
                break;

            case "D":
                depY = 1;
                break;
        }

        let currentHead = this.getHead();

        this._body.push(new SnakeBit(currentHead.x + depX * Snake.WIDTH, currentHead.y + depY * Snake.HEIGHT));

        this._body.shift();

    }

    getHead() {
        return this._body[this._body.length - 1];
    }

    // setters

    set growthRate(value) {
        this._growthRate = value;
    }

    set direction(value) {
        this._direction = value;
    }

    // getters

    get growthRate() {
        return this._growthRate;
    }

    get direction() {
        return this._direction;
    }

    get body() {
        return this._body;
    }
}