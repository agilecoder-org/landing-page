"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import bouncingBall from '@/sketches/bouncingBall';
import useIntersection from '@/hooks/useIntersection';
import RestartButton from '@/components/RestartButton';
import dynamic from 'next/dynamic';
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

  const points = [
    "Physics simulations breathe life into abstract concepts, turning theoretical principles into immersive, real-time visual experiences.",
    "From gravitational forces to fluid dynamics, physics simulations allow users to explore and manipulate physical phenomena through interactive, dynamic environments.",
    "Simulations let us visualize the unseen—forces, particles, and fields—revealing the underlying mechanics that govern the physical world.",
    "Physics engines replicate the real-world behaviors of objects, from bouncing balls to chaotic collisions, allowing users to explore nature's rules in creative ways."
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setSketch(bouncingBall)
  }, [])

  return (
    <div className="flex justify-center lg:h-[calc(100vh-200px)] lg:my-0 my-20 items-center">
      <div className="grid lg:grid-cols-2 gap-10 max-w-[1200px] w-full">
        <div>
          <h1 className="text-[4rem] hidden md:block font-fira font-semibold">Simulations</h1>
          <h1 className="text-[4rem] block md:hidden font-fira font-semibold">Sims</h1>
          <ul className="list-disc text-xl ml-6">
            {points.map((point, index) => (
              <li key={index} className="mb-4">{point}</li>
            ))}
          </ul>

          <div className="mt-10">
            <Link href="/simulations">
              <p className="bg-black w-fit text-white px-5 py-2 ml-5">Explore</p>
            </Link>
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

export default Simulations;
