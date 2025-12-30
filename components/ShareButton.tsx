"use client"

import { useState } from "react"
import { Share2, Link as LinkIcon, Linkedin, Twitter, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface ShareButtonProps {
    title: string
    url?: string // Optional, defaults to current window location
}

export function ShareButton({ title, url }: ShareButtonProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [copied, setCopied] = useState(false)

    const getUrl = () => {
        if (typeof window !== "undefined") {
            return url || window.location.href
        }
        return ""
    }

    const shareLinks = [
        {
            name: "Twitter",
            icon: Twitter,
            onClick: () => {
                const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(getUrl())}`
                window.open(shareUrl, "_blank")
            }
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            onClick: () => {
                const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getUrl())}`
                window.open(shareUrl, "_blank")
            }
        },
        {
            name: "Copy Link",
            icon: copied ? Check : LinkIcon,
            onClick: async () => {
                try {
                    await navigator.clipboard.writeText(getUrl())
                    setCopied(true)
                    setTimeout(() => setCopied(false), 2000)
                } catch (err) {
                    console.error("Failed to copy", err)
                }
            }
        }
    ]

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Share post"
            >
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Share</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 top-8 z-50 min-w-[150px] rounded-xl border bg-popover p-2 shadow-lg"
                        >
                            <div className="flex flex-col gap-1">
                                {shareLinks.map((link) => (
                                    <button
                                        key={link.name}
                                        onClick={() => {
                                            link.onClick()
                                            if (link.name !== "Copy Link") setIsOpen(false)
                                        }}
                                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors text-left"
                                    >
                                        <link.icon className={cn("h-4 w-4", link.name === "Copy Link" && copied && "text-green-500")} />
                                        {link.name}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
