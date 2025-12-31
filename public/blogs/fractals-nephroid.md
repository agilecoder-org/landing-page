**The nephroid** is a fascinating mathematical curve with a kidney bean-like shape, known for its constant curvature and elegant geometric properties. It is a type of hypocycloid, formed by tracing a point on the circumference of a circle as it rolls around the inside of another fixed circle. Named after "nephros," the Greek word for kidney, the nephroid has historical significance and has intrigued mathematicians for centuries. Its simplicity and symmetrical nature find applications in engineering, particularly in gear design. With its constant curvature and dual curve property, the nephroid continues to captivate the curiosity of mathematicians and geometric enthusiasts alike

#### How can we reproduce this pattern

```js
let factor = 3
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

#### Some Facts about Cardiod

1. **Mathematical Curiosity**: The nephroid is a fascinating mathematical curve known for its elegant geometric properties. It is a member of the family of hypocycloids, a type of curve formed by tracing a point on the circumference of a circle as it rolls around the inside of another fixed circle.

2. **Shape and Parametric Equation**: The nephroid is a simple and symmetric curve, resembling a kidney bean. In polar coordinates, it can be represented by the equation r = a(1 + 2cos(θ)), where 'r' represents the distance from the origin, 'a' is a constant determining the size of the curve, and 'θ' is the angle from the positive x-axis.

3. **Constant Curvature**: The nephroid has constant curvature, which means that the curvature of the curve remains the same at all points. This unique property makes it an intriguing object of study in differential geometry.

4. **Named After "Nephros"**: The term "nephroid" is derived from the Greek word "nephros," which means kidney. The curve's kidney bean-like shape led to its name, paying homage to its visual resemblance.

5. **Area Enclosed**: The nephroid encloses exactly three times the area of the circle from which it is derived. This relationship between the area of the nephroid and its generating circle is a notable geometric property.

6. **Applications in Engineering**: The nephroid's constant curvature and symmetrical shape have practical applications in engineering, particularly in the design of gears and other mechanisms where smooth motion and constant velocity are essential.

7. **Dual Curve**: The nephroid is self-dual, meaning that it remains unchanged under a specific geometric transformation. If you reflect the nephroid about its own tangent line at any point, the resulting curve is identical to the original one.

8. **Cycloidal Property**: The nephroid is a special case of a hypocycloid, a curve formed by rolling a circle inside another circle. In particular, the nephroid is a 3-cusped hypocycloid, where the rolling circle completes three full rotations before closing the curve.

9. **Compass and Straightedge Construction**: The nephroid can be constructed using only a compass and a straightedge, making it a classical example of a curve that is constructible with these simple tools.

10. **Historical Significance**: The nephroid has a rich mathematical history and has been studied by several prominent mathematicians throughout the centuries, contributing to the exploration of various geometric and algebraic concepts.

Overall, the nephroid is a captivating and historically significant mathematical curve, boasting elegant properties and connections to various areas of mathematics and engineering. Its intriguing shape and constant curvature continue to inspire mathematicians and geometric enthusiasts, making it a delightful subject of exploration and study.