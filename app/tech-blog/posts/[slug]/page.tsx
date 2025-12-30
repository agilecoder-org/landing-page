import { notFound } from "next/navigation"
import { getPostBySlug, getAllPosts } from "@/utils/content"
import { Metadata } from "next"
import { MDX } from "@/components/mdx-components"
import { formatDate } from "@/utils/formatDate"
import Link from "next/link"
import { ArrowLeft, Clock, Calendar, User } from "lucide-react"
import { getHeadings } from "@/utils/getHeadings"
import { TableOfContents } from "@/components/TableOfContents"
import { Tags } from "@/components/Tags"

interface Params {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const post = getPostBySlug(params.slug)

    if (post) {
        const baseUrl = "https://www.agilecoder.in"
        const postUrl = `${baseUrl}/tech-blog/posts/${post.slug}`
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

    return {
        title: "Not Found | AgileCoder",
    }
}

export default async function BlogEntry({ params }: Params) {
    const post = getPostBySlug(params.slug)

    if (!post) {
        return notFound()
    }

    const headings = getHeadings(post.content)

    return (
        <div className="min-h-screen bg-background">
            <div className="container max-w-7xl mx-auto px-4 py-8 lg:py-12">
                <div className="grid grid-cols-1 gap-10 xl:grid-cols-[1fr_300px]">
                    {/* Main Content */}
                    <article className="prose dark:prose-invert max-w-none">
                        <div className="mb-4 text-sm text-muted-foreground">
                            <Link href="/tech-blog" className="hover:underline">Tech Blog</Link> / <span className="text-foreground">{post.title}</span>
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
                        href="/tech-blog"
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

export async function generateStaticParams() {
    const posts = getAllPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}
