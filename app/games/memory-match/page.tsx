import Footer from "@/components/Footer"
import MemoryGameManager from "@/components/games/memory-match/MemoryGameManager"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Memory Match | AgileCoder Games",
    description: "Test your memory with our colorful card matching game.",
}

export default function MemoryMatchPage() {
    return (
        <main className="min-h-screen bg-background text-foreground px-4 py-8 font-sans">
            <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <h1 className="text-2xl font-bold tracking-tight mb-6 text-foreground">
                    Memory Match
                </h1>

                <div className="w-full mb-20">
                    <MemoryGameManager />
                </div>
            </div>

            <Footer />
        </main>
    )
}
