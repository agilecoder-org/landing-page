import sierpiensky_triangle from "../../sketches/fractals/sierpiensky_triangle/sketch"
import cardiod from '../../sketches/fractals/cardiod/sketch'
import nephroid from '../../sketches/fractals/nephroid/sketch'
import timesTableAnimation from '../../sketches/fractals/times_table_animation/sketch'
import mandelbrotSet from '../../sketches/fractals/mandelbrot_set/sketch'
import kochCurve from '../../sketches/fractals/koch_curve/sketch'
import kochSnowflake from '../../sketches/fractals/koch_snowflake/sketch'
import simpleFractalTree from '../../sketches/fractals/simple_fractal_tree/sketch'
import juliaSet from '../../sketches/fractals/julia_set/sketch'
import sierpienskyCarpet from '../../sketches/fractals/sierpiensky_carpet/sketch'
import toothpickSequence from '../../sketches/fractals/toothpick_sequence/sketch'
import tenPrint from '../../sketches/fractals/ten_print/sketch'
import { Blog } from "@/types/Blog"

// Note: Ensure @/types/Blog exists or create it. I am using existing types if possible.
// If not, I should define the type here or import it from proper place. 
// Assuming @/types/Blog needs to be created or I should define it inline.
// For now I'll create the file as requested, and will check types later.

/* 
  Corrected imports to point to agile-coder/sketches/rubric
*/

export const sketchIndex: Blog[] = [
    {
        slug: 'cardiod',
        name: 'Uncovering the Cardiod: Beauty, Math & Code',
        sketch: cardiod,
        description: 'The cardioid is a unique and visually captivating mathematical shape, known for its heart-like form and presence in both nature and technology. From its intriguing mathematical structure to applications in art, sound engineering, and even planetary orbits, the cardioid offers a blend of aesthetic appeal and functional versatility.',
        category: 'fractals',
        tags: 'fractals, generative art, two times table, cardiod',
        headerImg: "/assets/thumbnails/cardiod.png",
        similar: ['nephroid', 'times_table_animation']
    },
    {
        slug: 'nephroid',
        name: 'Nephroid',
        sketch: nephroid,
        description: "In geometry, a nephroid (from Ancient Greek ὁ νεφρός (ho nephros) 'kidney-shaped') is a specific plane curve. It is a type of epicycloid in which the smaller circle's radius differs from the larger one by a factor of one-half.",
        category: 'fractals',
        tags: 'fractals, generative art, three times table, nephroid',
        headerImg: '/assets/thumbnails/nephroid.png',
        similar: ['cardiod', 'times_table_animation']
    },
    {
        slug: 'times_table_animation',
        name: 'Times Table Animation',
        sketch: timesTableAnimation,
        description: "This is the follow up of the Cardiod and Nephroid. This visualises what we get when we increase the factor from 2 to 200 and more. This creates really interesting patterns over the animation.",
        category: 'fractals',
        tags: 'fractals, generative art, three times table, animation',
        headerImg: "/assets/thumbnails/times_table_animation.png",
        similar: ['cardiod', 'nephroid']
    },
    {
        slug: 'mandelbrot_set',
        name: 'Mandelbrot Set',
        sketch: mandelbrotSet,
        description: "The Mandelbrot set is a mesmerizing fractal discovered by Benoît B. Mandelbrot in 1980. Defined through a simple iterative process in the complex plane, it showcases an intricate and infinitely detailed pattern. Points within the set remain bounded and are colored black, while those outside it escape to infinity and display vibrant colors. This self-replicating fractal reveals captivating shapes at all levels of magnification, making it a symbol of the exquisite beauty and complexity found in mathematics and nature. Its visual appeal has sparked artistic inspiration and a fascination with the endless wonders hidden within its depths.",
        category: 'fractals',
        tags: 'fractals, generative art, mandelbrot set, bounded complex plane',
        headerImg: "/assets/thumbnails/mandelbrot_set.png",
        similar: ['julia_set']
    },
    {
        slug: 'koch_curve',
        name: 'Koch Curve',
        sketch: kochCurve,
        description: "The Koch curve, also known as the Koch snowflake curve, is a remarkable fractal that showcases the enchanting world of self-replicating patterns. It is derived from the Koch snowflake by considering only one of its sides. The construction process involves iteratively replacing each line segment with four smaller segments, forming a jagged, infinitely repeating curve. This process continually increases the curve's length while retaining its intricate self-similarity.",
        category: 'fractals',
        tags: 'fractals, generative art, koch curve',
        headerImg: "/assets/thumbnails/koch_curve.png",
        similar: ['koch_snowflake']
    },
    {
        slug: 'koch_snowflake',
        name: 'Koch Snowflake',
        sketch: kochSnowflake,
        description: "The Koch snowflake is a fascinating and iconic fractal pattern that showcases the beauty of self-similarity and infinite complexity. It is constructed by iteratively replacing each straight line segment of an equilateral triangle with smaller segments, forming a pattern that resembles a snowflake. Named after the Swedish mathematician Helge von Koch, this fractal exhibits an intricate, infinitely repeating geometric structure. Despite its simple initial shape, the Koch snowflake's boundary becomes increasingly jagged and intricate with each iteration, highlighting the remarkable nature of fractals in mathematics and the mesmerizing intricacy of nature's patterns.",
        category: 'fractals',
        tags: 'fractals, generative art, koch snowflake',
        headerImg: "/assets/thumbnails/koch_snowflake.png",
        similar: ['koch_curve']
    },
    {
        slug: 'simple_fractal_tree',
        name: 'Simple Fractal Tree',
        sketch: simpleFractalTree,
        description: "A fractal tree is a captivating mathematical construct that exhibits self-replicating patterns on multiple scales, resembling the intricate branches of a tree in nature. The concept of a fractal tree is derived from fractals, which are complex geometric shapes with repeating patterns regardless of the level of magnification. Each branch of a fractal tree serves as the foundation for smaller branches, which, in turn, create even tinier branches, forming an infinitely detailed and visually stunning structure.",
        category: 'fractals',
        tags: 'fractals, generative art, fractal tree',
        headerImg: '/assets/thumbnails/simple_fractal_tree.png',
        similar: []
    },
    {
        slug: 'julia_set',
        name: 'Julia Set',
        sketch: juliaSet,
        description: "The Julia Set is a visually stunning fractal named after the French mathematician Gaston Julia. The Julia Set is generated by iterating a simple mathematical formula on each point in the complex plane, based on an initial parameter value known as C. The fractal structure emerges as the iteration progresses, determining whether each point tends to infinity or remains bounded within a certain threshold.",
        category: 'fractals',
        tags: 'fractals, generative art, Julia Set',
        headerImg: '/assets/thumbnails/julia_set.png',
        similar: ['mandelbrot_set']
    },
    {
        slug: 'sierpiensky_carpet',
        name: 'Sierpiensky Carpet',
        sketch: sierpienskyCarpet,
        description: "The Sierpiensky Carpet is constructed by iteratively dividing a square into nine smaller squares and removing the central one, then repeating the process on the remaining squares ad infinitum. The result is a stunning pattern resembling a woven carpet with intricate holes and voids at various scales. This mesmerizing fractal has captured the imagination of mathematicians and artists alike, highlighting the beauty and wonder of mathematics in nature and art.",
        category: 'fractals',
        tags: 'fractals, generative art, Sierpiensky Carpet',
        headerImg: "/assets/thumbnails/sierpiensky_carpet.png",
        similar: ['sierpiensky_triangle']
    },
    {
        slug: 'sierpiensky_triangle',
        name: 'Sierpiensky Triangle',
        sketch: sierpiensky_triangle,
        description: 'The Sierpiński triangle, also called the Sierpiński gasket or Sierpiński sieve, is a fractal attractive fixed set with the overall shape of an equilateral triangle, subdivided recursively into smaller equilateral triangles. The Sierpiński triangle, also called the Sierpiński gasket or Sierpiński sieve, is a fractal attractive fixed set with the overall shape of an equilateral triangle, subdivided recursively into smaller equilateral triangles. ',
        category: 'fractals',
        tags: 'fractals, generative art, sierpiensky triangle',
        headerImg: "/assets/thumbnails/sierpiensky.png",
        similar: ['sierpiensky_carpet']
    },
    {
        slug: 'toothpick_sequence',
        name: 'Toothpick Sequence',
        sketch: toothpickSequence,
        description: "The toothpick sequence is a visually intriguing mathematical pattern that involves the repetitive addition of toothpicks following specific rules. Starting with a single horizontal toothpick, each step generates new toothpicks based on simple instructions. As the process iterates, the number of toothpicks grows exponentially, forming intricate and self-similar structures with fractal characteristics.",
        category: 'fractals',
        tags: 'fractals, generative art, Toothpick Sequence',
        headerImg: "/assets/thumbnails/toothpick_sequence.png",
        similar: []
    },
    {
        slug: 'ten_print',
        name: 'Ten Print',
        sketch: tenPrint,
        description: "The pattern generated by the '10 PRINT' program is a mesmerizing and ever-changing maze-like design. It consists of diagonal lines that slant from the top-left corner to the bottom-right corner and vice versa, crisscrossing each other to form a visually intricate pattern",
        category: 'fractals',
        tags: 'fractals, generative art, 10 Print',
        headerImg: "/assets/thumbnails/ten_print.png",
        similar: []
    },
]
