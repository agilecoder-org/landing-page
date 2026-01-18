import Footer from "@/components/Footer"
import MemoryGameManager from "@/components/games/memory-match/MemoryGameManager"
import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Scroll, Info, Pyramid } from "lucide-react"

export const metadata: Metadata = {
    title: "Secrets of the Sands | AgileCoder Games",
    description: "Uncover the ancient hieroglyphs in this memory matching expedition.",
}

export default function MemoryMatchPage() {
    return (
        <main className="min-h-screen bg-background text-foreground px-4 py-8 font-sans selection:bg-primary/30">
            {/* Standard Site Background */}
            <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />

            {/* Removed Hieroglyph Pattern Overlay */}

            <div className="container mx-auto px-4 relative z-10">
                {/* Header Navigation */}
                <div className="flex items-center mb-8">
                    <Link
                        href="/games"
                        className="group flex items-center text-muted-foreground hover:text-primary transition-colors font-medium text-sm uppercase tracking-widest"
                    >
                        <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Games
                    </Link>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-20">
                    {/* Main Game Area */}
                    <div className="flex-1 w-full min-w-0">
                        <header className="mb-8 text-center lg:text-left">
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary drop-shadow-sm font-sans">
                                Secrets of the Sands
                            </h1>
                            <p className="text-muted-foreground text-lg font-medium">
                                Ascend the hierarchy by mastering the ancient glyphs.
                            </p>
                        </header>

                        <div className="w-full">
                            <MemoryGameManager />
                        </div>
                    </div>

                    {/* Instructions Panel - Right Sidebar */}
                    <div className="w-full lg:w-80 shrink-0">
                        <div className="sticky top-8 space-y-6">
                            {/* Rituals Card */}
                            <div className="bg-card/50 backdrop-blur-md border border-border/50 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Scroll size={80} className="text-primary" />
                                </div>

                                <h3 className="flex items-center gap-2 text-xl font-bold text-primary mb-6 uppercase tracking-wider">
                                    <Info size={20} />
                                    The Ritual
                                </h3>

                                <ul className="space-y-4">
                                    <li className="flex gap-3 text-muted-foreground leading-relaxed">
                                        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs border border-primary/20">1</span>
                                        <span>
                                            <strong className="text-foreground block mb-1">Choose your Path</strong>
                                            Select a difficulty level, from Apprentice to Pharaoh. The symbols become more abstract as you ascend.
                                        </span>
                                    </li>
                                    <li className="flex gap-3 text-muted-foreground leading-relaxed">
                                        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs border border-primary/20">2</span>
                                        <span>
                                            <strong className="text-foreground block mb-1">Reveal the Glyphs</strong>
                                            Turn over stone tablets to reveal the ancient hieroglyphs hidden beneath.
                                        </span>
                                    </li>
                                    <li className="flex gap-3 text-muted-foreground leading-relaxed">
                                        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs border border-primary/20">3</span>
                                        <span>
                                            <strong className="text-foreground block mb-1">Find the Matches</strong>
                                            Match identical pairs to clear them from the tomb. Clear the entire board to win.
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            {/* Decorative Block */}
                            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-6 shadow-lg text-foreground relative overflow-hidden border border-primary/10">
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 font-bold uppercase tracking-widest mb-2 opacity-80 text-sm text-primary">
                                        <Pyramid size={16} />
                                        Did you know?
                                    </div>
                                    <p className="font-medium leading-relaxed text-muted-foreground">
                                        Hieroglyphs were called "mdju netjer" by the Egyptians, meaning "words of the gods".
                                    </p>
                                </div>
                                <Pyramid className="absolute -bottom-4 -right-4 w-32 h-32 text-primary opacity-5 rotate-12" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
