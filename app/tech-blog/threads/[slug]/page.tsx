import { notFound } from "next/navigation"
import { getThreadBySlug, getAllThreads, getPostsForThread } from "@/utils/content"
import { Metadata } from "next"
import Link from "next/link"
import { MDX } from "@/components/mdx-components"
import { ArrowRight, BookOpen } from "lucide-react"

interface Params {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const thread = getThreadBySlug(params.slug)

    if (thread) {
        return {
            title: `${thread.title} | AgileCoder Thread`,
            description: thread.description,
        }
    }

    return {
        title: "Not Found | AgileCoder",
    }
}

export default async function ThreadPage({ params }: Params) {
    const thread = getThreadBySlug(params.slug)

    if (!thread) {
        return notFound()
    }

    const posts = getPostsForThread(params.slug)

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 lg:py-12">
                <div className="mb-8 text-sm text-muted-foreground">
                    <Link href="/tech-blog" className="hover:underline">Tech Blog</Link> / <span className="text-muted-foreground">Threads</span> / <span className="text-foreground">{thread.title}</span>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 text-primary mb-6">
                            <BookOpen className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4">{thread.title}</h1>
                        <p className="text-xl text-muted-foreground mb-8">{thread.description}</p>
                        <div className="prose dark:prose-invert max-w-none mx-auto text-left">
                            <MDX code={thread.content} />
                        </div>
                    </div>

                    <div className="relative border-l-2 border-muted pl-8 ml-4 md:ml-12 space-y-12">
                        {posts.map((post, index) => (
                            <div key={post.slug} className="relative">
                                <span className="absolute -left-[41px] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium ring-4 ring-background">
                                    {index + 1}
                                </span>
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-bold">{post.title}</h3>
                                    <p className="text-muted-foreground">{post.excerpt}</p>
                                    <Link
                                        href={`/tech-blog/posts/${post.slug}`}
                                        className="inline-flex items-center text-primary font-medium hover:underline group"
                                    >
                                        Read Chapter <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function generateStaticParams() {
    const threads = getAllThreads()
    return threads.map((thread) => ({
        slug: thread.slug,
    }))
}
