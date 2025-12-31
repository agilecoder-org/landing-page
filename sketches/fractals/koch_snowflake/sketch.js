import { BaseSketch } from "../../Widgets/BaseSketch"

const config = {
    offsetX: 0,
    offsetY: 0,
    length: 0,
    width: 0,
    segments: [],
    currDepth: 0,
    depth: 6,
}

class KochSnowFlake extends BaseSketch {
    constructor() {
        super(config);
    }

    setup = (p5) => {
        this.config.width = p5.displayWidth < 500 ? 350 : 500;
        p5.createCanvas(this.config.width, this.config.width);
        this.config.length = this.config.width - 200;

        this.config.segments[0] = {
            start: {
                x: p5.width / 2 - this.config.length / 2,
                y: p5.height / 2 - p5.sqrt(3) * this.config.length / 4
            },
            end: {
                x: p5.width / 2 + this.config.length / 2,
                y: p5.height / 2 - p5.sqrt(3) * this.config.length / 4
            }
        }

        this.config.segments[1] = {
            start: {
                x: p5.width / 2 - this.config.length / 2,
                y: p5.height / 2 - p5.sqrt(3) * this.config.length / 4
            },
            end: {
                x: p5.width / 2,
                y: p5.height / 2 + p5.sqrt(3) * this.config.length / 4
            }
        }

        this.config.segments[2] = {
            start: {
                x: p5.width / 2,
                y: p5.height / 2 + p5.sqrt(3) * this.config.length / 4
            },
            end: {
                x: p5.width / 2 + this.config.length / 2,
                y: p5.height / 2 - p5.sqrt(3) * this.config.length / 4
            }
        }

        this.addSketchSettings(p5);
    }

    draw = (p5) => {
        p5.resetMatrix();
        p5.scale(this.zoomLevel);
        p5.translate(this.config.offsetX, this.config.offsetY);
        p5.translate(0, 0);

        this.drawBackground(p5);

        p5.stroke(this.sketchProperties.strokeColor[0], this.sketchProperties.strokeColor[1], this.sketchProperties.strokeColor[2]);
        p5.strokeWeight(this.sketchProperties.strokeThickness);

        p5.frameRate(1)
        this.kochSnowflake(this.config.segments[0].start, this.config.segments[0].end, this.config.currDepth, p5);
        this.kochSnowflake(this.config.segments[1].end, this.config.segments[1].start, this.config.currDepth, p5);
        this.kochSnowflake(this.config.segments[2].end, this.config.segments[2].start, this.config.currDepth, p5);


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

const kochSnowflake = new KochSnowFlake();

const sketch = {
    setup: (p5) => kochSnowflake.setup(p5),
    draw: (p5) => kochSnowflake.draw(p5),
    mousePressed: (p5) => kochSnowflake.mousePressed(p5),
    mouseDragged: (p5) => kochSnowflake.mouseDragged(p5),
    mouseReleased: () => kochSnowflake.mouseReleased(),
    zoomIn: () => kochSnowflake.zoomIn(),
    zoomOut: () => kochSnowflake.zoomOut(),
    resetZoom: () => kochSnowflake.resetZoom(),
    resetSketch: () => kochSnowflake.resetSketch(),
}

export default sketch
