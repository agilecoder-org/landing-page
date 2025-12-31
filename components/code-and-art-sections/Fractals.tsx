"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react';
import toothpickAnimation from '@/sketches/toothpickAnimation';
import useIntersection from '@/hooks/useIntersection';
import RestartButton from '@/components/RestartButton';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const P5Wrapper = dynamic(() => import('@/components/P5Wrapper'), {
  ssr: false
});

import { Button } from '@/components/ui/button';

const Fractals: React.FC = () => {
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

  const points: string[] = [
    "Fractals contain infinite detail, allowing for an endless exploration of complexity, no matter how much you zoom in.",
    "Fractals are found in nature, appearing in structures like snowflakes, coastlines, mountains, and plants (e.g., ferns and broccoli).",
    "Fractals are defined by simple mathematical equations, yet they can create incredibly complex and intricate images, demonstrating the link between math and art.",
    "Fractals are key to chaos theory, illustrating how complex systems can arise from simple rules, impacting fields like meteorology, biology, and economics."
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setSketch(toothpickAnimation)
  }, [])

  return (
    <div className="flex justify-center lg:h-[calc(100vh-200px)] lg:my-0 my-20 items-center px-4">
      <div className="grid lg:grid-cols-2 gap-10 max-w-[1200px] w-full">
        <div>
          <h1 id="fractals" className="text-[4rem] font-sans font-bold tracking-tight text-foreground">Fractals</h1>
          <ul className="list-disc text-xl ml-6 text-muted-foreground marker:text-primary">
            {points.map((point, index) => (
              <li key={index} className="mb-4">{point}</li>
            ))}
          </ul>

          <div className="mt-10 ml-5">
            <Button asChild size="lg">
              <Link href="/fractals">
                Explore
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex flex-col relative min-h-[500px] justify-center items-center bg-card rounded-xl border border-border shadow-sm overflow-hidden" ref={sketchRef}>
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

export default Fractals;
