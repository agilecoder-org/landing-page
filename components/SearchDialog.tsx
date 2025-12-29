"use client"

import * as React from "react"
import { Command } from "cmdk"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

interface SearchDialogProps {
    posts: Array<{
        title: string
        slug: string
        excerpt?: string
    }>
}

export function SearchDialog({ posts }: SearchDialogProps) {
    const [open, setOpen] = React.useState(false)
    const router = useRouter()

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false)
        command()
    }, [])

    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24">
            <div
                className="fixed inset-0 bg-background/80 backdrop-blur-sm"
                onClick={() => setOpen(false)}
            />
            <div className="relative w-full max-w-lg overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-2xl">
                <Command className="w-full">
                    <div className="flex items-center border-b px-3">
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                        <Command.Input
                            placeholder="Search articles..."
                            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <Command.List className="max-h-[300px] overflow-y-auto p-2">
                        <Command.Empty className="py-6 text-center text-sm">No results found.</Command.Empty>
                        <Command.Group heading="Articles">
                            {posts.map((post) => (
                                <Command.Item
                                    key={post.slug}
                                    onSelect={() => {
                                        runCommand(() => router.push(`/blog/${post.slug}`))
                                    }}
                                    className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                                >
                                    <div className="flex flex-col">
                                        <span className="font-medium">{post.title}</span>
                                        <span className="text-xs text-muted-foreground line-clamp-1">{post.excerpt}</span>
                                    </div>
                                </Command.Item>
                            ))}
                        </Command.Group>
                    </Command.List>
                </Command>
            </div>
        </div>
    )
}
