"use client"
import React from 'react';
import toothpickAnimation from '@/sketches/toothpickAnimation';
import SketchSection from './SketchSection';

const Fractals: React.FC = () => {
  return (
    <SketchSection
      title="Fractals"
      description="Infinite complexity from simple rules."
      sketch={toothpickAnimation}
      categoryLink="/code-and-art/blog?category=fractals"
    />
  );
};

export default Fractals;
