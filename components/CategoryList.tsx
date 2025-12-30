import Link from "next/link"
import { PostData } from "@/types"
import { formatDate } from "@/utils/formatDate"
import { Tags } from "@/components/Tags"

interface CategoryListProps {
    posts: PostData[]
}

export default function CategoryList({ posts }: CategoryListProps) {
    return (
        <div className="grid gap-8">
            {posts.map((post) => (
                <article
                    key={post.slug}
                    className="group bg-card text-card-foreground rounded-xl border transition-all hover:shadow-lg overflow-hidden flex flex-col md:flex-row gap-6 md:items-start p-6"
                >
                    {post.coverImage && (
                        <div className="w-full md:w-1/3 aspect-video md:aspect-[4/3] relative overflow-hidden rounded-lg bg-muted flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={post.coverImage}
                                alt={post.title}
                                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                    )}

                    <div className="flex-1 flex flex-col h-full">
                        <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                            <time dateTime={post.date}>{formatDate(post.date)}</time>
                            {post.readingTime && (
                                <>
                                    <span>•</span>
                                    <span>{post.readingTime} min read</span>
                                </>
                            )}
                        </div>

                        <Link href={`/tech-blog/${post.slug}`} className="mb-3 block">
                            <h2 className="text-2xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors">
                                {post.title}
                            </h2>
                            <p className="text-muted-foreground line-clamp-2 md:line-clamp-3 leading-relaxed">
                                {post.excerpt}
                            </p>
                        </Link>

                        <div className="mt-auto flex items-center justify-between gap-4">
                            {post.tags && (
                                <div className="scale-90 origin-left -ml-1">
                                    <Tags tags={post.tags.slice(0, 2)} />
                                </div>
                            )}
                            <Link
                                href={`/tech-blog/${post.slug}`}
                                className="text-sm font-medium text-primary hover:underline whitespace-nowrap ml-auto"
                            >
                                Read article
                            </Link>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    )
}
