import { sliderWithLabelAndCheckbox } from "../../UI/Slider";
import { BaseSketch } from '../../Widgets/BaseSketch';

const config = {
    offsetX: 0,
    offsetY: 0,
    animationSpeed: 0.001,
};

class MandelbrotSketch extends BaseSketch {
    constructor() {
        super(config);
        this.angle = 0;
        this.maxiterations = 100;
        this.colorsRed = [];
        this.colorsGreen = [];
        this.colorsBlue = [];
    }

    setup(p5) {
        p5.pixelDensity(1);

        const width = p5.displayWidth < 500 ? 350 : 500;
        p5.createCanvas(width, width);

        p5.colorMode(p5.HSB, 1);

        for (let n = 0; n < this.maxiterations; n++) {
            let hu = p5.sqrt(n / this.maxiterations);
            let col = p5.color(hu, 255, 150);
            this.colorsRed[n] = p5.red(col);
            this.colorsGreen[n] = p5.green(col);
            this.colorsBlue[n] = p5.blue(col);
        }

        this.addInteractions(p5);
    }

    addInteractions(p5) {
        const interactionsDiv = p5.select('#interactions');
        interactionsDiv.html('');

        sliderWithLabelAndCheckbox(p5, {
            min: 0.001,
            max: 0.01,
            value: this.config.animationSpeed,
            step: 0.0003
        }, 'Animation Speed', 'animationSpeed', this.config);
    }

    resetSketch() {
        this.angle = 0;
    }

    draw(p5) {
        let ca = p5.cos(this.angle * 3.213);
        let cb = p5.sin(this.angle);

        this.angle += this.config.animationSpeed;

        p5.background(255);

        let w = 5;
        let h = (w * p5.height) / p5.width;

        let xmin = -w / 2;
        let ymin = -h / 2;

        p5.loadPixels();

        let xmax = xmin + w;
        let ymax = ymin + h;

        let dx = (xmax - xmin) / p5.width;
        let dy = (ymax - ymin) / p5.height;

        let y = ymin;
        for (let j = 0; j < p5.height; j++) {
            let x = xmin;
            for (let i = 0; i < p5.width; i++) {
                let a = x;
                let b = y;
                let n = 0;

                while (n < this.maxiterations) {
                    let aa = a * a;
                    let bb = b * b;

                    if (aa + bb > 4.0) {
                        break;
                    }
                    let twoab = 2.0 * a * b;
                    a = aa - bb + ca;
                    b = twoab + cb;
                    n++;
                }

                let pix = (i + j * p5.width) * 4;
                if (n == this.maxiterations) {
                    p5.pixels[pix + 0] = 0;
                    p5.pixels[pix + 1] = 0;
                    p5.pixels[pix + 2] = 0;
                } else {
                    p5.pixels[pix + 0] = this.colorsRed[n];
                    p5.pixels[pix + 1] = this.colorsGreen[n];
                    p5.pixels[pix + 2] = this.colorsBlue[n];
                }
                x += dx;
            }
            y += dy;
        }
        p5.updatePixels();
    }
}

const mandelbrot = new MandelbrotSketch();

const sketch = {
    setup: (p5) => mandelbrot.setup(p5),
    draw: (p5) => mandelbrot.draw(p5),
    mousePressed: (p5) => mandelbrot.mousePressed(p5),
    mouseDragged: (p5) => mandelbrot.mouseDragged(p5),
    mouseReleased: () => mandelbrot.mouseReleased(),
    zoomIn: () => mandelbrot.zoomIn(),
    zoomOut: () => mandelbrot.zoomOut(),
    resetZoom: () => mandelbrot.resetZoom(),
    resetSketch: () => mandelbrot.resetSketch(),
};

export default sketch;
