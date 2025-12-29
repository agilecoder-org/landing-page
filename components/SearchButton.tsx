"use client"

import { Search } from "lucide-react"

export function SearchButton() {
    return (
        <button
            onClick={() => {
                document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))
            }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-110 active:scale-95"
            aria-label="Open search"
        >
            <Search className="h-6 w-6" />
        </button>
    )
}
