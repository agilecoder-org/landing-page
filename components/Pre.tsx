"use client"

import { useState, useRef } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

export function Pre({ className, children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
    const preRef = useRef<HTMLPreElement>(null)
    const [isCopied, setIsCopied] = useState(false)

    const onCopy = async () => {
        if (!preRef.current) return

        // clone the element to exclude line numbers if they exist (optional, mostly for safety)
        // For now, simpler approach: just get textContent.
        // If we need to exclude line numbers in future, we can filter them here.
        const code = preRef.current.textContent || ""

        await navigator.clipboard.writeText(code)
        setIsCopied(true)

        setTimeout(() => {
            setIsCopied(false)
        }, 2000)
    }

    return (
        <div className="relative group">
            <pre
                ref={preRef}
                className={cn(
                    "mb-4 mt-6 overflow-x-auto rounded-xl border bg-muted/50 py-4 px-4 not-prose text-sm",
                    className
                )}
                {...props}
            >
                {children}
            </pre>
            <button
                onClick={onCopy}
                className={cn(
                    "absolute right-3 top-3 p-2 rounded-lg bg-background/50 text-muted-foreground backdrop-blur-sm transition-all",
                    "opacity-0 group-hover:opacity-100 focus:opacity-100 hover:text-foreground hover:bg-background/80"
                )}
                aria-label="Copy code"
            >
                {isCopied ? (
                    <Check className="h-4 w-4 text-green-500" />
                ) : (
                    <Copy className="h-4 w-4" />
                )}
            </button>
        </div>
    )
}
