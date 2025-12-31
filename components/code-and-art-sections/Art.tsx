"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react';
import art from '@/sketches/art';
import Link from 'next/link';
import RestartButton from '@/components/RestartButton';
import useIntersection from '@/hooks/useIntersection';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';

const P5Wrapper = dynamic(() => import('@/components/P5Wrapper'), {
  ssr: false
});

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

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setSketch(art)
  }, [])

  return (
    <div className="relative h-full w-full flex items-center justify-center bg-background overflow-hidden" ref={sketchRef}>
      {/* Background Sketch */}
      <div className="absolute inset-0 z-0">
        {!restart && isVisible && sketch && (
          <P5Wrapper setup={sketch.setup} draw={sketch.draw} />
        )}
      </div>

      {/* Dark Overlay for Contrast */}
      <div className="absolute inset-0 z-10 bg-black/50 pointer-events-none" />

      {/* Centered Overlay */}
      <div className="relative z-20 text-center px-6 max-w-4xl pointer-events-none text-white drop-shadow-lg">
        <h1 className="text-6xl md:text-9xl font-sans font-bold tracking-tighter mb-6 shadow-black/50">
          Everything is Art
        </h1>
        <p className="text-xl md:text-3xl font-light mb-10 opacity-90 shadow-black/50">
          When code meets creativity, boundaries dissolve.
        </p>

        <div className="pointer-events-auto flex items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 shadow-xl">
            <Link href="/code-and-art/blog">Explore Gallery</Link>
          </Button>
        </div>
      </div>

      {/* Restart Button - Fixed Position */}
      <div className="absolute bottom-8 right-8 z-30">
        <RestartButton onClick={handleRestart} />
      </div>
    </div>
  );
};

export default Art;
