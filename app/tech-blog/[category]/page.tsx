import { notFound, redirect } from "next/navigation"
import { getPageBySlug, getAllPages, getPostBySlug, getThreadBySlug } from "@/utils/content"
import { Metadata } from "next"
import Link from "next/link"
import CategoryList from "@/components/CategoryList"
import { MDX } from "@/components/mdx-components"
import { PostData, ThreadData } from "@/types"

interface Params {
    params: {
        category: string
    }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const page = getPageBySlug(params.category)

    if (page) {
        return {
            title: `${page.title} | AgileCoder`,
            description: page.description,
        }
    }

    // Check if it's a legacy post URL
    const post = getPostBySlug(params.category)
    if (post) {
        return {
            title: `${post.title} | AgileCoder`,
            description: post.excerpt,
        }
    }

    return {
        title: "Not Found | AgileCoder",
    }
}

export default async function CategoryPage({ params }: Params) {
    const page = getPageBySlug(params.category)

    if (!page) {
        // Fallback: Check if it's a post (Legacy URL support)
        // If the user visits /tech-blog/some-post-slug, we check if it exists in posts.
        // If so, redirect to /tech-blog/posts/some-post-slug
        const post = getPostBySlug(params.category)
        if (post) {
            redirect(`/tech-blog/posts/${params.category}`)
        }

        return notFound()
    }

    // Resolve featured posts
    const featuredPosts: PostData[] = []
    if (page.featuredPosts) {
        page.featuredPosts.forEach(slug => {
            const post = getPostBySlug(slug)
            if (post) featuredPosts.push(post)
        })
    }

    // Resolve featured threads
    const featuredThreads: ThreadData[] = []
    if (page.featuredThreads) {
        page.featuredThreads.forEach(slug => {
            const thread = getThreadBySlug(slug)
            if (thread) featuredThreads.push(thread)
        })
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 lg:py-12">
                <div className="mb-8 text-sm text-muted-foreground">
                    <Link href="/tech-blog" className="hover:underline">Tech Blog</Link> / <span className="text-foreground">{page.title}</span>
                </div>

                <div className="max-w-4xl space-y-6 mb-12">
                    <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">{page.title}</h1>
                    <div className="prose dark:prose-invert max-w-none text-lg text-muted-foreground">
                        <MDX code={page.content} />
                    </div>
                </div>

                {featuredThreads.length > 0 && (
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold mb-6">Featured Threads</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {featuredThreads.map(thread => (
                                <Link key={thread.slug} href={`/tech-blog/threads/${thread.slug}`} className="group block border rounded-xl p-6 hover:shadow-lg transition-all bg-card">
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{thread.title}</h3>
                                    <p className="text-muted-foreground">{thread.description}</p>
                                    <div className="mt-4 text-sm font-medium text-primary">
                                        View Series ({thread.posts.length} posts) &rarr;
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {featuredPosts.length > 0 && (
                    <div className="space-y-8">
                        <h2 className="text-2xl font-bold">Curated Posts</h2>
                        <CategoryList posts={featuredPosts} />
                    </div>
                )}
            </div>
        </div>
    )
}

export async function generateStaticParams() {
    const pages = getAllPages()
    return pages.map((page) => ({
        category: page.slug,
    }))
}
