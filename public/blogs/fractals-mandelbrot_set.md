The Pattern you see is a depiction of the set of bounded complex numbers. Following a particular rule. The larges shape in the picture is called the Cardiod. This shape is particularly special and occurs more often in nature than u might think. You can read the [Cardiod](/sketch/cardiod) Blog.

At its heart, the Mandelbrot Set is formed by iterating a deceptively basic mathematical formula. Starting with a complex number c, each point in the complex plane undergoes an iterative process: 

Z(n+1) = Z(n)^2 + C, where Z(n) starts from 0

The crucial distinction lies in whether these iterations remain bounded or escape to infinity for each **C** value. Points that remain bounded are considered part of the Mandelbrot Set and are often colored black, while points that diverge are outside the set and colored based on the speed of divergence.

When the Mandelbrot Set is visualized on the complex plane, its extraordinary complexity is revealed. An infinite landscape of intricate patterns emerges, characterized by self-similarity and self-replication. As one zooms into any part of the set, smaller copies of the overall pattern continuously emerge, perpetuating the mesmerizing nature of the fractal. This property of "fractal self-similarity" ensures that the Mandelbrot Set holds mysteries and surprises at every level of magnification, effectively drawing observers into an infinite corridor of discovery.

#### How to Reproduce the Pattern

```js
let minval = -2.0;
let maxval = 1.5;

function setup() {
  createCanvas(500, 500);
  pixelDensity(1);
}

function draw() {
  let maxiterations = 50;

  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {

      let a = map(x, 0, width, minval, maxval);
      let b = map(y, 0, height, minval, maxval);

      let ca = a;
      let cb = b;

      let n = 0;

      while (n < maxiterations) {
        let aa = a * a - b * b;
        let bb = 2 * a * b;
        a = aa + ca;
        b = bb + cb;
        if (a * a + b * b > 16) {
          break;
        }
        n++;
      }

      let bright = map(n, 0, maxiterations, 0, 1);
      bright = map(sqrt(bright), 0, 1, 0, 255);

      if (n == maxiterations) {
        bright = 0;
      }

      let pix = (x + y * width) * 4;
      pixels[pix + 0] = bright;
      pixels[pix + 1] = bright;
      pixels[pix + 2] = bright;
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();
}
```

#### Here are some of the facts about the Mandelbrot Set

1. **Discovery:** The Mandelbrot Set is named after its discoverer, Benoît B. Mandelbrot, a Polish-born French-American mathematician. He introduced the set to the world in 1980, revolutionizing the field of fractal geometry.

2. **Fractal Nature:** The Mandelbrot Set is a classic example of a fractal, a mathematical object that exhibits self-similarity and complexity at all levels of magnification. This means that as you zoom into any part of the set, you encounter smaller copies of the overall pattern.

3. **Iterative Process:** The Mandelbrot Set is defined by an iterative process in the complex plane. For each point \( c \) in the complex plane, the iteration \( z_&#123;n+1&#125; = z_n^2 + c \) is repeated with \( z_0 = 0 \) to determine if the sequence of \( z_n \) remains bounded or escapes to infinity.

4. **Infinite Complexity:** The boundary of the Mandelbrot Set, known as the "Mandelbrot boundary" or "seahorse valley," contains infinitely intricate structures, such as filaments and seahorse-like shapes. These patterns are a key feature of the set's mesmerizing complexity.

5. **Coloring:** Points inside the Mandelbrot Set (bounded iterations) are typically colored black, while points outside the set (escaping iterations) are colored based on the speed of divergence. This color scheme allows for stunning visual representations of the fractal.

6. **Uncomputable Exact Area:** The Mandelbrot Set has an infinite and infinitely complex boundary, and its exact area cannot be computed due to its infinitely intricate nature.

7. **Real and Imaginary Axis:** The Mandelbrot Set is plotted on the complex plane, with the horizontal axis representing the real numbers and the vertical axis representing the imaginary numbers.

8. **Scientific and Artistic Impact:** The Mandelbrot Set has inspired artists, musicians, and writers, influencing various forms of art and cultural expressions. Additionally, it has found applications in computer graphics, image compression, and the study of natural phenomena with fractal-like characteristics.

9. **Continuously Explored:** The Mandelbrot Set remains a subject of active research, and mathematicians continue to study its properties and explore new aspects of this intriguing fractal.

10. **Popular Visualizations:** The Mandelbrot Set has become famous for its mesmerizing visualizations and zooms, where computer-generated images and animations take viewers on breathtaking journeys through its intricate structures.

In summary, the Mandelbrot Set is a captivating mathematical construct with infinite complexity and self-similarity. Its discovery has had a profound impact on mathematics, art, and popular culture, while its intricate beauty continues to inspire awe and fascination among enthusiasts and researchers alike.