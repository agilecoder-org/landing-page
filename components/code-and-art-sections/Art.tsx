"use client"
import React from 'react';
import art from '@/sketches/art';
import SketchSection from './SketchSection';

const Art: React.FC = () => {
  return (
    <SketchSection
      title="Everything is Art"
      description="When code meets creativity, boundaries dissolve."
      sketch={art}
      categoryLink="/code-and-art/blog"
      buttonText="Explore Gallery"
      titleClassName="text-6xl md:text-9xl"
    />
  );
};

export default Art;
