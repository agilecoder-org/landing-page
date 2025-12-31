import { sliderWithLabelAndCheckbox } from "../../UI/Slider";
import { BaseSketch } from "../../Widgets/BaseSketch";

const config = {
    angle: 0.8,
    offsetX: 0,
    offsetY: 0
};

class FractalTree extends BaseSketch {
    constructor() {
        super(config);
    }

    setup(p5) {
        const width = p5.displayWidth < 500 ? 350 : 500;
        p5.createCanvas(width, width);

        this.addInteractions(p5);
        this.addSketchSettings(p5);
    }

    addInteractions(p5) {
        const interactionsDiv = p5.select('#interactions');
        interactionsDiv.html('');

        sliderWithLabelAndCheckbox(p5, {
            min: 0,
            max: 3.14,
            value: this.config.angle,
            step: 0.01
        }, 'Angle { in PI }', 'angle', this.config);
    }

    draw(p5) {
        p5.background(0);
        this.config.angle = this.config.angle; // Access angle from config

        p5.resetMatrix();
        p5.scale(this.zoomLevel);
        p5.translate(this.config.offsetX, this.config.offsetY);

        this.drawBackground(p5);

        p5.stroke(this.sketchProperties.strokeColor[0], this.sketchProperties.strokeColor[1], this.sketchProperties.strokeColor[2]);
        p5.strokeWeight(this.sketchProperties.strokeThickness);

        p5.strokeWeight(this.sketchProperties.strokeThickness);

        p5.translate(p5.width * 0.5, p5.height);
        this.branch(120, this.sketchProperties.strokeThickness, p5);
    }

    branch(len, thick, p5) {
        p5.strokeWeight(thick);
        p5.line(0, 0, 0, -len);
        p5.translate(0, -len);
        if (len > 1) {
            p5.push();
            p5.rotate(this.config.angle);
            this.branch(len * 0.67, thick * 0.8, p5);
            p5.pop();

            p5.push();
            p5.rotate(-this.config.angle);
            this.branch(len * 0.67, thick * 0.8, p5);
            p5.pop();
        }
    }

    resetSketch() {
        this.config.angle = 0.8;
        this.sketchProperties.strokeThickness = 1;
    }
}

const fractalTree = new FractalTree();

const sketch = {
    setup: (p5) => fractalTree.setup(p5),
    draw: (p5) => fractalTree.draw(p5),
    mousePressed: (p5) => fractalTree.mousePressed(p5),
    mouseDragged: (p5) => fractalTree.mouseDragged(p5),
    mouseReleased: () => fractalTree.mouseReleased(),
    zoomIn: () => fractalTree.zoomIn(),
    zoomOut: () => fractalTree.zoomOut(),
    resetZoom: () => fractalTree.resetZoom(),
    resetSketch: () => fractalTree.resetSketch(),
};

export default sketch;
