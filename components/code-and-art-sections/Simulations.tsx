"use client"
import React from 'react';
import bouncingBall from '@/sketches/bouncingBall';
import SketchSection from './SketchSection';

const Simulations: React.FC = () => {
  return (
    <SketchSection
      title="Simulations"
      description="Breathing life into abstract concepts through physics."
      sketch={bouncingBall}
      categoryLink="/code-and-art/blog?category=simulations"
    />
  );
};

export default Simulations;
