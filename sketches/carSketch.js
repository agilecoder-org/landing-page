"use client"
let carX = 0; // Initial horizontal position of the car
let carY; // Vertical position of the car (constant)

const setup = (p, canvasParentRef) => {
  if (typeof window === 'undefined') return;
  const canvas = p.createCanvas(p.windowWidth, 100);
  canvas.parent(canvasParentRef);
  carY = p.height - 50; // Set the car Y position at the bottom of the canvas
};

const draw = (p) => {
  p.clear(); // Clear the canvas to prevent drawing over previous frames

  // Calculate the car's horizontal position based on the scroll position
  if (typeof window !== "undefined") {
    // Calculate the car's horizontal position based on the scroll position
    const scrollPosition = p.map(window.scrollY, 0, p.windowHeight, 0, p.width);
    carX = scrollPosition; // Set carX position relative to scroll
  }

  // Draw the ground
  p.fill(150); // Gray shade for the ground
  p.rect(0, carY, p.width, 50); // Ground rectangle

  // Draw the car
  drawCar(p, carX, carY - 10); // Adjust car Y position to be above the ground
};

const drawCar = (p, x, y) => {
  // Draw the car body
  p.fill(100); // Darker gray shade for the car body
  p.rect(x, y - 20, 100, 20); // Car body
  p.rect(x + 20, y - 40, 60, 20); // Car roof

  // Draw the car wheels
  p.fill(50); // Even darker gray for the wheels
  p.ellipse(x + 20, y, 20, 20); // Left wheel
  p.ellipse(x + 80, y, 20, 20); // Right wheel
};

// Resize the canvas when the window is resized
// const windowResized = (p) => {
//   p.resizeCanvas(p.windowWidth, 100);
// };

const sketch = {
  setup, draw
}
export default sketch;