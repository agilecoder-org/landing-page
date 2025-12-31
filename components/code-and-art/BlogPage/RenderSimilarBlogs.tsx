import React, { useEffect, useState } from 'react';
import { sketchIndex } from '@/lib/code-and-art/data';
import BlogCard from './BlogCard';
import { Blog } from '@/types/Blog';

interface RenderSimilarBlogsProps {
    slugs: string[];
}

const RenderSimilarBlogs: React.FC<RenderSimilarBlogsProps> = ({ slugs = [] }) => {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    const getBlogs = () => {
        // Filter out strings that might not have matches (though type says they are unsafe strings, we match by slug)
        const data = sketchIndex.filter((blog: Blog) => slugs.includes(blog.slug));
        setBlogs(data);
    };

    useEffect(() => {
        getBlogs();
    }, [slugs]);

    return (
        <>
            {slugs.length !== 0 && (
                <div className="mt-16 border-t border-border pt-8">
                    <h2 className="text-3xl mb-8 font-semibold">Similar Articles</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                        {blogs.map((blog: Blog) => (
                            <BlogCard
                                key={blog.slug}
                                blog={{
                                    name: blog.name,
                                    description: blog.description,
                                    category: blog.category,
                                    slug: blog.slug,
                                    headerImg: blog.headerImg
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default RenderSimilarBlogs;
