"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import bouncingBall from '@/sketches/bouncingBall';
import useIntersection from '@/hooks/useIntersection';
import RestartButton from '@/components/RestartButton';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';

const P5Wrapper = dynamic(() => import('@/components/P5Wrapper'), {
  ssr: false
});

const Simulations: React.FC = () => {
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
    setRestart(true);
    setTimeout(() => setRestart(false), 100);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setSketch(bouncingBall)
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
      <div className="absolute inset-0 z-10 bg-black/40 pointer-events-none" />

      {/* Content Overlay */}
      <div className="relative z-20 px-6 md:px-12 max-w-2xl pointer-events-none text-center text-white drop-shadow-lg">
        <h1 className="text-6xl md:text-8xl font-sans font-bold tracking-tighter mb-4 shadow-black/50">
          Simulations
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-light opacity-90 shadow-black/50">
          Breathing life into abstract concepts through physics.
        </p>

        <div className="pointer-events-auto flex items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 shadow-xl">
            <Link href="/simulations">Explore Full</Link>
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

export default Simulations;
