import Link from "next/link"
import { getAllTags } from "@/utils/getPosts"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Tags | AgileCoder Blog",
    description: "Browse all topics and tags on AgileCoder.",
}

import Breadcrumbs from "@/components/Breadcrumbs"

export default async function TagsPage() {
    const tags = getAllTags()

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <Breadcrumbs slug={["tags"]} />
            </div>
            <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
                <div className="flex-1 space-y-4">
                    <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
                        Tags
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Explore topics and categories across the blog.
                    </p>
                </div>
            </div>
            <hr className="my-8" />
            <div className="flex flex-wrap gap-4">
                {tags.map(([tag, count]) => {
                    const slug = tag.toLowerCase().replace(/ /g, "-")
                    return (
                        <Link
                            key={tag}
                            href={`/blog/tags/${slug}`}
                            className="group flex items-center justify-between rounded-md border bg-card px-4 py-2 transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                            <div className="flex flex-col">
                                <span className="font-semibold text-lg capitalize">{tag}</span>
                                <span className="text-sm text-muted-foreground">{count} posts</span>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
