import { sliderWithLabelAndCheckbox } from "../UI/Slider";
import { ColorPicker } from "../UI/ColorPicker";

const sketchProperties = {
    strokeColor: [0, 0, 0],
    strokeColorLoop: false,
    backgroundColor: [255, 255, 255],
    backgroundColorLoop: false,
    strokeThickness: 1,
};

export class BaseSketch {
    constructor(config) {
        this.config = config;
        this.sketchProperties = sketchProperties;
        this.zoomLevel = 1; // Default zoom level
        this.dragging = false;
        this.dragStart = { x: 0, y: 0 };
    }

    addSketchSettings = (p5) => {
        sliderWithLabelAndCheckbox(p5, {
            min: 1,
            max: 10,
            value: this.sketchProperties.strokeThickness,
            step: 1
        }, 'Stroke Thickness', 'strokeThickness', this.sketchProperties);

        ColorPicker(p5, 'Stroke', this.sketchProperties, 'strokeColor', 'strokeColorLoop');
        ColorPicker(p5, 'Background', this.sketchProperties, 'backgroundColor', 'backgroundColorLoop');
    }

    zoomIn() {
        this.zoomLevel *= 1.1;
    }

    zoomOut() {
        this.zoomLevel /= 1.1;
    }

    resetZoom() {
        this.zoomLevel = 1;
        this.config.offsetX = 0;
        this.config.offsetY = 0;
    }

    mousePressed(p5) {
        const canvas = p5.canvas;
        const isMouseInCanvas = p5.mouseX >= 0 && p5.mouseX <= canvas.width && p5.mouseY >= 0 && p5.mouseY <= canvas.height;

        const controlsDiv = document.getElementById('controls');

        let isMouseInControls = false;
        if (controlsDiv) {
            const controlsRect = controlsDiv.getBoundingClientRect();
            const mouseX = p5.mouseX + canvas.getBoundingClientRect().left;
            const mouseY = p5.mouseY + canvas.getBoundingClientRect().top;

            if (
                mouseX >= controlsRect.left &&
                mouseX <= controlsRect.right &&
                mouseY >= controlsRect.top &&
                mouseY <= controlsRect.bottom
            ) {
                isMouseInControls = true;
            }
        }

        if (isMouseInCanvas && !isMouseInControls) {
            this.dragging = true;
            this.dragStart.x = p5.mouseX - this.config.offsetX;
            this.dragStart.y = p5.mouseY - this.config.offsetY;
        }
    }


    mouseDragged(p5) {
        if (this.dragging) {
            console.log("mouseDragged")
            this.config.offsetX = p5.mouseX - this.dragStart.x;
            this.config.offsetY = p5.mouseY - this.dragStart.y;
        }
    }

    mouseReleased() {
        this.dragging = false;
    }

    drawBackground(p5) {
        const { backgroundColor, backgroundColorLoop } = this.sketchProperties;

        if (backgroundColorLoop) {
            backgroundColor[0] = p5.random(255);
            backgroundColor[1] = p5.random(255);
            backgroundColor[2] = p5.random(255);
        }

        p5.background(backgroundColor);
        p5.fill(backgroundColor);
    }

    drawStroke(p5) {
        const { strokeColor, strokeThickness, strokeColorLoop } = this.sketchProperties;

        if (strokeColorLoop) {
            strokeColor[0] = p5.random(255);
            strokeColor[1] = p5.random(255);
            strokeColor[2] = p5.random(255);
        }

        p5.stroke(strokeColor[0], strokeColor[1], strokeColor[2]);
        p5.strokeWeight(strokeThickness);
    }

    draw(p5) {
        p5.push();

        p5.scale(this.zoomLevel);
        p5.translate(this.config.offsetX / this.zoomLevel, this.config.offsetY / this.zoomLevel); // Adjust for dragging and zoom

        this.drawBackground(p5);
        this.drawStroke(p5);

        p5.pop();
    }
}
