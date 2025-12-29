import { notFound } from "next/navigation"
import { getPostBySlug, getAllPosts, getPostsByCategory, getAllCategories } from "@/utils/getPosts"


import { Metadata } from "next"
import CategoryList from "@/components/CategoryList"
import Breadcrumbs from "@/components/Breadcrumbs"
import { MDX } from "@/components/mdx-components"
import { formatDate } from "@/utils/formatDate"
import Link from "next/link"
import { ArrowLeft, Clock, Calendar, User } from "lucide-react"
import { getHeadings } from "@/utils/getHeadings"
import { TableOfContents } from "@/components/TableOfContents"
import { Tags } from "@/components/Tags"
import { BlogSidebar } from "@/components/BlogSidebar"

interface Params {
    params: {
        slug: string[]
    }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const slugPath = params.slug.join("/")

    // Check if it's a post
    const post = getPostBySlug(params.slug, [
        "title",
        "excerpt",
        "coverImage",
        "slug",
    ])

    if (post) {
        const baseUrl = "https://www.agilecoder.in"
        const postUrl = `${baseUrl}/blog/${post.slug}`
        const imageUrl = post.coverImage
            ? `${baseUrl}${post.coverImage}`
            : `${baseUrl}/default-og.jpg`

        return {
            title: `${post.title} | AgileCoder`,
            description: post.excerpt || "Read the latest insights on AgileCoder.",
            alternates: {
                canonical: postUrl,
            },
            openGraph: {
                title: `${post.title} | AgileCoder`,
                description: post.excerpt,
                url: postUrl,
                siteName: "AgileCoder",
                type: "article",
                locale: "en_US",
                images: [
                    {
                        url: imageUrl,
                        width: 1200,
                        height: 630,
                        alt: post.title,
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                title: `${post.title} | AgileCoder`,
                description: post.excerpt,
                images: [imageUrl],
                creator: "@agilecoder_in",
            },
        }
    }

    // Check if it's a category
    const categoryPosts = getPostsByCategory(slugPath)
    if (categoryPosts.length > 0) {
        const categoryName = params.slug[params.slug.length - 1]
        const title = categoryName.charAt(0).toUpperCase() + categoryName.slice(1).replace(/-/g, " ")

        return {
            title: `${title} | AgileCoder Blog`,
            description: `Articles in category ${title}`,
            openGraph: {
                title: `${title} | AgileCoder Blog`,
                description: `Browse articles in ${title}`,
            }
        }
    }

    return {
        title: "Not Found | AgileCoder",
    }
}

export default async function BlogEntry({ params }: Params) {
    const slugPath = params.slug.join("/")

    // 1. Try to find a post
    const post = getPostBySlug(params.slug, [
        "title",
        "date",
        "slug",
        "author",
        "content",
        "coverImage",
        "excerpt",
        "readingTime",
        "tags"
    ])

    if (post) {
        const headings = getHeadings(post.content)

        return (
            <div className="min-h-screen bg-background">
                <div className="container max-w-7xl mx-auto px-4 py-8 lg:py-12">
                    <div className="grid grid-cols-1 gap-10 xl:grid-cols-[1fr_300px]">
                        {/* Main Content */}
                        <article className="prose dark:prose-invert max-w-none">
                            <div className="mb-4 text-sm text-muted-foreground">
                                <Breadcrumbs slug={params.slug} />
                            </div>

                            <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    {formatDate(post.date)}
                                </div>
                                {post.author && (
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        {post.author}
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    {post.readingTime || Math.ceil(post.content.split(/\s+/).length / 200)} min read
                                </div>
                            </div>

                            {post.tags && (
                                <div className="mb-8 not-prose">
                                    <Tags tags={post.tags} />
                                </div>
                            )}

                            {post.coverImage && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={post.coverImage}
                                    alt={post.title}
                                    className="rounded-xl border bg-muted w-full aspect-video object-cover mb-10 shadow-sm"
                                />
                            )}

                            <MDX code={post.content} />
                        </article>

                        {/* Sidebar */}
                        <aside className="hidden xl:block">
                            <div className="sticky top-10 space-y-8">
                                <TableOfContents headings={headings} />
                            </div>
                        </aside>
                    </div>

                    <hr className="mt-12" />
                    <div className="flex justify-center py-6 lg:py-10">
                        <Link
                            href="/blog"
                            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground"
                        >
                            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            See all posts
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    // 2. Try to find a category
    const posts = getPostsByCategory(slugPath, [
        "title",
        "date",
        "slug",
        "excerpt",
        "coverImage",
        "readingTime",
        "tags"
    ])

    if (posts.length > 0) {
        // Determine active category from the first segment of the slug
        const activeCategory = params.slug[0]

        return (
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <Breadcrumbs slug={params.slug} />
                </div>

                <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8 mb-8">
                    <div className="space-y-1">
                        <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl capitalize">
                            {slugPath.split("/").pop()?.replace(/-/g, " ")}
                        </h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_280px]">
                    <div className="space-y-8">
                        <CategoryList posts={posts} />
                    </div>
                    <div className="lg:sticky lg:top-10 h-fit">
                        <BlogSidebar categories={getAllCategories()} activeCategory={activeCategory} />
                    </div>
                </div>
            </div>
        )
    }

    return notFound()
}

export async function generateStaticParams() {
    const posts = getAllPosts(["slug"])
    return posts.map((post) => ({
        slug: post.slug.split("/"),
    }))
}
