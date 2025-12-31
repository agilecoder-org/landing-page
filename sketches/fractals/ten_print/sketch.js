let len = 20
let x = 0
let y = 0
let slider;

const setup = (p5, canvasParentRef) => {
    if (p5.displayWidth < 500) {
        p5.createCanvas(350, 350).parent(canvasParentRef);
    } else {
        p5.createCanvas(500, 500).parent(canvasParentRef);
    }

    const sliderContainer = document.getElementById('slider')
    slider = p5.createSlider(0, 50, 20, 0.5).parent(sliderContainer);
}

let pLen = 0
const draw = (p5) => {
    if (pLen !== len) {
        x = 0
        y = 0
        p5.clear()
    }

    pLen = len
    len = slider.value()

    if (p5.random(1) < 0.5) {
        p5.line(x, y, x + len, y + len)
    } else {
        p5.line(x, y + len, x + len, y)
    }

    x += len;

    if (x > p5.width) {
        x = 0;
        y += len;
    }
}

const sketch = {
    setup, draw
}

export default sketch
