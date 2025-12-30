import { getAllTags, getPostsByTag, getAllPages } from "@/utils/content"
import CategoryList from "@/components/CategoryList"
import { BlogSidebar } from "@/components/BlogSidebar"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import Breadcrumbs from "@/components/Breadcrumbs"

interface Params {
    params: {
        tag: string
    }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const tag = params.tag
    const title = tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, " ")

    return {
        title: `${title} | AgileCoder Blog`,
        description: `Articles tagged with ${title}`,
    }
}

export default async function TagPage({ params }: Params) {
    const posts = getPostsByTag(params.tag.replace(/-/g, " "))

    if (!posts.length) {
        return notFound()
    }

    const pages = getAllPages()

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <Breadcrumbs slug={["tags", params.tag]} />
            </div>

            <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8 mb-8">
                <div className="space-y-1">
                    <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl capitalize">
                        {params.tag.replace(/-/g, " ")}
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Posts tagged with {params.tag.replace(/-/g, " ")}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_280px]">
                <div className="space-y-8">
                    <CategoryList posts={posts} />
                </div>
                <div className="lg:sticky lg:top-10 h-fit">
                    <BlogSidebar categories={pages.map(p => ({ title: p.title, slug: p.slug }))} />
                </div>
            </div>
        </div>
    )
}

export async function generateStaticParams() {
    const tags = getAllTags()
    return tags.map(([tag]) => ({
        tag: tag.replace(/ /g, "-"),
    }))
}
