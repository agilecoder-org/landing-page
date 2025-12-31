"use client"
let factor = 2;
let totalPoints = 150;
let radius;

const setup = (p5, canvasParentRef) => {
  if (typeof window === 'undefined') return;

  if (p5.displayWidth < 500) {
    p5.createCanvas(350, 350).parent(canvasParentRef);
  } else {
    p5.createCanvas(500, 500).parent(canvasParentRef);
  }
  radius = p5.width / 2 - 20;
  p5.noFill();
  p5.strokeWeight(2);
};

function getVector(index, p5) {
  let angle = p5.map(index % totalPoints, 0, totalPoints, 0, p5.TWO_PI);
  let v = {
    x: p5.cos(angle + p5.PI) * radius,
    y: p5.sin(angle + p5.PI) * radius,
  };
  return v;
}

const draw = (p5) => {
  p5.background(255, 25); // Light fade effect to create trailing motion

  p5.translate(p5.width / 2, p5.height / 2);
  let colors = [p5.color(255, 0, 100), p5.color(0, 150, 255), p5.color(255, 255, 0)];
  
  // Draw the circular outline
  p5.circle(0, 0, radius * 2);

  if (factor < 10) factor += 0.05; // Increasing the factor gradually for dynamic changes

  for (let i = 0; i < totalPoints; i++) {
    let colIndex = i % colors.length; // Change color based on index
    p5.stroke(colors[colIndex]);

    let v1 = getVector(i, p5);
    let v2 = getVector(i * factor, p5);

    p5.line(v1.x, v1.y, v2.x, v2.y); // Draw lines connecting points on the circle
  }
};

// Restart function to reset variables
const restartSketch = () => {
  factor = 2; // Reset factor to initial value
};

const sketch = {
  setup,
  draw,
  restartSketch, // Export the restart function
};

export default sketch;
