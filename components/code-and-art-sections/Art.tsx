"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react';
import art from '@/sketches/art';
import RestartButton from '@/components/RestartButton';
import useIntersection from '@/hooks/useIntersection';
import dynamic from 'next/dynamic';
const P5Wrapper = dynamic(() => import('@/components/P5Wrapper'), {
  ssr: false
});

import { Button } from '@/components/ui/button';

const Art: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [sketch, setSketch] = useState<any>();
  const sketchRef = useRef<HTMLDivElement | null>(null);
  const [restart, setRestart] = useState<boolean>(false);

  const intersectionOptions = useMemo(() => ({
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  }), []);

  const isVisible = useIntersection(sketchRef, intersectionOptions);

  const handleRestart = () => {
    art.restartSketch();
    setRestart(true);
    setTimeout(() => setRestart(false), 100);
  };

  const points: string[] = [
    "Code empowers artists to design systems that create infinite variations, where each run of the program generates a new, unique piece of art.",
    "Everyday objects and scenes become extraordinary through an artistic lens, showing the beauty in the ordinary.",
    "Art often blends technical precision with free-form imagination, where coding, algorithms, and creativity intersect.",
    "Just like nature, art evolves, with each new generation pushing boundaries, experimenting, and redefining what's possible."
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setSketch(art)
  }, [])

  return (
    <div className="flex justify-center lg:h-[calc(100vh-200px)] lg:my-0 my-20 items-center px-4">
      <div className="grid lg:grid-cols-2 gap-10 max-w-[1200px] w-full">
        <div>
          <h1 className="text-[4rem] font-sans font-bold tracking-tight text-foreground">Art</h1>
          <ul className="list-disc text-xl ml-6 text-muted-foreground marker:text-primary">
            {points.map((point, index) => (
              <li key={index} className="mb-4">{point}</li>
            ))}
          </ul>

          <div className="mt-10 ml-5">
            <Button size="lg" onClick={() => { }}>
              Explore
            </Button>
          </div>
        </div>
        <div className="flex flex-col relative min-h-[550px] justify-center items-center bg-card rounded-xl border border-border shadow-sm overflow-hidden" ref={sketchRef}>
          {!restart && isVisible && (
            <P5Wrapper setup={sketch.setup} draw={sketch.draw} />
          )}
          <div className="absolute bottom-4 right-4 z-10 cursor-pointer">
            <RestartButton onClick={handleRestart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Art;
