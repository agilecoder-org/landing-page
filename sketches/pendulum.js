"use client"
let angle = Math.PI / 4;
let angleVelocity = 0.0;
let angleAcceleration = 0.0;
const damping = 0.999;
let pendulumLength = 600;
const gravity = 0.4;

const setup = (p, canvasParentRef) => {
  if (typeof window === 'undefined') return;
  const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
  pendulumLength = 400;
  canvas.parent(canvasParentRef);
  p.clear();
};

const draw = (p) => {
  p.clear();

  const originX = p.width / 2;
  const originY = 0;

  angleAcceleration = (-1 * gravity / pendulumLength) * Math.sin(angle);

  angleVelocity += angleAcceleration;
  angleVelocity *= damping;
  angle += angleVelocity;

  const pendulumX = originX + pendulumLength * Math.sin(angle);
  const pendulumY = originY + pendulumLength * Math.cos(angle);

  p.stroke(0);
  p.strokeWeight(2);
  p.fill(127);
  p.line(originX, originY, pendulumX, pendulumY);
  p.ellipse(pendulumX, pendulumY, 48, 48);
};

const sketch = {
  setup,
  draw
}

export default sketch;