"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react';
import art from '@/sketches/art';
import RestartButton from '@/components/RestartButton';
import useIntersection from '@/hooks/useIntersection';
import dynamic from 'next/dynamic';
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
    <div className="flex justify-center lg:h-[calc(100vh-200px)] lg:my-0 my-20 items-center">
      <div className="grid lg:grid-cols-2 gap-10 max-w-[1200px] w-full">
        <div>
          <h1 className="text-[4rem] font-fira font-semibold">Art</h1>
          <ul className="list-disc text-xl ml-6">
            {points.map((point, index) => (
              <li key={index} className="mb-4">{point}</li>
            ))}
          </ul>

          <div className="mt-10">
            <button className="bg-black w-fit text-white px-5 py-2 ml-5" onClick={() => { }}>
              Explore
            </button>
          </div>
        </div>
        <div className="flex flex-col relative min-h-[550px] justify-center items-center" ref={sketchRef}>
          {!restart && isVisible && (
            <P5Wrapper setup={sketch.setup} draw={sketch.draw} />
          )}
          <div className="md:bottom-[-20px] bottom-0" style={{ position: 'absolute', cursor: "pointer" }}>
            <RestartButton onClick={handleRestart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Art;
