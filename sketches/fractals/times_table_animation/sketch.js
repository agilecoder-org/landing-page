import { sliderWithLabelAndCheckbox } from "../../UI/Slider";
import { BaseSketch } from '../../Widgets/BaseSketch';

const config = {
    factor: 2,
    totalPoints: 400,
    radiusOffset: 20,
    radius: 0,
    offsetX: 0,
    offsetY: 0,
    animationSpeed: 0.03,
    totalPointsLoop: false,
};

class TimesTableAnimation extends BaseSketch {
    constructor() {
        super(config);
    }

    setup(p5) {
        const { radiusOffset } = this.config;
        const width = p5.displayWidth < 500 ? 350 : 500;
        p5.createCanvas(width, width);
        this.config.radius = p5.width / 2 - radiusOffset;

        this.addInteractions(p5);
        this.addSketchSettings(p5, this.sketchProperties);
    }

    resetSketch() {
        this.config.factor = 2;
        this.config.totalPoints = 400;
    }

    getVector(index, totalPoints, radius, p5) {
        const angle = p5.map(index % totalPoints, 0, totalPoints, 0, p5.TWO_PI);
        return {
            x: p5.cos(angle + p5.PI) * radius,
            y: p5.sin(angle + p5.PI) * radius,
        };
    }

    addInteractions(p5) {
        const interactionsDiv = p5.select('#interactions');
        interactionsDiv.html('');

        sliderWithLabelAndCheckbox(p5, {
            min: 10,
            max: 350,
            value: this.config.totalPoints,
            step: 1
        }, 'Total Points', 'totalPoints', this.config);

        sliderWithLabelAndCheckbox(p5, {
            min: 1,
            max: 350,
            value: this.config.factor,
            step: 1
        }, 'Factors', 'factor', this.config);
    }

    draw(p5) {
        const { factor, totalPoints, radius } = this.config;

        p5.resetMatrix();
        p5.scale(this.zoomLevel);
        p5.translate(this.config.offsetX, this.config.offsetY);
        p5.translate(p5.width / 2, p5.height / 2);

        this.drawBackground(p5); // Handle background

        p5.stroke(this.sketchProperties.strokeColor[0], this.sketchProperties.strokeColor[1], this.sketchProperties.strokeColor[2]);
        p5.strokeWeight(this.sketchProperties.strokeThickness);

        p5.circle(0, 0, radius * 2); // Outer circle

        // Update the factor if animation is enabled
        if (factor < 10) {
            this.config.factor += this.config.animationSpeed;
        }

        if (this.config.totalPointsLoop) {
            this.config.totalPoints = (this.config.totalPoints + this.config.animationSpeed) % 400;
        }

        // Draw circles and lines based on totalPoints
        for (let i = 0; i < totalPoints; i++) {
            const start = this.getVector(i, totalPoints, radius, p5);
            const end = this.getVector(i * factor, totalPoints, radius, p5);

            p5.circle(start.x, start.y, 5); // Draw a small circle at each point
            p5.line(start.x, start.y, end.x, end.y); // Draw lines connecting points
        }
    }
}

const timesTableAnimation = new TimesTableAnimation();

const sketch = {
    setup: (p5) => timesTableAnimation.setup(p5),
    draw: (p5) => timesTableAnimation.draw(p5),
    mousePressed: (p5) => timesTableAnimation.mousePressed(p5),
    mouseDragged: (p5) => timesTableAnimation.mouseDragged(p5),
    mouseReleased: () => timesTableAnimation.mouseReleased(),
    zoomIn: () => timesTableAnimation.zoomIn(),
    zoomOut: () => timesTableAnimation.zoomOut(),
    resetZoom: () => timesTableAnimation.resetZoom(),
    resetSketch: () => timesTableAnimation.resetSketch(),
};

export default sketch;
