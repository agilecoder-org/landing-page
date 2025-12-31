let picks = [];

let len = 63;

let minX;
let maxX;

class Toothpick {

    constructor(x, y, d) {
        this.newPick = true;

        this.dir = d;
        if (this.dir == 1) {
            this.ax = x - len / 2;
            this.bx = x + len / 2;
            this.ay = y;
            this.by = y;
        } else {
            this.ax = x;
            this.bx = x;
            this.ay = y - len / 2;
            this.by = y + len / 2;
        }
    }


    intersects(x, y) {
        if (this.ax == x && this.ay == y) {
            return true;
        } else if (this.bx == x && this.by == y) {
            return true;
        } else {
            return false;
        }
    }



    createA(others) {
        let available = true;
        for (let other of others) {
            if (other != this && other.intersects(this.ax, this.ay)) {
                available = false;
                break;
            }
        }
        if (available) {
            return new Toothpick(this.ax, this.ay, this.dir * -1);
        } else {
            return null;
        }
    }

    createB(others) {
        let available = true;
        for (let other of others) {
            if (other != this && other.intersects(this.bx, this.by)) {
                available = false;
                break;
            }
        }
        if (available) {
            return new Toothpick(this.bx, this.by, this.dir * -1);
        } else {
            return null;
        }
    }

    show(factor, p5) {
        p5.stroke(0);
        if (this.newPick) {
            p5.stroke(0, 0, 255);
        }
        p5.strokeWeight(1 / factor);
        p5.line(this.ax, this.ay, this.bx, this.by);
    }
}

const setup = (p5, canvasParentRef) => {
    if (p5.displayWidth < 500) {
        p5.createCanvas(350, 350).parent(canvasParentRef);
    } else {
        p5.createCanvas(500, 500).parent(canvasParentRef);
    }

    minX = -p5.width / 2;
    maxX = p5.width / 2;
    picks.push(new Toothpick(0, 0, 1));
}

const draw = (p5) => {
    p5.background(255)
    p5.translate(p5.width / 2, p5.height / 2);
    let factor = p5.float(p5.width) / (maxX - minX);
    p5.scale(factor);
    for (let t of picks) {
        t.show(factor, p5);
        minX = p5.min(t.ax, minX);
        maxX = p5.max(t.ax, maxX);
    }

    let next = [];
    for (let t of picks) {
        if (t.newPick) {
            let nextA = t.createA(picks);
            let nextB = t.createB(picks);
            if (nextA != null) {
                next.push(nextA);
            }
            if (nextB != null) {
                next.push(nextB);
            }
            t.newPick = false;
        }
    }

    picks = picks.concat(next);
    if (p5.frameCount > 100) {
        p5.noLoop();
    }
}

const sketch = {
    setup, draw
}

export default sketch
