"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, useInView } from 'framer-motion';
import RestartButton from '@/components/RestartButton';
import { Button } from '@/components/ui/button';
import useIntersection from '@/hooks/useIntersection';

const P5Wrapper = dynamic(() => import('@/components/P5Wrapper'), {
    ssr: false
});

interface SketchSectionProps {
    title: string;
    description: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sketch: any;
    categoryLink?: string; // e.g., "/code-and-art/blog?category=simulations"
    buttonText?: string;
    titleClassName?: string; // Optional override for title size
}

const SketchSection: React.FC<SketchSectionProps> = ({
    title,
    description,
    sketch,
    categoryLink,
    buttonText = "Explore Full",
    titleClassName = "text-5xl md:text-8xl",
}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [restart, setRestart] = useState<boolean>(false);
    const [loadedSketch, setLoadedSketch] = useState<any>(null);

    // Intersection observer for performance (pausing sketch when not visible)
    const intersectionOptions = useMemo(() => ({
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
    }), []);

    const isVisible = useIntersection(containerRef, intersectionOptions);

    // Framer motion in-view detection for text animations
    const isInView = useInView(containerRef, { once: true, margin: "-20%" });

    const handleRestart = () => {
        if (loadedSketch && loadedSketch.restartSketch) {
            loadedSketch.restartSketch();
        }
        setRestart(true);
        setTimeout(() => setRestart(false), 100);
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setLoadedSketch(sketch);
        }
    }, [sketch]);

    return (
        <div className="relative h-full w-full flex items-center justify-center bg-background overflow-hidden" ref={containerRef}>
            {/* Background Sketch */}
            <div className="absolute inset-0 z-0">
                {!restart && isVisible && loadedSketch && (
                    <P5Wrapper setup={loadedSketch.setup} draw={loadedSketch.draw} />
                )}
            </div>

            {/* Dark Overlay for Contrast */}
            <div className="absolute inset-0 z-10 bg-black/50 pointer-events-none" />

            {/* Content Overlay */}
            <div className="relative z-20 px-6 md:px-12 max-w-4xl text-center text-white drop-shadow-lg pointer-events-none">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`${titleClassName} font-sans font-bold tracking-tighter mb-6 shadow-black/50`}
                >
                    {title}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 0.9, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-xl md:text-3xl font-light mb-10 opacity-90 shadow-black/50"
                >
                    {description}
                </motion.p>

                {categoryLink && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="pointer-events-auto flex items-center justify-center gap-4"
                    >
                        <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 shadow-xl font-semibold text-lg px-8 py-6 h-auto">
                            <Link href={categoryLink}>{buttonText}</Link>
                        </Button>
                    </motion.div>
                )}
            </div>

            {/* Restart Button - Fixed Position */}
            <div className="absolute bottom-8 right-8 z-30">
                <RestartButton onClick={handleRestart} />
            </div>
        </div>
    );
};

export default SketchSection;
