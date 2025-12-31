"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
interface BlogCardProps {
    blog: {
        name: string;
        description: string;
        category: string;
        slug: string;
        headerImg: string;
    };
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
    const router = useRouter();

    const showBlog = () => {
        router.push(`/code-and-art/blog/${blog.category}/${blog.slug}`);
    };

    return (
        <div className="border-[1px] p-2 bg-background/50 hover:bg-background/80 transition-colors">
            <div className="relative aspect-video w-full overflow-hidden">
                <Image
                    onClick={showBlog}
                    className="hover:cursor-pointer object-cover"
                    src={blog.headerImg}
                    fill
                    alt={`${blog.name} Header`}
                />
            </div>

            <div className="px-2">
                <h4
                    onClick={showBlog}
                    className="mt-2 text-xl font-medium hover:cursor-pointer hover:underline"
                >
                    {blog.name}
                </h4>
                <p className="line-clamp-3 font-light text-muted-foreground text-sm mt-1">{blog.description}</p>
                <div
                    onClick={showBlog}
                    className="mt-3 underline font-medium cursor-pointer w-fit text-sm"
                >
                    Read More
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
