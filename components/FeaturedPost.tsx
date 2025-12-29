import Link from "next/link"
import { PostData } from "@/types"
import { formatDate } from "@/utils/formatDate"
import { ArrowRight } from "lucide-react"

interface FeaturedPostProps {
    post: PostData
}

export function FeaturedPost({ post }: FeaturedPostProps) {
    return (
        <div className="relative overflow-hidden rounded-2xl bg-neutral-900 text-white shadow-xl transition-all hover:shadow-2xl">
            <div className="absolute inset-0">
                {post.coverImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={post.coverImage}
                        alt={post.title}
                        className="h-full w-full object-cover opacity-50 transition-transform duration-500 hover:scale-105"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
            </div>

            <div className="relative flex h-[500px] flex-col justify-end p-8 md:p-12">
                <div className="max-w-2xl space-y-4">
                    <div className="flex items-center gap-2 text-sm text-neutral-300">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        {post.tags?.[0] && (
                            <>
                                <span>•</span>
                                <span className="uppercase tracking-wider">{post.tags[0]}</span>
                            </>
                        )}
                    </div>

                    <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                        <Link href={`/blog/${post.slug}`} className="hover:underline">
                            {post.title}
                        </Link>
                    </h1>

                    <p className="line-clamp-2 text-lg text-neutral-300 md:text-xl">
                        {post.excerpt}
                    </p>

                    <div className="pt-4">
                        <Link
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-200"
                        >
                            Read Article
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
