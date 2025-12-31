const setup = (p5, canvasParentRef) => {
    if (typeof window === "undefined") return;
    const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    canvas.parent(canvasParentRef);

    p5.particles = [];
    const particleCount = Math.min(Math.floor(p5.width * 0.1), 200); // Responsive count

    for (let i = 0; i < particleCount; i++) {
        p5.particles.push(new Particle(p5));
    }

    p5.background(3, 7, 18);
};

const draw = (p5) => {
    // Semi-transparent background for trail effect
    p5.background(3, 7, 18, 10);

    for (let i = 0; i < p5.particles.length; i++) {
        p5.particles[i].update(p5);
        p5.particles[i].show(p5);
        p5.particles[i].edges(p5);
    }
};

class Particle {
    constructor(p5) {
        this.pos = p5.createVector(p5.random(p5.width), p5.random(p5.height));
        this.vel = p5.createVector(0, 0);
        this.acc = p5.createVector(0, 0);
        this.maxSpeed = 2;

        // Assign a random theme color to each particle
        const colors = [
            p5.color(100, 149, 237), // Cornflower Blue
            p5.color(148, 163, 184), // Slate 400
            p5.color(56, 189, 248)   // Sky 400
        ];
        this.color = p5.random(colors);
    }

    update(p5) {
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);

        // Random movement noise
        let angle = p5.noise(this.pos.x * 0.01, this.pos.y * 0.01, p5.frameCount * 0.001) * p5.TWO_PI * 4;
        this.acc.add(p5.Vector.fromAngle(angle).mult(0.1));
    }

    show(p5) {
        p5.stroke(this.color);
        p5.strokeWeight(2);
        p5.point(this.pos.x, this.pos.y);
    }

    edges(p5) {
        if (this.pos.x > p5.width) this.pos.x = 0;
        if (this.pos.x < 0) this.pos.x = p5.width;
        if (this.pos.y > p5.height) this.pos.y = 0;
        if (this.pos.y < 0) this.pos.y = p5.height;
    }
}

const sketch = {
    setup,
    draw,
    restartSketch: () => { }
};

export default sketch;
