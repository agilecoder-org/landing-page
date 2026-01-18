import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
    Ghost, Heart, Zap, Star, Music, Sun, Moon, Cloud, Snowflake, Gamepad2,
    Cat, Bot, Rocket, Leaf, Palette, Flag, Dumbbell, Sparkles, Smile, Crown,
    Maximize, MousePointerClick
} from "lucide-react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { GameConfig } from "./types"

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

const ALL_ICONS = {
    animals: [Cat, Ghost, Heart, Zap, Star, Music, Sun, Moon, Cloud, Snowflake, Gamepad2, Smile], // Need to expand
    robots: [Bot, Zap, Star, Music, Sun, Moon, Cloud, Snowflake, Gamepad2, Smile, Heart, Ghost],
    space: [Rocket, Star, Moon, Sun, Cloud, Zap, Ghost, Bot, Gamepad2, Music, Heart, Snowflake],
    tech: [Sparkles, Zap, Bot, Gamepad2, Music, Star, Cloud, Sun, Moon, Heart, Ghost, Smile],
    food: [Leaf, Heart, Sun, Cloud, Snowflake, Music, Star, Moon, Zap, Ghost, Bot, Gamepad2],
}
// Quick fix to have enough icons for 8x8 (32 pairs)
// I need 32 unique icons. 
// I will just mix them all for now or create a large pool.

const ICON_POOL = [
    Ghost, Heart, Zap, Star, Music, Sun, Moon, Cloud, Snowflake, Gamepad2,
    Cat, Bot, Rocket, Leaf, Palette, Flag, Dumbbell, Sparkles, Smile, Crown,
    // Add more...
    // Repeating some with different colors or just reusing for now if pool is small.
    // Ideally I'd import more from lucide, but let's stick to what we have + some more standard ones handled by generic index if needed.
    // For 8x8 (64 cards, 32 pairs), I need 32 icons.
]

interface Card {
    id: number
    iconIndex: number
    isFlipped: boolean
    isMatched: boolean
    matchedBy?: number // Player Index (0-3)
}

interface GameBoardProps {
    config: GameConfig
    onGameEnd: (scores: number[]) => void
    onRestart: () => void
}

export default function GameBoard({ config, onGameEnd, onRestart }: GameBoardProps) {
    const [cards, setCards] = useState<Card[]>([])
    const [flippedCards, setFlippedCards] = useState<number[]>([]) // IDs
    const [isProcessing, setIsProcessing] = useState(false)

    // Multiplayer State
    const [currentPlayer, setCurrentPlayer] = useState(0)
    const [scores, setScores] = useState<number[]>(new Array(config.playerCount).fill(0))

    // Theme Icons
    // Just mapping to pool for now
    const [activeIcons, setActiveIcons] = useState<any[]>([])

    const [moves, setMoves] = useState(0)
    const [mistakes, setMistakes] = useState(0)
    const [seenCards, setSeenCards] = useState<Set<number>>(new Set())

    const [fullScreen, setFullScreen] = useState(false)
    const boardRef = useRef<HTMLDivElement>(null)
    const initialized = useRef(false)

    useEffect(() => {
        if (initialized.current) {
            // If config changes after init, start new game
            startNewGame()
        } else {
            // First mount: Attempt load
            const saved = localStorage.getItem('memory_game_state')
            let loaded = false
            if (saved) {
                try {
                    const data = JSON.parse(saved)
                    // Simple deep check might be heavy, just check key props like gridSize/mode
                    if (data.config &&
                        data.config.gridSize === config.gridSize &&
                        data.config.mode === config.mode &&
                        data.config.theme === config.theme) {

                        setCards(data.cards)
                        // If we reload mid-flip, just reset flips to avoid stuck state
                        setFlippedCards([])
                        setIsProcessing(false)

                        setScores(data.scores)
                        setMoves(data.moves)
                        setMistakes(data.mistakes || 0)
                        setSeenCards(new Set(data.seenCards || []))
                        setCurrentPlayer(data.currentPlayer)
                        setActiveIcons(ICON_POOL)
                        loaded = true
                    }
                } catch (e) {
                    console.error("Failed to load game state", e)
                }
            }

            if (!loaded) {
                startNewGame()
            }
            initialized.current = true
        }
    }, [config])

    // Persistence
    useEffect(() => {
        if (!initialized.current || cards.length === 0) return

        const state = {
            config,
            cards,
            scores,
            moves,
            mistakes,
            seenCards: Array.from(seenCards),
            currentPlayer
        }
        localStorage.setItem('memory_game_state', JSON.stringify(state))
    }, [cards, scores, moves, mistakes, seenCards, currentPlayer, config])

    useEffect(() => {
        const handleFullScreenChange = () => {
            setFullScreen(!!document.fullscreenElement)
        }
        document.addEventListener('fullscreenchange', handleFullScreenChange)
        return () => document.removeEventListener('fullscreenchange', handleFullScreenChange)
    }, [])

    const startNewGame = () => {
        // Calculate pairs needed
        const totalCards = config.gridSize * config.gridSize
        const pairsNeeded = totalCards / 2

        // Select icons
        const pool = [...ICON_POOL, ...ICON_POOL, ...ICON_POOL]
        const uniqueIconIndices = Array.from({ length: pairsNeeded }, (_, i) => i % ICON_POOL.length)

        // Create Deck
        const deckIndices = [...uniqueIconIndices, ...uniqueIconIndices]
            .sort(() => 0.5 - Math.random())

        const newCards = deckIndices.map((iconIndex, id) => ({
            id,
            iconIndex,
            isFlipped: false,
            isMatched: false,
        }))

        setCards(newCards)
        setFlippedCards([])
        setIsProcessing(false)
        setCurrentPlayer(0)
        setScores(new Array(config.playerCount).fill(0))
        setActiveIcons(ICON_POOL)
        setMoves(0)
        setMistakes(0)
        setSeenCards(new Set())

        // Clear storage on explicit new game
        localStorage.removeItem('memory_game_state')
    }

    const toggleFullScreen = async () => {
        if (!boardRef.current) return
        if (!document.fullscreenElement) {
            await boardRef.current.requestFullscreen().catch(console.error)
        } else {
            await document.exitFullscreen().catch(console.error)
        }
    }

    const handleCardClick = (id: number) => {
        if (isProcessing) return
        const card = cards.find(c => c.id === id)
        if (!card || card.isFlipped || card.isMatched) return

        const newCards = [...cards]
        const cardIndex = newCards.findIndex(c => c.id === id)
        newCards[cardIndex].isFlipped = true
        setCards(newCards)

        const newFlipped = [...flippedCards, id]
        setFlippedCards(newFlipped)

        if (newFlipped.length === 2) {
            setIsProcessing(true)
            setMoves(prev => prev + 1)

            const [id1, id2] = newFlipped
            const c1 = newCards.find(c => c.id === id1)!
            const c2 = newCards.find(c => c.id === id2)!

            if (c1.iconIndex === c2.iconIndex) {
                // Match
                setTimeout(() => {
                    const matchedState = newCards.map(c =>
                        c.id === id1 || c.id === id2
                            ? { ...c, isMatched: true, matchedBy: currentPlayer }
                            : c
                    )
                    setCards(matchedState)
                    setFlippedCards([])
                    setIsProcessing(false)

                    // Add to seen (though they are matched now)
                    setSeenCards(prev => {
                        const next = new Set(prev)
                        next.add(id1)
                        next.add(id2)
                        return next
                    })

                    const newScores = [...scores]
                    newScores[currentPlayer]++
                    setScores(newScores)

                    // Check End Game
                    if (matchedState.every(c => c.isMatched)) {
                        onGameEnd(newScores)
                        localStorage.removeItem('memory_game_state') // Clear on win
                    }

                }, 500)
            } else {
                // No Match

                // Check if Mistake
                // Mistake logic: If BOTH cards were previously seen, we should have known.
                // Or: If we picked Card 1 (seen) and Card 2 (seen) and they don't match -> Memory fail.
                const isMistake = seenCards.has(id1) && seenCards.has(id2)
                if (isMistake) {
                    setMistakes(prev => prev + 1)
                }

                setTimeout(() => {
                    const resetState = newCards.map(c =>
                        c.id === id1 || c.id === id2 ? { ...c, isFlipped: false } : c
                    )
                    setCards(resetState)
                    setFlippedCards([])
                    setIsProcessing(false)

                    // Update seen cards AFTER they flip back
                    setSeenCards(prev => {
                        const next = new Set(prev)
                        next.add(id1)
                        next.add(id2)
                        return next
                    })

                    // Switch Turn
                    setCurrentPlayer((prev) => (prev + 1) % config.playerCount)
                }, 1000)
            }
        }
    }

    // Dynamic Grid Class
    const gridCols = {
        4: 'grid-cols-4',
        6: 'grid-cols-6',
        8: 'grid-cols-8'
    }[config.gridSize]

    // Stats
    const totalPairs = (config.gridSize * config.gridSize) / 2
    const matchedCount = cards.filter(c => c.isMatched).length / 2

    // New Accuracy: Matches / (Matches + Mistakes)
    // If 0 mistakes, 100%. Equal to perfect play.
    const accuracy = (matchedCount + mistakes) > 0
        ? Math.round((matchedCount / (matchedCount + mistakes)) * 100)
        : 100

    return (
        <div
            ref={boardRef}
            className={cn(
                "flex flex-col lg:flex-row items-center lg:items-start justify-center w-full gap-4 lg:gap-8 p-4 rounded-3xl transition-all duration-300",
                fullScreen ? "fixed inset-0 z-50 bg-background/95 backdrop-blur-xl justify-center items-center" : "max-w-6xl mx-auto"
            )}
        >
            {/* Left: Game Grid */}
            <div className={cn(
                "w-full flex-1 flex items-center justify-center",
                fullScreen ? "h-full p-4" : ""
            )}>
                <div className={cn(
                    "grid gap-2 w-full aspect-square p-3 bg-secondary/10 rounded-2xl border border-secondary/20 shadow-xl backdrop-blur-sm",
                    "max-w-[min(80vh,100%)] max-h-[80vh]",
                    gridCols
                )}>
                    {cards.map(card => {
                        const Icon = activeIcons[card.iconIndex % activeIcons.length]
                        // Simple player color logic
                        const playerColorClass = [
                            'text-indigo-400 border-indigo-500/50 shadow-indigo-500/20',
                            'text-rose-400 border-rose-500/50 shadow-rose-500/20',
                            'text-amber-400 border-amber-500/50 shadow-amber-500/20',
                            'text-emerald-400 border-emerald-500/50 shadow-emerald-500/20',
                        ][card.matchedBy ?? 0]

                        return (
                            <motion.div
                                key={card.id}
                                className="relative w-full h-full perspective-1000 cursor-pointer"
                                onClick={() => handleCardClick(card.id)}
                                whileHover={{ scale: 0.98 }}
                                layout
                            >
                                <motion.div
                                    animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                    className="w-full h-full relative preserve-3d"
                                    style={{ transformStyle: "preserve-3d" }}
                                >
                                    {/* Back (Face Down) */}
                                    <div
                                        className={cn(
                                            "absolute inset-0 backface-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 flex items-center justify-center shadow-lg group hover:border-indigo-500/30 transition-colors",
                                            "flex items-center justify-center"
                                        )}
                                        style={{ backfaceVisibility: "hidden" }}
                                    >
                                        <Gamepad2 className="w-1/3 h-1/3 text-slate-600 opacity-50" />
                                    </div>

                                    {/* Front (Face Up) */}
                                    <div
                                        className={cn(
                                            "absolute inset-0 backface-hidden rounded-xl border-2 flex items-center justify-center shadow-lg bg-gradient-to-br from-slate-900 to-black backdrop-blur-md",
                                            card.isMatched ? playerColorClass : "border-indigo-500/50 shadow-indigo-500/20"
                                        )}
                                        style={{
                                            backfaceVisibility: "hidden",
                                            transform: "rotateY(180deg)"
                                        }}
                                    >
                                        {Icon && (
                                            <Icon
                                                className={cn(
                                                    "w-1/2 h-1/2 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-500",
                                                    card.isMatched ? "text-white scale-110" : "text-indigo-400"
                                                )}
                                            />
                                        )}
                                    </div>
                                </motion.div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>

            {/* Right: Stats Panel */}
            <div className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-4">
                {/* Stats Card */}
                <div className="bg-card/50 backdrop-blur-md border border-border/50 p-6 rounded-2xl shadow-lg flex flex-col gap-6">
                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                        Game Stats
                    </h3>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
                            <span className="text-muted-foreground text-sm font-medium">Moves</span>
                            <span className="text-2xl font-mono font-bold text-foreground">{moves}</span>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
                            <span className="text-muted-foreground text-sm font-medium">Accuracy</span>
                            <span className={cn(
                                "text-2xl font-mono font-bold transition-colors",
                                accuracy >= 80 ? "text-emerald-400" : accuracy >= 50 ? "text-amber-400" : "text-rose-400"
                            )}>
                                {accuracy}%
                            </span>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
                            <span className="text-muted-foreground text-sm font-medium">Pairs</span>
                            <span className="text-xl font-mono font-medium text-foreground">
                                <span className="text-indigo-400">{matchedCount}</span>
                                <span className="text-muted-foreground mx-1">/</span>
                                {totalPairs}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Controls Card */}
                <div className="bg-card/50 backdrop-blur-md border border-border/50 p-6 rounded-2xl shadow-lg flex flex-col gap-3">
                    <button
                        onClick={onRestart}
                        className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-900/20 active:scale-95 transition-all flex items-center justify-center gap-2 group"
                    >
                        <span className="group-hover:rotate-180 transition-transform duration-500">
                            <Ghost size={20} />
                        </span>
                        New Game
                    </button>

                    <button
                        onClick={toggleFullScreen}
                        className="w-full py-3 px-4 bg-secondary/80 hover:bg-secondary text-secondary-foreground font-semibold rounded-xl border border-secondary transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        {fullScreen ? (
                            <>
                                <MousePointerClick className="w-4 h-4" />
                                Exit Full Screen
                            </>
                        ) : (
                            <>
                                <Maximize className="w-4 h-4" />
                                Play Full Screen
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
