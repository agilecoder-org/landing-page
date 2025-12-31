import { BaseSketch } from "../../Widgets/BaseSketch"

let config = {
    start: undefined,
    end: undefined,
    depth: 6,
    currDepth: 0,
    length: 0,
    width: 0,
    offsetX: 0,
    offsetY: 0,
}

class KochCurve extends BaseSketch {
    constructor() {
        super(config);
    }

    setup(p5) {
        this.config.width = p5.displayWidth < 500 ? 350 : 500;
        p5.createCanvas(this.config.width, this.config.width);
        this.config.length = this.config.width - 50;
        this.config.start = {
            x: p5.width / 2 - this.config.length / 2,
            y: p5.height / 2
        }

        this.config.end = {
            x: p5.width / 2 + this.config.length / 2,
            y: p5.height / 2
        }

        this.addSketchSettings(p5);
    }

    resetSketch() {
        this.config.currDepth = 0
    }

    draw(p5) {
        if (p5.displayWidth < 500) {
            p5.translate(0, 40)
        } else {
            p5.translate(0, 50)
        }

        p5.resetMatrix();
        p5.scale(this.zoomLevel);
        p5.translate(this.config.offsetX, this.config.offsetY);

        this.drawBackground(p5);

        p5.stroke(this.sketchProperties.strokeColor[0], this.sketchProperties.strokeColor[1], this.sketchProperties.strokeColor[2]);
        p5.strokeWeight(this.sketchProperties.strokeThickness);

        p5.frameRate(1)
        this.kochSnowflake(this.config.start, this.config.end, this.config.currDepth, p5);


        setTimeout(() => {
            if (this.config.currDepth <= this.config.depth) {
                this.config.currDepth++
            }
        }, 500)
    }

    kochSnowflake(start, end, depth, p5) {
        if (depth === 0) {
            this.drawLine(start, end, p5);
        } else {
            let a = { x: start.x, y: start.y };
            let b = { x: start.x + (end.x - start.x) / 3, y: start.y + (end.y - start.y) / 3 };
            let c = { x: start.x + 2 * (end.x - start.x) / 3, y: start.y + 2 * (end.y - start.y) / 3 };
            let d = { x: end.x, y: end.y };

            let v = this.rotateVector(this.subtractVector(c, b), -p5.PI / 3, p5);
            let e = this.addVector(b, v);

            this.kochSnowflake(a, b, depth - 1, p5);
            this.kochSnowflake(b, e, depth - 1, p5);
            this.kochSnowflake(e, c, depth - 1, p5);
            this.kochSnowflake(c, d, depth - 1, p5);
        }
    }

    drawLine(start, end, p5) {
        p5.line(start.x, start.y, end.x, end.y);
    }

    subtractVector(v1, v2) {
        return { x: v1.x - v2.x, y: v1.y - v2.y };
    }

    addVector(v1, v2) {
        return { x: v1.x + v2.x, y: v1.y + v2.y };
    }

    rotateVector(v, angle, p5) {
        let x = v.x * p5.cos(angle) - v.y * p5.sin(angle);
        let y = v.x * p5.sin(angle) + v.y * p5.cos(angle);
        return { x, y };
    }
}

const kochCurve = new KochCurve();

const sketch = {
    setup: (p5) => kochCurve.setup(p5),
    draw: (p5) => kochCurve.draw(p5),
    mousePressed: (p5) => kochCurve.mousePressed(p5),
    mouseDragged: (p5) => kochCurve.mouseDragged(p5),
    mouseReleased: () => kochCurve.mouseReleased(),
    zoomIn: () => kochCurve.zoomIn(),
    zoomOut: () => kochCurve.zoomOut(),
    resetZoom: () => kochCurve.resetZoom(),
    resetSketch: () => kochCurve.resetSketch(),
}

export default sketch
