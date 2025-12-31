"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { sketchIndex } from '@/lib/code-and-art/data';
import BackButton from '@/components/BackButton';
import RenderMarkdown from './RenderMarkdown';
import RenderSketch from './RenderSketch';
import RenderSimilarBlogs from './RenderSimilarBlogs';
import { Sketch, Blog as BlogType } from '@/types/Blog';

const Blog: React.FC = () => {
    const params = useParams();

    // Handle potential undefined params by defaulting to empty string or handling conditionally
    const slugParam = params?.slug;
    const categoryParam = params?.category;

    const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
    const category = Array.isArray(categoryParam) ? categoryParam[0] : categoryParam;

    const [sketch, setSketch] = useState<BlogType | null>(null);

    useEffect(() => {
        if (slug && category) {
            const currSketch = sketchIndex.find(
                (item) => item.slug === slug && item.category === category
            );
            setSketch(currSketch || null);
        }
    }, [slug, category]);

    if (!slug || !category) {
        return <div className="min-h-screen pt-24 flex justify-center">Loading parameters...</div>;
    }

    return (
        <div className="flex justify-center py-24 min-h-screen bg-background text-foreground">
            <div className="max-w-[1200px] w-full px-4 md:px-8">
                <div className="mb-8">
                    <BackButton />
                </div>
                {sketch ? (
                    <>
                        <h1 className="md:text-5xl text-3xl mt-5 font-bold leading-tight tracking-tight">{sketch.name}</h1>
                        <p className="text-xl mt-4 text-muted-foreground leading-relaxed max-w-3xl">{sketch.description}</p>

                        <h2 className='md:text-3xl text-2xl mt-12 mb-6 font-semibold'>Interactive Demo</h2>
                        <RenderSketch slug={slug} />

                        <div className='mt-8 p-6 bg-muted/30 rounded-lg border border-border'>
                            <p className='font-semibold text-lg mb-4'>Controls:</p>
                            <ul className='ml-5 list-disc space-y-2 text-muted-foreground'>
                                <li><span className='font-medium text-foreground'>Download</span> capture by clicking the download button.</li>
                                <li><span className='font-medium text-foreground'>Zoom</span> using the +/- buttons or reset with the center button.</li>
                                <li><span className='font-medium text-foreground'>Restart</span> animations with the reload button.</li>
                                {/* Note: Dragging might be specific to implementation, keeping it generic if unsure */}
                                <li><span className='font-medium text-foreground'>Interact</span> via the controls panel on the right.</li>
                            </ul>
                        </div>

                        <RenderMarkdown slug={slug} category={category} className="mt-12" />
                        <RenderSimilarBlogs slugs={sketch.similar || []} />
                    </>
                ) : (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-semibold">Blog not found</h2>
                        <p className="text-muted-foreground mt-2">No sketch available for this category and slug.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
