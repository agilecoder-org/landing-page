"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TableOfContentsProps {
    headings: {
        id: string
        text: string
        level: number
    }[]
}

export function TableOfContents({ headings }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>("")

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            { rootMargin: "0% 0% -80% 0%" }
        )

        headings.forEach((heading) => {
            const element = document.getElementById(heading.id)
            if (element) observer.observe(element)
        })

        return () => observer.disconnect()
    }, [headings])

    if (!headings?.length) return null

    return (
        <div className="text-sm">
            <h4 className="font-bold mb-4 text-foreground">On this page</h4>
            <ul className="space-y-2.5">
                {headings.map((heading) => (
                    <li key={heading.id} style={{ paddingLeft: `${(heading.level - 2) * 16}px` }}>
                        <a
                            href={`#${heading.id}`}
                            className={cn(
                                "block transition-colors line-clamp-1 hover:text-foreground",
                                activeId === heading.id
                                    ? "text-foreground font-semibold"
                                    : "text-muted-foreground"
                            )}
                            onClick={(e) => {
                                e.preventDefault()
                                document.getElementById(heading.id)?.scrollIntoView({
                                    behavior: "smooth",
                                })
                            }}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
