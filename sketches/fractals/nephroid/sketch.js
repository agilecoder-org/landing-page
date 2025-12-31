import { sliderWithLabelAndCheckbox } from "../../UI/Slider";
import { BaseSketch } from '../../Widgets/BaseSketch';

const config = {
    factor: 3,
    totalPoints: 10,
    radiusOffset: 20,
    radius: 0,
    offsetX: 0,
    offsetY: 0,
    animationSpeed: 0.5,
    totalPointsLoop: true,
};

class Nephroid extends BaseSketch {
    constructor() {
        super(config);
    }

    setup(p5) {
        const { radiusOffset } = this.config;
        const width = p5.displayWidth < 500 ? 350 : 500;
        p5.createCanvas(width, width);
        this.config.radius = p5.width / 2 - radiusOffset;

        this.addInteractions(p5); // Adding UI controls
        this.addSketchSettings(p5); // Adding color and stroke settings
    }

    resetSketch() {
        this.config.totalPoints = 10
    }

    addInteractions(p5) {
        const interactionsDiv = p5.select('#interactions');
        interactionsDiv.html('');

        sliderWithLabelAndCheckbox(p5, {
            min: 10,
            max: 350,
            value: this.config.totalPoints,
            step: 1
        }, 'Total Points', 'totalPoints', this.config, 'totalPointsLoop');
    }

    draw(p5) {
        const { factor, totalPoints, radius } = this.config;

        p5.resetMatrix();
        p5.scale(this.zoomLevel);
        p5.translate(this.config.offsetX, this.config.offsetY);
        p5.translate(p5.width / 2, p5.height / 2);

        this.drawBackground(p5);

        p5.stroke(this.sketchProperties.strokeColor[0], this.sketchProperties.strokeColor[1], this.sketchProperties.strokeColor[2]);
        p5.strokeWeight(this.sketchProperties.strokeThickness);
        p5.circle(0, 0, radius * 2);

        if (this.config.totalPointsLoop) {
            this.config.totalPoints = (this.config.totalPoints + this.config.animationSpeed) % 500; // Looping points
        }

        for (let i = 0; i < totalPoints; i++) {
            const start = this.getVector(i, totalPoints, radius, p5);
            const end = this.getVector(i * factor, totalPoints, radius, p5);

            p5.fill(this.sketchProperties.backgroundColor);
            p5.circle(start.x, start.y, 5);
            p5.line(start.x, start.y, end.x, end.y);
        }
    }

    getVector = (index, totalPoints, radius, p5) => {
        const angle = p5.map(index % totalPoints, 0, totalPoints, 0, p5.TWO_PI);
        return {
            x: p5.cos(angle + p5.PI) * radius,
            y: p5.sin(angle + p5.PI) * radius,
        };
    };
}

const nephroid = new Nephroid();

const sketch = {
    setup: (p5) => nephroid.setup(p5),
    draw: (p5) => nephroid.draw(p5),
    mousePressed: (p5) => nephroid.mousePressed(p5),
    mouseDragged: (p5) => nephroid.mouseDragged(p5),
    mouseReleased: () => nephroid.mouseReleased(),
    zoomIn: () => nephroid.zoomIn(),
    zoomOut: () => nephroid.zoomOut(),
    resetZoom: () => nephroid.resetZoom(),
    resetSketch: () => nephroid.resetSketch(),
};

export default sketch;
