import Link from "next/link"
import { ArrowRight, Code, Terminal, Cpu, Globe } from "lucide-react"

// Define categories with icons and descriptions
// In a real app, this could come from a config or database
const categories = [
    {
        name: "Tech",
        slug: "tech",
        description: "Deep dives into software engineering.",
        icon: Terminal,
        color: "bg-blue-500",
    },
    {
        name: "React",
        slug: "tech/react",
        description: "Modern UI development with React.",
        icon: Code,
        color: "bg-cyan-500",
    },
    {
        name: "System Design",
        slug: "tech/system-design",
        description: "Architecture and scalability patterns.",
        icon: Cpu,
        color: "bg-purple-500",
    },
    {
        name: "Web Dev",
        slug: "tech/web",
        description: "Full-stack web development guides.",
        icon: Globe,
        color: "bg-green-500",
    },
]

export function CategoryGrid() {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
                <Link
                    key={category.slug}
                    href={`/blog/${category.slug}`}
                    className="group relative overflow-hidden rounded-xl border bg-background p-6 transition-all hover:bg-muted"
                >
                    <div className="flex flex-col justify-between h-full space-y-4">
                        <div className={`w-10 h-10 rounded-lg ${category.color} bg-opacity-10 flex items-center justify-center`}>
                            <category.icon className={`h-6 w-6 text-${category.color.split("-")[1]}-600`} />
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg">{category.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {category.description}
                            </p>
                        </div>

                        <div className="flex items-center text-sm font-medium text-foreground/60 transition-colors group-hover:text-foreground">
                            Explore
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}
