"use client"
import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import particles from "@/sketches/particles";

const P5Wrapper = dynamic(() => import('@/components/P5Wrapper'), {
  ssr: false
});

const CreativeCoding: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative h-full w-full flex items-center justify-center bg-background overflow-hidden" ref={containerRef}>
      {/* Background Particles */}
      <div className="absolute inset-0 z-0">
        <P5Wrapper setup={particles.setup} draw={particles.draw} />
      </div>

      {/* Minimal Overlay Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <h2 className="text-4xl md:text-6xl font-sans font-bold tracking-tight text-foreground mb-8">
          Algorithms as our <span className="text-primary">Brush</span>. <br />
          Code as our <span className="text-primary">Canvas</span>.
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Creative coding breaks the boundary between tool and art, turning cold logic into fluid expression.
        </p>
      </div>
    </div>
  );
};

export default CreativeCoding;
