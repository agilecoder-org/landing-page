#### Things to try in the Interactive Demo:
- Try changing totalPoints - More number of points on the circle can result in a clear image of the cardiod.
- You can share the downloaded image after changing the colors to something more interesting.

#### Where it is found in nature
The cardioid shape appears naturally in light patterns and sound waves. For example:

- Light Caustics: When light reflects off a curved surface or passes through a transparent material, it can create a cardioid-shaped caustic pattern.
- Microphone Sound Patterns: Cardioid patterns are used in directional microphones to capture sound from the front while minimizing background noise from other directions.

![](/assets/images/cardiod-in-nature.png)

#### The Math Behind It
The cardioid can be represented by the polar equation: `r=a(1+cos(θ))`
where:
- r is the radial distance from the origin,
- a is a constant that determines the cardioid's size,
- θ is the angle from the positive x-axis.

This equation generates a symmetric curve with a cusp, or pointed top, that gives the cardioid its distinct heart shape. The cardioid is a type of limaçon and exhibits unique properties like self-duality, meaning it remains unchanged under specific geometric transformations.

---

#### How can we reproduce this pattern

```js
let factor = 2
let totalPoints = 10
let radius

const setup = () => {
  createCanvas(500, 500);
  radius = width/2 - 20
};

function getVector(index){
  let angle = map(index % totalPoints, 0, totalPoints, 0, TWO_PI)
  
  let v = {
    x: cos(angle + PI)*radius,
    y: sin(angle + PI)*radius
  }

  return v
}

const draw = () => {
  background(255);

  translate(width/2, height/2)
  circle(0, 0, radius*2)

  if(totalPoints < 200)
  totalPoints += 0.5

  for(let i = 0; i < totalPoints; i++){
    circle(getVector(i).x , getVector(i).y, 5)
    line(getVector(i).x , getVector(i).y , getVector(i * factor).x , getVector(i*factor).y)
  }
}
```

#### Interesting Facts About the Cardioid

1. **Geometric Shape**: The cardioid is a plane curve, a type of limaçon, that resembles the shape of a heart with a pointed cusp at the top and a loop-like curve extending downwards.

2. **Polar Equation**: The cardioid can be represented in polar coordinates by the equation r = a(1 + cos(θ)), where 'r' is the distance from the origin, 'a' is a constant determining the size of the curve, and 'θ' is the angle from the positive x-axis.

3. **Duality**: The cardioid is self-dual, meaning that it remains unchanged under a specific geometric transformation. If you reflect the cardioid about a line through the origin at an angle of 45 degrees, the resulting curve is identical to the original one.

4. **Heart Symbol**: The cardioid's heart-like shape has made it a popular symbol of love and affection, and it is often used in various contexts, including romantic art, greeting cards, and Valentine's Day decorations.

5. **Planetary Orbits**: The cardioid appears in the parametric equations that describe the motion of planets around a star. It is related to the path of a planet under certain gravitational forces.

6. **Directional Microphones**: The cardioid pattern is widely used in directional microphones in audio engineering. This pattern is sensitive to sound sources from one direction while rejecting noise from other angles, making it ideal for recording specific sounds.

7. **Roulette Curve**: The cardioid is a special case of a roulette, a curve traced by a point on a fixed shape as it rolls without slipping around a circle. The cardioid is the result of a circle rolling around another circle of the same size.

8. **Circle Inversion**: The cardioid is one of the shapes that remain unchanged under a specific type of geometric transformation called circle inversion. When a circle is inverted through another circle, the cardioid is one of the curves that remain fixed.

9. **Acoustic Properties**: The cardioid shape has unique acoustic properties, making it useful in sound engineering and loudspeaker designs. It helps direct sound in specific directions, minimizing unwanted reflections and enhancing sound quality.

10. **Applications in Mathematics and Science**: The cardioid has applications in various fields, including physics, engineering, and computer graphics. It continues to be a subject of fascination and study in mathematics due to its intriguing properties and aesthetic appeal.

These major facts highlight the cardioid's significance and versatility, both as a mathematical curve and as an inspiration in various artistic and scientific endeavors.