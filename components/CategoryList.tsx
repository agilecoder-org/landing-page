import Link from "next/link"
import { PostData } from "@/types"
import { formatDate } from "@/utils/formatDate"
import { Tags } from "@/components/Tags"
import { ImageIcon } from "lucide-react"

interface CategoryListProps {
    posts: PostData[]
}

export default function CategoryList({ posts }: CategoryListProps) {
    return (
        <div className="grid gap-6">
            {posts.map((post) => (
                <article
                    key={post.slug}
                    className="group bg-card text-card-foreground rounded-lg border transition-all hover:shadow-md overflow-hidden flex flex-col md:flex-row gap-4 h-full"
                >
                    <div className="w-full md:w-64 aspect-video md:aspect-[4/3] relative overflow-hidden bg-muted flex-shrink-0">
                        <img
                            src={post.coverImage || "/default-og.png"}
                            alt={post.title}
                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>

                    <div className="flex-1 flex flex-col p-4 md:p-6 md:pl-0">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                            <time dateTime={post.date}>{formatDate(post.date)}</time>
                            {post.readingTime && (
                                <>
                                    <span>•</span>
                                    <span>{post.readingTime} min read</span>
                                </>
                            )}
                        </div>

                        <Link href={`/tech-blog/posts/${post.slug}`} className="mb-2 block flex-grow">
                            <h2 className="text-xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                {post.title}
                            </h2>
                            <p className="text-muted-foreground text-sm line-clamp-2 md:line-clamp-3 leading-relaxed">
                                {post.excerpt}
                            </p>
                        </Link>

                        <div className="mt-4 flex items-center justify-between gap-4">
                            {post.tags && (
                                <div className="scale-[0.85] origin-left -ml-1">
                                    <Tags tags={post.tags.slice(0, 3)} />
                                </div>
                            )}
                        </div>
                    </div>
                </article>
            ))}
        </div>
    )
}
