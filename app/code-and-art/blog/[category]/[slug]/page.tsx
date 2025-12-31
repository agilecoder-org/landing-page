import Blog from "@/components/code-and-art/BlogPage/Blog";
import { sketchIndex } from "@/lib/code-and-art/data";
import { getArtBlogContent } from "@/utils/content";
import { MDX } from "@/components/mdx-components";
import { notFound } from "next/navigation";
import { SocialsBanner } from "@/components/SocialsBanner";
import ImprovedFooter from "@/components/Footer";

type Props = {
    params: Promise<{ category: string; slug: string }>
}

export async function generateMetadata(
    { params }: Props
) {
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

export default async function BlogPage({ params }: Props) {
    const { category, slug } = await params;

    const sketch = sketchIndex.find(
        (item) => item.slug === slug && item.category === category
    );

    const content = getArtBlogContent(category, slug);

    if (!sketch) {
        return notFound();
    }

    return (
        <>
            <Blog slug={slug} category={category}>
                <article className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground prose-a:text-primary mb-12">
                    {content ? (
                        <MDX code={content} />
                    ) : (
                        <p>Content coming soon...</p>
                    )}
                    <SocialsBanner />
                </article>
            </Blog>
            <ImprovedFooter />
        </>
    );
}
