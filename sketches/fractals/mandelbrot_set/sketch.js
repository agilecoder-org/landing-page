import { sliderWithLabelAndCheckbox } from "../../UI/Slider";
import { BaseSketch } from "../../Widgets/BaseSketch";
import { ColorPicker } from "../../UI/ColorPicker";

let minval = -2.0;
let maxval = 1.5;

const config = {
    minval: -2.0,
    maxval: 1.5,
    offsetX: 0,
    offsetY: 0,
    width: 0,
    maxiterations: 38,
    color: [255, 255, 255],
    backgroundColor: [255, 255, 255]
};

class MandelbrotSet extends BaseSketch {
    constructor() {
        super(config);
    }

    setup = (p5) => {
        this.config.width = p5.displayWidth < 500 ? 350 : 500;
        p5.createCanvas(this.config.width, this.config.width);
        p5.pixelDensity(1);
        this.addInteractions(p5);
    }

    addInteractions(p5) {
        const interactionsDiv = p5.select('#interactions');
        interactionsDiv.html('');
        sliderWithLabelAndCheckbox(p5, {
            min: 0,
            max: 300,
            value: this.config.maxiterations,
            step: 1,
        }, 'Iterations', 'maxiterations', this.config);
        ColorPicker(p5, 'FG Color', this.config, 'color');
        ColorPicker(p5, 'BG Color', this.config, 'backgroundColor');
    }

    resetSketch() {
        this.config.minval = -2.0;
        this.config.maxval = 1.5;
    }

    draw = (p5) => {
        const [bgRed, bgGreen, bgBlue] = this.config.backgroundColor;
        p5.background(bgRed, bgGreen, bgBlue);

        p5.loadPixels();
        for (let x = 0; x < p5.width; x++) {
            for (let y = 0; y < p5.height; y++) {
                let a = p5.map(x, 0, p5.width, minval, maxval);
                let b = p5.map(y, 0, p5.height, minval, maxval);
                let ca = a;
                let cb = b;
                let n = 0;
                while (n < this.config.maxiterations) {
                    let aa = a * a - b * b;
                    let bb = 2 * a * b;
                    a = aa + ca;
                    b = bb + cb;
                    if (a * a + b * b > 16) {
                        break;
                    }
                    n++;
                }
                let bright = n === this.config.maxiterations ? 0 : p5.map(n, 0, this.config.maxiterations, 0, 255);
                const [red, green, blue] = this.config.color;
                let pix = (x + y * p5.width) * 4;
                p5.pixels[pix + 0] = (n === this.config.maxiterations) ? bgRed : red * (bright / 255);
                p5.pixels[pix + 1] = (n === this.config.maxiterations) ? bgGreen : green * (bright / 255);
                p5.pixels[pix + 2] = (n === this.config.maxiterations) ? bgBlue : blue * (bright / 255);
                p5.pixels[pix + 3] = 255;
            }
        }
        p5.updatePixels();

        p5.resetMatrix();
        p5.scale(this.zoomLevel);
        p5.translate(this.config.offsetX, this.config.offsetY);
    }

    zoomIn() {
        this.zoomLevel *= 1.1;
        this.adjustCanvasSize();
    }

    zoomOut() {
        this.zoomLevel /= 1.1;
        this.adjustCanvasSize();
    }

    resetZoom() {
        this.zoomLevel = 1;
        this.config.offsetX = 0;
        this.config.offsetY = 0;
        this.adjustCanvasSize();
    }

    adjustCanvasSize(p5) {
        const newWidth = this.config.width * this.zoomLevel;
        const newHeight = this.config.width * this.zoomLevel; // Keeping it square
        this.config.width = newWidth;
        p5.resizeCanvas(newWidth, newHeight);
    }
}

const mandelbrotSet = new MandelbrotSet();

const sketch = {
    setup: (p5) => mandelbrotSet.setup(p5),
    draw: (p5) => mandelbrotSet.draw(p5),
    mousePressed: (p5) => mandelbrotSet.mousePressed(p5),
    mouseDragged: (p5) => mandelbrotSet.mouseDragged(p5),
    mouseReleased: () => mandelbrotSet.mouseReleased(),
    zoomIn: null,
    zoomOut: null,
    resetZoom: null,
    resetSketch: null,
}

export default sketch;
