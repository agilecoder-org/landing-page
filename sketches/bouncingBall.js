"use client"
let ball;
let gravity = 0.2;
let damping = 1;

class Ball {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocityY = 0; // Initial vertical velocity
  }

  update(p5) {
    this.velocityY += gravity; // Apply gravity
    this.y += this.velocityY;   // Update position

    // Check for collision with the ground
    if (this.y + this.radius >= p5.height) {
      this.y = p5.height - this.radius; // Reset position to ground level
      this.velocityY *= -damping; // Reverse velocity and apply damping
    }
  }

  show(p5) {
    p5.fill(127);
    p5.ellipse(this.x, this.y, this.radius * 2, this.radius * 2); // Draw the ball
  }
}

const setup = (p5, canvasParentRef) => {
  if (typeof window === 'undefined') return;
  if (p5.displayWidth < 500) {
    p5.createCanvas(350, 350).parent(canvasParentRef);
  } else {
    p5.createCanvas(500, 500).parent(canvasParentRef);
  }
  ball = new Ball(p5.width / 2, 50, 20); // Create a ball
}

const draw = (p5) => {
  p5.background(255); // Clear the canvas
  ball.update(p5); // Update ball position
  ball.show(p5); // Draw the ball

  // Draw the ground line
  p5.stroke(0);
  p5.strokeWeight(2);
  p5.line(0, p5.height - 1, p5.width, p5.height - 1); // Ground line
}

const sketch = {
  setup, draw
}

export default sketch;
