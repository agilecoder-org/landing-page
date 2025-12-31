"use client"
import React, { useRef } from 'react';
import pendulum from "@/sketches/pendulum"
import { motion } from 'framer-motion';
import { ChevronsDown } from 'lucide-react';
import dynamic from 'next/dynamic';

const P5Wrapper = dynamic(() => import('@/components/P5Wrapper'), {
  ssr: false
});

const Opening: React.FC = () => {
  const pendulumRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="relative h-full w-full flex items-center justify-center bg-background overflow-hidden">
      {/* Background Sketch */}
      <div className="absolute inset-0 z-0 opacity-40" ref={pendulumRef}>
        <P5Wrapper setup={pendulum.setup} draw={pendulum.draw} />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-9xl font-sans font-bold tracking-tighter text-foreground mb-6"
        >
          Artful <span className="text-primary">Coding</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide max-w-2xl mx-auto"
        >
          Where logic meets imagination in the digital realm.
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce text-muted-foreground"
      >
        <ChevronsDown size={24} />
      </motion.div>
    </div>
  );
};

export default Opening;
