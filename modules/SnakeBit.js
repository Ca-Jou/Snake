export class SnakeBit {

    constructor(x, y) {
        this.setX(x);
        this.setY(y);
    }

    // getters
    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    // setters
    setX(newX) {
        this.x = newX;
    }

    setY(newY) {
        this.y = newY;
    }

}