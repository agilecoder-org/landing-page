import Blog from "@/components/code-and-art/BlogPage/Blog";
import { sketchIndex } from "@/lib/code-and-art/data";
import { Suspense } from "react";
import { Metadata } from "next";

type Props = {
    params: Promise<{ category: string; slug: string }>
}

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    // read route params
    const { category, slug } = await params

    const sketch = sketchIndex.find(
        (item) => item.slug === slug && item.category === category
    );

    return {
        title: sketch ? `${sketch.name} | Agile Coder` : "Blog | Agile Coder",
        description: sketch
            ? sketch.description
            : "Explore unique generative art and coding creativity.",
        keywords: sketch ? [sketch.name, "generative art", "creative coding"] : ["creative coding"],
        openGraph: {
            title: sketch ? `${sketch.name} | Agile Coder` : "Blog | Agile Coder",
            description: sketch
                ? sketch.description
                : "Explore unique generative art and coding creativity.",
            siteName: "Agile Coder Code & Art",
            images: [
                {
                    url: sketch?.headerImg || "",
                    width: 1280,
                    height: 720,
                    alt: sketch ? sketch.name : "Agile Coder Blog",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            creator: "@__iamsmruti",
        },
    };
}

export default function BlogPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <Blog />
        </Suspense>
    );
}
