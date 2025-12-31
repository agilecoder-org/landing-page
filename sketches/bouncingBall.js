class Ball {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocityY = 0;
  }

  update(p5) {
    this.velocityY += p5.gravity;
    this.y += this.velocityY;

    if (this.y + this.radius >= p5.height) {
      this.y = p5.height - this.radius;
      this.velocityY *= -p5.damping;
    }
  }

  show(p5) {
    p5.fill(100, 149, 237); // Primary Blue
    p5.noStroke();
    p5.ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }
}

const setup = (p5, canvasParentRef) => {
  if (typeof window === 'undefined') return;
  if (p5.displayWidth < 500) {
    p5.createCanvas(350, 350).parent(canvasParentRef);
  } else {
    p5.createCanvas(500, 500).parent(canvasParentRef);
  }

  // Instance variables
  p5.gravity = 0.2;
  p5.damping = 0.8; // Reduce damping so it doesn't bounce forever
  p5.ball = new Ball(p5.width / 2, 50, 20);
}

const draw = (p5) => {
  p5.background(3, 7, 18); // Dark BG
  p5.ball.update(p5);
  p5.ball.show(p5);

  // Draw the ground line
  p5.stroke(148, 163, 184); // Slate 400
  p5.strokeWeight(2);
  p5.line(0, p5.height - 1, p5.width, p5.height - 1);
}

const sketch = {
  setup, draw
}

export default sketch;
