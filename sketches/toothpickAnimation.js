class Toothpick {
  constructor(x, y, d) {
    this.newPick = true;
    this.dir = d;
    if (this.dir === 1) {
      this.ax = x - 63 / 2; // using hardcoded length 63 instead of global
      this.bx = x + 63 / 2;
      this.ay = y;
      this.by = y;
    } else {
      this.ax = x;
      this.bx = x;
      this.ay = y - 63 / 2;
      this.by = y + 63 / 2;
    }
  }

  intersects(x, y) {
    return (this.ax === x && this.ay === y) || (this.bx === x && this.by === y);
  }

  createA(others) {
    let available = true;
    for (let other of others) {
      if (other !== this && other.intersects(this.ax, this.ay)) {
        available = false;
        break;
      }
    }
    return available ? new Toothpick(this.ax, this.ay, this.dir * -1) : null;
  }

  createB(others) {
    let available = true;
    for (let other of others) {
      if (other !== this && other.intersects(this.bx, this.by)) {
        available = false;
        break;
      }
    }
    return available ? new Toothpick(this.bx, this.by, this.dir * -1) : null;
  }

  show(factor, p5) {
    p5.stroke(148, 163, 184); // Slate 400 default
    if (this.newPick) {
      p5.stroke(100, 149, 237); // Cornflower Blue for new
    }
    p5.strokeWeight(2 / factor); // Slightly thicker
    p5.line(this.ax, this.ay, this.bx, this.by);
  }
}

const setup = (p5, canvasParentRef) => {
  if (typeof window === 'undefined') return;
  if (p5.displayWidth < 500) {
    p5.createCanvas(350, 350).parent(canvasParentRef);
  } else {
    p5.createCanvas(500, 500).parent(canvasParentRef);
  }

  p5.minX = -p5.width / 2;
  p5.maxX = p5.width / 2;
  p5.picks = [new Toothpick(0, 0, 1)];
  p5.sketchHasFinished = false;
  p5.loop();
}

const draw = (p5) => {
  p5.background(3, 7, 18); // Dark BG
  p5.translate(p5.width / 2, p5.height / 2);
  let factor = p5.float(p5.width) / (p5.maxX - p5.minX);
  p5.scale(factor);

  for (let t of p5.picks) {
    t.show(factor, p5);
    p5.minX = p5.min(t.ax, p5.minX);
    p5.maxX = p5.max(t.ax, p5.maxX);
  }

  let next = [];
  for (let t of p5.picks) {
    if (t.newPick) {
      let nextA = t.createA(p5.picks);
      let nextB = t.createB(p5.picks);
      if (nextA != null) next.push(nextA);
      if (nextB != null) next.push(nextB);
      t.newPick = false;
    }
  }

  p5.picks = p5.picks.concat(next);

  // Stop after reasonable number of generations to prevent infinite zoom out/computation
  if (p5.picks.length > 2000) {
    p5.noLoop();
    p5.sketchHasFinished = true;
  }
}

const sketch = {
  setup,
  draw,
  restartSketch: () => { }
};

export default sketch;
