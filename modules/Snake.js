import * as SnakeBit from "./SnakeBit.js";

export class Snake {

    static COLOR = "#f1c40f";
    static MAX_LENGTH = 100;
    static WIDTH = 20;
    static HEIGHT = 20;
    static INITIAL_DIR = "R";

    constructor(canvas) {
        this._growthRate = 1;
        this._speed = 1;
        this._body = [new SnakeBit.SnakeBit(Math.trunc(Math.random() * canvas.width/Snake.WIDTH) * Snake.WIDTH, Math.trunc(Math.random() * canvas.height/Snake.HEIGHT) * Snake.HEIGHT)];
        this._direction = Snake.INITIAL_DIR;
    }

    // methodes metier
    grow(appleX, appleY) {
        // cette methode est appelee quand le serpent mange une pomme

        if (this._body.length <= Snake.MAX_LENGTH) {
            for (var i = 0; i < this._growthRate; i++) {
                this._body.push(new SnakeBit.SnakeBit(appleX, appleY));
            }
        }

        // on augmente la vitesse
        // this._speed ++;

        // on augmente le taux de croissance
        this._growthRate ++;
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

        let currentTail = this.getTail();

        this._body.push(new SnakeBit.SnakeBit(currentTail.getX() + depX * Snake.WIDTH, currentTail.getY() + depY * Snake.HEIGHT));

        this._body.shift();

    }

    draw(ctx) {
        ctx.fillStyle=Snake.COLOR;

        for (var i = 0; i < this._body.length; i++) {
            ctx.fillRect(this._body[i].x, this._body[i].y, Snake.WIDTH-3, Snake.HEIGHT-3)
        }
    }

    getTail() {
        return this._body[this._body.length - 1];
    }

    getHead() {
        return this._body[0];
    }

    // setters
    set length(value) {
        this._length = value;
    }

    set growthRate(value) {
        this._growthRate = value;
    }

    set direction(value) {
        this._direction = value;
    }

    // getters
    get length() {
        return this._length;
    }

    get growthRate() {
        return this._growthRate;
    }

    get direction() {
        return this._direction;
    }
}