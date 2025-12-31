The interesting thing is that no matter how closely you look at this pattern, you will always see more squares and holes appearing, and it never stops. It's like looking at a magic carpet with an endless, mesmerizing design! This is why the Sierpiensky Carpet is so special and loved by mathematicians and artists alike. Although, in computer screen we are limited with no of pixels and the no of pixel size. 

At it's core, we are following very simple steps:

1. First, draw a small square in the middle of the big square. This small square is like a hole.

2. Now, divide the big square into nine equal smaller squares, like a 3x3 grid.

3. We'll ignore the center square (the hole) we drew in step 1. For each of the remaining eight smaller squares, we'll repeat the same process we did in step 1. That means, in each of those squares, we'll draw another smaller square in the middle.

4. Now, for each of these smaller squares we just created, we'll divide them into nine even smaller squares, again ignoring the center one, and repeat the process of drawing a square in the middle for each of them.

5. We'll keep doing this over and over again, making smaller and smaller squares in the middle of the remaining squares, each time reducing their size.

6. We continue this process infinitely, always making smaller and smaller squares in the middle of the remaining ones.

#### Here is how we can create this pattern

```js
let len
let squares = []

class Squares {
  constructor(x, y, len) {
    this.x = x
    this.y = y
    this.len = len
  }

  show() {
    rectMode(CENTER)
    fill(255)
    rect(this.x, this.y, this.len/3, this.len/3)
  }

  generateSquares() {
    let x = this.x
    let y = this.y
    let _len = this.len

    squares.push(new Squares(x - _len/3, y - _len/3, _len/3))
    squares.push(new Squares(x, y - _len/3, _len/3))
    squares.push(new Squares(x + _len/3, y - _len/3, _len/3))

    squares.push(new Squares(x - _len/3, y , _len/3))
    squares.push(new Squares(x + _len/3, y , _len/3))

    squares.push(new Squares(x - _len/3, y + _len/3, _len/3))
    squares.push(new Squares(x , y + _len/3, _len/3))
    squares.push(new Squares(x + _len/3, y + _len/3, _len/3))
  }

  returnLen () {
    return this.len
  }
}

const setup = (p5, canvasParentRef) => {
  createCanvas(500, 500)
  len = 500
  squares[0] = new Squares(width/2, height/2, len)
};

let stop = false

const draw = () => {
  background(0)

  for(let a of squares){
    
    a.show(p5)

    if(a.returnLen() < 10){
      stop = true
    } else {
      a.generateSquares()
    }
  }

  if(stop) {
    noLoop()
  }
}

```

#### Some Facts about Sierpiensky Carpet

1. **Fractals and Self-Similarity**: The Sierpiensky Carpet is a classic example of a fractal, a geometric pattern that exhibits self-similarity at various scales. As you zoom in or out on the carpet, you will find smaller and smaller copies of the original pattern, repeating infinitely. This property makes fractals essential in understanding natural phenomena, such as coastlines, mountain ranges, and even some biological structures.

2. **Dimensionality**: Despite being a 2D object, the Sierpiensky Carpet has a non-integer dimension, known as a fractal dimension. While its surface area is zero due to the holes and voids, its fractal dimension lies between 1 and 2, indicating that it fills more space than a simple line but less than a complete 2D surface. This concept challenges conventional Euclidean geometry and opens up new avenues for studying irregular shapes.

3. **Iterative Construction**: The Sierpiensky Carpet's construction is based on a simple and elegant iterative process, where a square is repeatedly subdivided and central portions removed. This recursive approach helps mathematicians analyze the pattern's self-replicating nature and study how complex structures can arise from relatively straightforward rules.

4. **Mathematical Visualization**: The Sierpiensky Carpet serves as an excellent tool for visually demonstrating complex mathematical concepts to students and researchers. Its beautiful and intricate design sparks interest in the study of mathematics and encourages exploration of more advanced topics, such as chaos theory and non-linear dynamics.

5. **Connection to Number Theory**: The Sierpiensky Carpet also has interesting connections to number theory. For instance, it can be used to illustrate certain properties of the so-called "Cantor set," which is a well-known and fundamental mathematical construct in number theory.

When we step back and look at the big picture, what we see is an incredibly fascinating pattern with lots of squares and holes, and this pattern continues forever with no end. This is the Sierpiensky Carpet!