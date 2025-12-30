import Link from "next/link"
import { Folder } from "lucide-react"

interface CategoryLink {
    title: string
    slug: string
}

interface BlogSidebarProps {
    categories: CategoryLink[]
    activeCategory?: string // This should match the slug
}

export function BlogSidebar({ categories, activeCategory }: BlogSidebarProps) {
    return (
        <aside className="space-y-6">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6">
                    <h3 className="font-semibold leading-none tracking-tight mb-4 flex items-center gap-2">
                        <Folder className="h-4 w-4" />
                        Topics
                    </h3>
                    <nav className="flex flex-col gap-1">
                        {categories.map((category) => {
                            const isActive = activeCategory === category.slug
                            return (
                                <Link
                                    key={category.slug}
                                    href={`/tech-blog/${category.slug}`}
                                    className={`
                                        block px-3 py-2 rounded-md text-sm transition-colors capitalize
                                        ${isActive
                                            ? "bg-primary text-primary-foreground font-medium"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                        }
                                    `}
                                >
                                    {category.title}
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            </div>
        </aside>
    )
}
