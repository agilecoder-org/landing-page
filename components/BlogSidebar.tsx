import Link from "next/link"
import { Folder } from "lucide-react"

interface BlogSidebarProps {
    categories: string[]
    activeCategory?: string
}

export function BlogSidebar({ categories, activeCategory }: BlogSidebarProps) {
    // Filter for top-level categories only (no slashes)
    const rootCategories = categories.filter(c => !c.includes('/'))

    return (
        <aside className="space-y-6">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6">
                    <h3 className="font-semibold leading-none tracking-tight mb-4 flex items-center gap-2">
                        <Folder className="h-4 w-4" />
                        Categories
                    </h3>
                    <nav className="flex flex-col gap-1">
                        {rootCategories.map((category) => {
                            const isActive = activeCategory === category
                            return (
                                <Link
                                    key={category}
                                    href={`/blog/${category}`}
                                    className={`
                                        block px-3 py-2 rounded-md text-sm transition-colors capitalize
                                        ${isActive
                                            ? "bg-primary text-primary-foreground font-medium"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                        }
                                    `}
                                >
                                    {category.replace(/-/g, " ")}
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            </div>
        </aside>
    )
}
