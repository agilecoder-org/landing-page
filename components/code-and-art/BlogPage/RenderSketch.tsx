/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { sketchIndex } from "@/lib/code-and-art/data";
import dynamic from 'next/dynamic';

import { ZoomIn, ZoomOut, Maximize, Download, RefreshCw } from "lucide-react";
import { Blog, Sketch } from '@/types/Blog';

const P5Wrapper = dynamic(() => import('@/components/P5Wrapper'), {
    ssr: false // Disable server-side rendering for this component
});

const RenderSketch = ({ slug }: { slug: any }) => {
    const [currentSketch, setCurrentSketch] = useState<Sketch | null>(null);
    const P5ref = useRef<any>(null);  // Reference to P5Wrapper

    useEffect(() => {
        const foundSketch = sketchIndex.find((item: Blog) => item.slug === slug);

        if (foundSketch && foundSketch.sketch) {
            setCurrentSketch(foundSketch.sketch);
        } else {
            setCurrentSketch(null);
        }
    }, [slug]);

    const downloadImage = () => {
        const canvas = document.querySelector('#defaultCanvas0');
        if (!canvas) return;

        const image = (canvas as any).toDataURL('image/png', 1.0);

        const link = document.createElement('a');
        link.href = image;
        link.download = `${slug}.png`;
        link.click();
    };

    return (
        <div className="my-8 md:grid md:grid-cols-5 gap-6 border rounded-xl overflow-hidden bg-card shadow-sm">
            <div className="relative md:col-span-3 min-h-[500px] bg-secondary/20 flex flex-col justify-center items-center overflow-hidden border-b md:border-b-0 md:border-r border-border/50">
                {currentSketch ? (
                    <>
                        <P5Wrapper
                            setup={currentSketch.setup}
                            draw={currentSketch.draw}
                            ref={P5ref}  // Forward ref to P5Wrapper
                            mousePressed={currentSketch.mousePressed}
                            mouseDragged={currentSketch.mouseDragged}
                            mouseReleased={currentSketch.mouseReleased}
                        />

                        {/* Floating Toolbar */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-2 rounded-full shadow-lg border border-border/50 transition-all opacity-100 hover:opacity-100">
                            <div className="flex items-center gap-1 border-r border-border pr-2 mr-2">
                                <button
                                    onClick={() => currentSketch.zoomIn?.()}
                                    className="p-2 hover:bg-secondary rounded-full transition-colors text-foreground/80 hover:text-foreground"
                                    title="Zoom In"
                                >
                                    <ZoomIn className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => currentSketch.resetZoom?.()}
                                    className="p-2 hover:bg-secondary rounded-full transition-colors text-foreground/80 hover:text-foreground"
                                    title="Fit Screen"
                                >
                                    <Maximize className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => currentSketch.zoomOut?.()}
                                    className="p-2 hover:bg-secondary rounded-full transition-colors text-foreground/80 hover:text-foreground"
                                    title="Zoom Out"
                                >
                                    <ZoomOut className="h-4 w-4" />
                                </button>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => currentSketch.resetSketch?.(P5ref as any)}
                                    className="p-2 hover:bg-secondary rounded-full transition-colors text-foreground/80 hover:text-foreground"
                                    title="Restart Sketch"
                                >
                                    <RefreshCw className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => downloadImage()}
                                    className="p-2 hover:bg-secondary rounded-full transition-colors text-foreground/80 hover:text-foreground"
                                    title="Download Snapshot"
                                >
                                    <Download className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                        <p>No sketch available for this slug.</p>
                    </div>
                )}
            </div>

            <div id="controls" className="md:col-span-2 flex flex-col p-6 bg-card text-card-foreground">
                <div>
                    <h3 className="text-2xl font-semibold mb-1 tracking-tight">Interactive Demo</h3>
                    <p className="text-sm text-muted-foreground mb-6">Adjust the parameters to explore the visualization.</p>

                    <div className="space-y-6">
                        {/* Controls injected here by p5.js */}
                        <div className="flex flex-col space-y-4" id="interactions" />
                        <div id="slider" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RenderSketch;
