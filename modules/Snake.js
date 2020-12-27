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
    grow(x, y) {
        if (this._body.length <= Snake.MAX_LENGTH) {
            for (var i = 0; i < this._growthRate; i++) {
                this._body.push(new SnakeBit(x, y));
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

    dead(graphics) {
        // permet de definir toutes les circonstances ou le snake doit mourir
        let dead = false;

        // s'il sort du cadre
        if (this.getHead().x < 0 || this.getHead().x > graphics.canvas.width || this.getHead().y < 0 || this.getHead().y > graphics.canvas.width) {
            console.log('dead sortie de cadre');
            dead = true;
        }

        // s'il se mord la queue
        if (this._body.length > 5) {
            for (var i = 0; i < this._body.length - 3; i++) {
                if (this.getHead().x == this.body[i].x && this.getHead().y == this.body[i].y) {
                    console.log('dead mord la queue');
                    dead = true;
                }
            }
        }

        return dead;
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
