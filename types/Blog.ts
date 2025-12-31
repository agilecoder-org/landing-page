import p5 from "p5";

export interface Blog {
    slug: string;
    name: string;
    sketch: Sketch;
    description: string;
    category: string;
    tags: string;
    headerImg: string;
    similar: string[];
}

export interface Sketch {
    draw: (p5: p5) => void,
    setup: (p5: p5) => void,
    mousePressed?: (p5: p5) => void,
    mouseReleased?: (p5: p5) => void,
    mouseDragged?: (p5: p5) => void,
    zoomIn?: () => void,
    zoomOut?: () => void,
    resetZoom?: () => void,
    resetSketch?: (p5: p5) => void,
}
