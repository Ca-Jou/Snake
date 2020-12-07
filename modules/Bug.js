export default class Bug {

    static WIDTH = 20;
    static HEIGHT = 20;

    constructor(graphics) {
        this._xBug = Math.trunc(Math.random() * graphics.canvas.width/Bug.WIDTH) * Bug.WIDTH;
        this._yBug = Math.trunc(Math.random() * graphics.canvas.height/Bug.HEIGHT) * Bug.HEIGHT;
    }

    // getters

    get xBug() {
        return this._xBug;
    }

    get yBug() {
        return this._yBug;
    }

    popUpRandom(graphics) {
        this._xBug = Math.trunc(Math.random() * graphics.canvas.width/Bug.WIDTH) * Bug.WIDTH;
        this._yBug = Math.trunc(Math.random() * graphics.canvas.height/Bug.HEIGHT) * Bug.HEIGHT;
    }
}