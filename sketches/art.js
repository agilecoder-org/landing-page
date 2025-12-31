const setup = (p5, canvasParentRef) => {
  if (typeof window === 'undefined') return;

  if (p5.displayWidth < 500) {
    p5.createCanvas(350, 350).parent(canvasParentRef);
  } else {
    p5.createCanvas(500, 500).parent(canvasParentRef);
  }

  // Instance variables
  p5.factor = 2;
  p5.totalPoints = 150;
  p5.radius = p5.width / 2 - 20;

  p5.noFill();
  p5.strokeWeight(2);
};

function getVector(index, p5) {
  let angle = p5.map(index % p5.totalPoints, 0, p5.totalPoints, 0, p5.TWO_PI);
  let v = {
    x: p5.cos(angle + p5.PI) * p5.radius,
    y: p5.sin(angle + p5.PI) * p5.radius,
  };
  return v;
}

const draw = (p5) => {
  // Dark theme background with transparency for trail effect
  // #030712 is roughly rgb(3, 7, 18). 
  p5.background(3, 7, 18, 25);

  p5.translate(p5.width / 2, p5.height / 2);

  // Theme colors: Primary Blue, secondary slate, maybe an accent
  let colors = [
    p5.color(100, 149, 237), // Cornflower Blue
    p5.color(148, 163, 184), // Slate 400
    p5.color(56, 189, 248)   // Sky 400
  ];

  // Draw the circular outline
  p5.stroke(30, 41, 59); // Slate 800 for ring
  p5.circle(0, 0, p5.radius * 2);

  if (p5.factor < 10) p5.factor += 0.05;

  for (let i = 0; i < p5.totalPoints; i++) {
    let colIndex = i % colors.length;
    p5.stroke(colors[colIndex]);

    let v1 = getVector(i, p5);
    let v2 = getVector(i * p5.factor, p5);

    p5.line(v1.x, v1.y, v2.x, v2.y);
  }
};

const sketch = {
  setup,
  draw,
  restartSketch: () => { } // No-op, P5Wrapper handles remounting/re-setup
};

export default sketch;
