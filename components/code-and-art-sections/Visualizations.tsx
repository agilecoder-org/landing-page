"use client"
import React from 'react';
import timesTableAnimation from '@/sketches/timesTableAnimation';
import SketchSection from './SketchSection';

const Visualizations: React.FC = () => {
  return (
    <SketchSection
      title="Visualizations"
      description="Revealing the hidden beauty in data and mathematics."
      sketch={timesTableAnimation}
      categoryLink="/code-and-art/blog?category=visualizations"
    />
  );
};

export default Visualizations;
