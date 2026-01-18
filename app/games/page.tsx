import Link from "next/link"
import Footer from "@/components/Footer"
import { Metadata } from "next"
import { Gamepad2, Brain } from "lucide-react"

export const metadata: Metadata = {
    title: "Games Arcade | AgileCoder",
    description: "Play developer-focused mini-games.",
}

export default function GamesPage() {
    const games = [
        {
            name: "Secrets of the Sands",
            description: "Uncover ancient hieroglyphs in this memory matching expedition. Single player archaeological adventure.",
            href: "/games/memory-match",
            icon: <Brain className="relative w-12 h-12 text-primary mb-6" />
        },
        // {
        //     name: "Tic Tac Toe",
        //     description: "Play Tic Tac Toe against the computer or another player.",
        //     href: "/games/tic-tac-toe",
        //     icon: <Gamepad2 className="relative w-12 h-12 text-primary mb-6" />
        // }
    ]
    return (
        <main className="min-h-screen bg-background text-foreground px-4 py-8 font-sans">
            <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <h1 className="text-2xl font-bold tracking-tight mb-6 text-foreground">
                    Games Arcade
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto mb-20">
                    {games.map((game) => (
                        <Link
                            key={game.name}
                            href={game.href}
                            className="group relative bg-card rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-border overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                            {game.icon}

                            <h3 className="relative text-2xl font-bold text-foreground mb-2">{game.name}</h3>
                            <p className="relative text-muted-foreground mb-6">
                                {game.description}
                            </p>

                            <span className="relative inline-flex items-center text-primary font-semibold group-hover:translate-x-1 transition-transform">
                                Play Now &rarr;
                            </span>
                        </Link>
                    ))}

                    <div className="relative bg-card/50 rounded-2xl p-8 border border-border border-dashed overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-full -mr-8 -mt-8" />
                        <Gamepad2 className="relative w-12 h-12 text-muted-foreground mb-6" />

                        <h3 className="relative text-2xl font-bold text-muted-foreground mb-2">More Coming Soon</h3>
                        <p className="relative text-muted-foreground">
                            We are building more mini-games for you. defaults to relax and have fun.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
