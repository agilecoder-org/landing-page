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
        <div className="my-5 grid grid-cols-1 border-[1px] md:grid-cols-5">
            <div className="overflow-hidden relative mx-[-10px] md:mx-[0px] md:col-span-3 max-h-[520px] flex flex-col justify-center items-center">
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

                        <div className="absolute bottom-0 bg-white bg-opacity-80 left-0 p-4">
                            <div className="flex w-[100px] justify-between items-center text-black">
                                <ZoomIn onClick={() => currentSketch.zoomIn?.()} className="h-6 w-6 cursor-pointer" />
                                <Maximize onClick={() => currentSketch.resetZoom?.()} className="h-6 w-6 cursor-pointer" />
                                <ZoomOut onClick={() => currentSketch.zoomOut?.()} className="h-6 w-6 cursor-pointer" />
                            </div>
                        </div>

                        <div className="absolute bottom-0 flex w-[100px] justify-between items-center right-0 bg-white bg-opacity-80 p-4 text-black">
                            <RefreshCw onClick={() => currentSketch.resetSketch?.(P5ref as any)} className="h-8 w-8 cursor-pointer" />
                            <Download onClick={() => downloadImage()} className="h-6 w-6 cursor-pointer" />
                        </div>
                    </>
                ) : (
                    <p>No sketch available for this slug.</p>
                )}
            </div>

            <div id="controls" className="md:mx-[-10px] md:col-span-2 flex flex-col justify-between md:min-h-[400px] w-[100%] p-5 text-foreground">
                <div>
                    <h3 className="text-[1.5rem] font-medium mb-3">Play with it!</h3>
                    <div className="flex flex-col mt-5" id="interactions" />
                    <div id="slider" />
                </div>
            </div>
        </div>
    );
};

export default RenderSketch;
