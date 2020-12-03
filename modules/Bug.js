export class Bug {

    static WIDTH = 20;
    static HEIGHT = 20;

    constructor(canvas) {
        this._xBug = Math.trunc(Math.random() * canvas.width/Bug.WIDTH) * Bug.WIDTH;
        this._yBug = Math.trunc(Math.random() * canvas.height/Bug.HEIGHT) * Bug.HEIGHT;
    }
    //
    // constructor(canvas, x, y) {
    //     this.xBug = x;
    //     this.yBug = y;
    // }

    draw(ctx) {
        ctx.fillStyle= "brown";
        ctx.beginPath();
        ctx.fillRect(this._xBug, this._yBug, Bug.WIDTH, Bug.HEIGHT);
        ctx.fillStyle="#e74c3c";
        ctx.fill();
        ctx.closePath();
    }

    // getters

    get xBug() {
        return this._xBug;
    }

    get yBug() {
        return this._yBug;
    }

    popUpRandom(canvas) {
        this._xBug = Math.trunc(Math.random() * canvas.width/Bug.WIDTH) * Bug.WIDTH;
        this._yBug = Math.trunc(Math.random() * canvas.height/Bug.HEIGHT) * Bug.HEIGHT;
    }
}