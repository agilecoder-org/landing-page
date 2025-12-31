const setup = (p, canvasParentRef) => {
  if (typeof window === 'undefined') return;
  const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
  canvas.parent(canvasParentRef);

  // Instance configuration
  p.pendulumLength = 400;
  p.angle = Math.PI / 4;
  p.angleVelocity = 0.0;
  p.angleAcceleration = 0.0;
  p.damping = 0.995;
  p.gravity = 0.4;

  p.clear();
};

const draw = (p) => {
  p.clear();

  const originX = p.width / 2;
  const originY = 0;

  p.angleAcceleration = (-1 * p.gravity / p.pendulumLength) * Math.sin(p.angle);

  p.angleVelocity += p.angleAcceleration;
  p.angleVelocity *= p.damping;
  p.angle += p.angleVelocity;

  const pendulumX = originX + p.pendulumLength * Math.sin(p.angle);
  const pendulumY = originY + p.pendulumLength * Math.cos(p.angle);

  // String
  p.stroke(148, 163, 184); // Slate 400
  p.strokeWeight(2);
  p.line(originX, originY, pendulumX, pendulumY);

  // Bob
  p.noStroke();
  p.fill(100, 149, 237); // Cornflower Blue
  p.ellipse(pendulumX, pendulumY, 48, 48);

  // Highlight
  p.fill(255, 255, 255, 50);
  p.ellipse(pendulumX - 10, pendulumY - 10, 15, 15);
};

const sketch = {
  setup,
  draw
}

export default sketch;