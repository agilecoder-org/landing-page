"use client";
import React from 'react';
import BackButton from '@/components/BackButton';
import RenderSketch from './RenderSketch';
import RenderSimilarBlogs from './RenderSimilarBlogs';
import { Blog as BlogType } from '@/types/Blog';
import { sketchIndex } from '@/lib/code-and-art/data';

interface BlogProps {
    slug: string;
    category: string;
    children: React.ReactNode;
}

const Blog: React.FC<BlogProps> = ({ slug, category, children }) => {
    const sketch = sketchIndex.find((item) => item.slug === slug && item.category === category);

    if (!sketch) {
        return null;
    }

    return (
        <div className="flex justify-center pt-12 pb-24 min-h-screen bg-background text-foreground">
            <div className="max-w-[1200px] w-full px-4 md:px-8">
                <div className="mb-8">
                    <BackButton />
                </div>

                <h1 className="md:text-5xl text-3xl mt-5 font-bold leading-tight tracking-tight">{sketch.name}</h1>
                <p className="text-xl mt-4 text-muted-foreground leading-relaxed">{sketch.description}</p>

                <RenderSketch slug={slug} />

                <div className='my-8 p-6 bg-muted/30 rounded-lg border border-border'>
                    <p className='font-semibold text-lg mb-4'>Controls:</p>
                    <ul className='ml-5 list-disc space-y-2 text-muted-foreground'>
                        <li><span className='font-medium text-foreground'>Download</span> capture by clicking the download button.</li>
                        <li><span className='font-medium text-foreground'>Zoom</span> using the +/- buttons or reset with the center button.</li>
                        <li><span className='font-medium text-foreground'>Restart</span> animations with the reload button.</li>
                        <li><span className='font-medium text-foreground'>Interact</span> via the controls panel on the right.</li>
                    </ul>
                </div>

                {/* Server-rendered MDX content passed as children */}
                {children}

                <RenderSimilarBlogs slugs={sketch.similar || []} />
            </div>
        </div>
    );
};

export default Blog;
