"use client"
import React, { useRef } from 'react';
import pendulum from "@/sketches/pendulum"
import { FaAngleDoubleDown } from 'react-icons/fa';
import dynamic from 'next/dynamic';

const P5Wrapper = dynamic(() => import('@/components/P5Wrapper'), {
  ssr: false
});

const Opening: React.FC = () => {
  const pendulumRef = useRef<HTMLDivElement | null>(null); // Define ref type
  return (
    <div className="sm:p-10">
      <div className="absolute bg-opacity-0 top-[92px] left-1/2 transform -translate-x-1/2" ref={pendulumRef} id="pendulum">
        <P5Wrapper setup={pendulum.setup} draw={pendulum.draw} />
      </div>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
        <h1 className="text-[2rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[5rem] font-fira font-semibold sm:text-center">
          Let&apos;s look at the creative side of programming!
        </h1>
        <p className="text-xl mt-5 bg-black bg-opacity-10 text-black px-5 py-2">
          Programming is not just building websites and apps!
        </p>

        <div className="mt-10 font-fira flex flex-col justify-center items-center">
          <p>Scroll Down</p>
          <FaAngleDoubleDown className="mt-5 animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default Opening;
