export class Bug {

    constructor(xBug, yBug) {
        this.xBugRandom = xBug;
        this.yBugRandom = yBug;
        this.widthBug = 20;
        this.heightBug = 20;
    };

    drawBug() {
        ctx.fillStyle= "brown";
        ctx.beginPath();
        ctx.fillRect(this.xBug, this.yBug, this.widthBug, this.heightBug);
        ctx.fillStyle="#e74c3c";
        ctx.fill();
        ctx.closePath();
    }

    popUpRandom() {
        this.xBug = Math.trunc(Math.random() * canvas.width/this.widthBug) * this.widthBug;
        this.yBug = Math.trunc(Math.random() * canvas.height/this.heightBug) * this.heightBug;
    }
}