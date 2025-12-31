const setup = (p5, canvasParentRef) => {
  if (typeof window === 'undefined') return;
  if (p5.displayWidth < 500) {
    p5.createCanvas(350, 350).parent(canvasParentRef);
  } else {
    p5.createCanvas(500, 500).parent(canvasParentRef);
  }

  p5.factor = 2;
  p5.totalPoints = 150;
  p5.radius = p5.width / 2 - 20;
};

const draw = (p5) => {
  p5.background(3, 7, 18); // Dark BG

  p5.translate(p5.width / 2, p5.height / 2);

  // Circle
  p5.noFill();
  p5.stroke(148, 163, 184); // Slate 400
  p5.strokeWeight(2);
  p5.circle(0, 0, p5.radius * 2);

  if (p5.factor < 10) {
    p5.factor += 0.05;
  }

  p5.strokeWeight(1);
  p5.stroke(100, 149, 237, 100); // Primary Blue with opacity

  for (let i = 0; i < p5.totalPoints; i++) {
    p5.line(
      getVector(i, p5).x,
      getVector(i, p5).y,
      getVector(i * p5.factor, p5).x,
      getVector(i * p5.factor, p5).y
    );
  }
};

const restartSketch = () => {
  // handled by setup on re-mount
};

function getVector(index, p5) {
  let angle = p5.map(index % p5.totalPoints, 0, p5.totalPoints, 0, p5.TWO_PI);

  let v = {
    x: p5.cos(angle + p5.PI) * p5.radius,
    y: p5.sin(angle + p5.PI) * p5.radius
  };

  return v;
}

const sketch = {
  setup,
  draw,
  restartSketch
};

export default sketch;
