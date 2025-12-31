const setup = (p, canvasParentRef) => {
  if (typeof window === 'undefined') return;
  const canvas = p.createCanvas(p.windowWidth, 100);
  canvas.parent(canvasParentRef);

  p.carY = p.height - 50;
  p.carX = 0;
};

const draw = (p) => {
  p.clear();

  // Calculate the car's horizontal position based on the scroll position
  if (typeof window !== "undefined") {
    const scrollPosition = p.map(window.scrollY, 0, p.windowHeight, 0, p.width);
    p.carX = scrollPosition;
  }

  // Draw the ground road
  p.fill(30, 41, 59); // Slate 800
  p.rect(0, p.carY, p.width, 50);

  // Dashed lane marker
  p.stroke(255);
  p.strokeWeight(2);
  for (let i = 0; i < p.width; i += 40) {
    p.line(i, p.carY + 25, i + 20, p.carY + 25);
  }
  p.noStroke();

  // Draw the car
  drawCar(p, p.carX, p.carY - 10);
};

const drawCar = (p, x, y) => {
  // Draw the car body
  p.fill(100, 149, 237); // Primary Blue
  p.rect(x, y - 20, 100, 20, 5); // Car body

  p.fill(148, 163, 184); // Slate 400
  p.rect(x + 20, y - 40, 60, 20, 5, 5, 0, 0); // Car roof

  // Draw the car wheels
  p.fill(2, 6, 23); // Slate 950 (Black-ish)
  p.ellipse(x + 20, y, 20, 20); // Left wheel
  p.ellipse(x + 80, y, 20, 20); // Right wheel

  // Wheel hubcaps
  p.fill(226, 232, 240); // Slate 200
  p.ellipse(x + 20, y, 8, 8);
  p.ellipse(x + 80, y, 8, 8);
};

const sketch = {
  setup, draw
}
export default sketch;