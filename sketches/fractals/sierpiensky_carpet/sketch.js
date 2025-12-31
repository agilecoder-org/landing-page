import { ColorPicker } from "../../UI/ColorPicker";
import { BaseSketch } from "../../Widgets/BaseSketch";

const config = {
    stop: false,
    len: undefined,
    squares: [],
    maxRecursion: 5, // Maximum recursion depth
    recursionDepth: 0,
    fillColor: [0, 0, 0],
    offsetX: 0,
    offsetY: 0,
    bgColor: [255, 255, 255] // Current depth of recursion
};

class Squares {
    constructor(x, y, len) {
        this.x = x;
        this.y = y;
        this.len = len;
    }

    show(p5) {
        p5.rectMode(p5.CENTER);
        p5.noStroke();
        p5.fill(config.fillColor); // Default white fill (you can change this based on properties if needed)
        p5.rect(this.x, this.y, this.len / 3, this.len / 3);
    }

    generateSquares() {
        let x = this.x;
        let y = this.y;
        let _len = this.len;

        const newSquares = [
            new Squares(x - _len / 3, y - _len / 3, _len / 3), // Top-left
            new Squares(x, y - _len / 3, _len / 3),            // Top-center
            new Squares(x + _len / 3, y - _len / 3, _len / 3), // Top-right
            new Squares(x - _len / 3, y, _len / 3),            // Center-left
            new Squares(x + _len / 3, y, _len / 3),            // Center-right
            new Squares(x - _len / 3, y + _len / 3, _len / 3), // Bottom-left
            new Squares(x, y + _len / 3, _len / 3),            // Bottom-center
            new Squares(x + _len / 3, y + _len / 3, _len / 3)  // Bottom-right
        ];

        return newSquares;
    }

    returnLen() {
        return this.len;
    }
}

class SierpienskyCarpet extends BaseSketch {
    constructor() {
        super(config);
    }

    setup(p5) {
        const width = p5.displayWidth < 500 ? 350 : 500;
        p5.createCanvas(width, width);
        this.config.len = width;

        // Start with a single square in the center
        this.config.squares[0] = new Squares(p5.width / 2, p5.height / 2, this.config.len);

        this.addInteractions(p5);
    }

    addInteractions(p5) {
        ColorPicker(p5, 'Fill Color', this.config, 'fillColor');
        ColorPicker(p5, 'BG Color', this.config, 'bgColor');
    }

    resetSketch() {
        this.config.recursionDepth = 0;
        this.config.squares = []
        this.config.stop = false
    }

    draw(p5) {
        p5.resetMatrix();
        p5.scale(this.zoomLevel);
        p5.translate(this.config.offsetX, this.config.offsetY);

        // Set background color based on the sketchProperties
        p5.background(this.config.bgColor);
        p5.fill(this.config.fillColor);

        for (let a of this.config.squares) {
            a.show(p5)
            if (a.returnLen() < 10) {
                this.config.stop = true
            } else {
                a.generateSquares()
            }
        }

        p5.frameRate(1);

        // // Generate new squares if recursion depth allows
        if (this.config.recursionDepth < this.config.maxRecursion) {
            this.generateNextRecursion();
            this.config.recursionDepth++;
        }

        // Stop the sketch when the recursion limit is reached
        if (this.config.stop || this.config.recursionDepth >= this.config.maxRecursion) {
            p5.noLoop();
        }
    }

    generateNextRecursion() {
        let newSquares = [];

        // Loop over current squares and generate new ones
        for (let square of this.config.squares) {
            if (square.returnLen() < 10) {
                this.config.stop = true; // Stop if the squares get too small
            }
            newSquares = newSquares.concat(square.generateSquares());
            newSquares = newSquares.concat(square);
        }

        // Replace the current squares with the newly generated ones
        this.config.squares = newSquares;
    }
}

const sierpienskyCarpet = new SierpienskyCarpet();

const sketch = {
    setup: (p5) => sierpienskyCarpet.setup(p5),
    draw: (p5) => sierpienskyCarpet.draw(p5),
    resetSketch: () => sierpienskyCarpet.resetSketch(),
};

export default sketch;
