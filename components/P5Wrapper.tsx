/* eslint-disable @typescript-eslint/no-explicit-any, react/display-name */
import React, { useEffect, useRef, forwardRef, useCallback } from 'react';
import p5 from 'p5';

interface P5WrapperProps {
  setup: (p: p5, parentRef?: Element) => void;
  draw: (p: p5) => void;
  mousePressed?: (p: p5) => void;
  mouseDragged?: (p: p5) => void;
  mouseReleased?: (p: p5) => void;
}

interface P5WrapperHandle {
  downloadImage: () => void;
}

const P5Wrapper = forwardRef<P5WrapperHandle, P5WrapperProps>(
  ({ setup, draw, mousePressed, mouseDragged, mouseReleased }) => {
    const sketchRef = useRef<HTMLDivElement>(null);
    const p5Instance = useRef<p5 | null>(null);
    const hasInitialized = useRef(false);

    useEffect(() => {
      if (typeof window === 'undefined' || !sketchRef.current || hasInitialized.current) return;

      hasInitialized.current = true;

      const sketch = (p: p5) => {
        p.setup = () => setup(p, sketchRef.current as unknown as Element);
        p.draw = () => draw(p);
        p.mousePressed = () => {
          if (mousePressed) mousePressed(p);
        };
        p.mouseDragged = () => {
          if (mouseDragged) mouseDragged(p);
        };
        p.mouseReleased = () => {
          if (mouseReleased) mouseReleased(p);
        };
      };

      p5Instance.current = new p5(sketch, sketchRef.current);

      return () => {
        if (p5Instance.current) {
          p5Instance.current.remove();
          p5Instance.current = null;
        }
      };
    }, []); // Empty dependency array - initialize only once

    return <div className="w-full h-full hover:cursor-move" ref={sketchRef} />;
  }
);

P5Wrapper.displayName = 'P5Wrapper';

export default P5Wrapper;