import React from 'react';
import { sketchIndex } from '@/lib/code-and-art/data';
import BlogCard from '@/components/code-and-art/BlogPage/BlogCard';
import BackButton from '@/components/BackButton';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Blog | Artful Coding',
    description: 'Explore the collection of generative art and creative coding articles.',
};

export default async function BlogListingPage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string }>
}) {
    const { category } = await searchParams;

    const filteredBlogs = category
        ? sketchIndex.filter(blog => blog.category.toLowerCase() === category.toLowerCase())
        : sketchIndex;

    const title = category
        ? `${category.charAt(0).toUpperCase() + category.slice(1)}`
        : 'Blog';

    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col">
            <div className="flex-1 w-full max-w-[1200px] mx-auto px-4 md:px-8 py-24">
                <div className="mb-8">
                    <BackButton />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
                <p className="text-xl text-muted-foreground mb-12 max-w-2xl">
                    Discover tutorials, case studies, and deep dives into the world of creative coding, fractals, and algorithms.
                </p>

                {filteredBlogs.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {filteredBlogs.map((blog) => (
                            <BlogCard
                                key={`${blog.category}-${blog.slug}`}
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
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center border rounded-lg bg-muted/20">
                        <h2 className="text-3xl font-semibold mb-3">Coming Soon</h2>
                        <p className="text-muted-foreground max-w-md">
                            We haven't published any articles in the <strong>{category}</strong> category yet.
                            Check back soon or explore our other topics!
                        </p>
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
}
