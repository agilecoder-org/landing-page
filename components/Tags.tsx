import Link from "next/link"
import { cn } from "@/lib/utils"

interface TagsProps {
    tags: string[]
    className?: string
}

export function Tags({ tags, className }: TagsProps) {
    if (!tags?.length) return null

    return (
        <div className={cn("flex flex-wrap gap-2", className)}>
            {tags.map((tag) => {
                const slug = tag.toLowerCase().replace(/ /g, "-")
                return (
                    <Link
                        key={tag}
                        href={`/blog/tags/${slug}`}
                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    >
                        {tag}
                    </Link>
                )
            })}
        </div>
    )
}
