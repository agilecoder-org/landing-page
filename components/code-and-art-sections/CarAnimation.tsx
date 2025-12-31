"use client"
import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
const P5Wrapper = dynamic(() => import('@/components/P5Wrapper'), {
  ssr: false
});

import carSketch from "@/sketches/carSketch";

const CarAnimation: React.FC = () => {
  const carRef = useRef<HTMLDivElement | null>(null);
  return (
    <div>
      <div className="w-full relative overflow-hidden" id="car-animation" ref={carRef}>
        <P5Wrapper setup={carSketch.setup} draw={carSketch.draw} />
      </div>
    </div>
  );
}

export default CarAnimation;
