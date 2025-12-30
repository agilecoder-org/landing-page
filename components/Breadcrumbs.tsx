import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbsProps {
    slug: string[]
}

export default function Breadcrumbs({ slug }: BreadcrumbsProps) {
    return (
        <nav className="flex items-center text-sm text-muted-foreground overflow-x-auto whitespace-nowrap pb-2">
            <Link
                href="/tech-blog"
                className="flex items-center hover:text-foreground transition-colors"
            >
                <Home className="w-4 h-4 mr-1" />
                Tech Blog
            </Link>

            {slug.map((segment, index) => {
                const path = `/tech-blog/${slug.slice(0, index + 1).join("/")}`
                const isLast = index === slug.length - 1

                return (
                    <div key={path} className="flex items-center">
                        <ChevronRight className="w-4 h-4 mx-1 text-muted-foreground" />
                        {isLast ? (
                            <span className="font-medium text-foreground capitalize">
                                {segment.replace(/-/g, " ")}
                            </span>
                        ) : (
                            <Link
                                href={path}
                                className="hover:text-foreground transition-colors capitalize"
                            >
                                {segment.replace(/-/g, " ")}
                            </Link>
                        )}
                    </div>
                )
            })}
        </nav>
    )
}
