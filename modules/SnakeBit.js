export default class SnakeBit {

    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    // getters
    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    // setters
    set x(value) {
        this._x = value;
    }

    set y(value) {
        this._y = value;
    }
}