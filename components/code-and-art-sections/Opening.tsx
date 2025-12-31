"use client"
import React, { useRef } from 'react';
import pendulum from "@/sketches/pendulum"
import { FaAngleDoubleDown } from 'react-icons/fa';
import dynamic from 'next/dynamic';

const P5Wrapper = dynamic(() => import('@/components/P5Wrapper'), {
  ssr: false
});

const Opening: React.FC = () => {
  const pendulumRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="relative h-full w-full flex items-center justify-center bg-background overflow-hidden">
      {/* Background Sketch */}
      <div className="absolute inset-0 z-0 opacity-40" ref={pendulumRef}>
        <P5Wrapper setup={pendulum.setup} draw={pendulum.draw} />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-sans font-bold tracking-tighter text-foreground mb-6">
          Artful <span className="text-primary">Coding</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide max-w-2xl mx-auto">
          Where logic meets imagination in the digital realm.
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce text-muted-foreground">
        <FaAngleDoubleDown size={24} />
      </div>
    </div>
  );
};

export default Opening;
