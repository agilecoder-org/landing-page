
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
    Ghost, Maximize, MousePointerClick,
    Crown
} from "lucide-react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { GameConfig } from "./types"
import { getThemeById, THEMES } from "./themes"

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface Card {
    id: number
    iconIndex: number
    isFlipped: boolean
    isMatched: boolean
}

interface GameBoardProps {
    config: GameConfig
    onGameEnd: (score: number) => void // Score is just pairs matched or moves?
    onRestart: () => void
}

export default function GameBoard({ config, onGameEnd, onRestart }: GameBoardProps) {
    const [cards, setCards] = useState<Card[]>([])
    const [flippedCards, setFlippedCards] = useState<number[]>([]) // IDs
    const [isProcessing, setIsProcessing] = useState(false)

    // Theme Items (Icons or Strings)
    const [activeItems, setActiveItems] = useState<(any)[]>([])

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
            const saved = localStorage.getItem('memory_game_state_egypt')
            let loaded = false
            if (saved) {
                try {
                    const data = JSON.parse(saved)
                    // Simple deep check might be heavy, just check key props like gridSize/mode
                    if (data.config &&
                        data.config.gridSize === config.gridSize &&
                        data.config.theme === config.theme) {

                        setCards(data.cards)
                        // If we reload mid-flip, just reset flips to avoid stuck state
                        setFlippedCards([])
                        setIsProcessing(false)

                        setMoves(data.moves)
                        setMistakes(data.mistakes || 0)
                        setSeenCards(new Set(data.seenCards || []))

                        // Restore theme items
                        const theme = getThemeById(config.theme) || THEMES[0]
                        setActiveItems(theme.items)

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
            moves,
            mistakes,
            seenCards: Array.from(seenCards)
        }
        localStorage.setItem('memory_game_state_egypt', JSON.stringify(state))
    }, [cards, moves, mistakes, seenCards, config])

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

        // Select items based on theme
        const theme = getThemeById(config.theme) || THEMES[0]
        const themeItems = theme.items

        // Ensure we have enough items
        const pool = [...themeItems, ...themeItems, ...themeItems] // Hack to ensure plenty

        // Select unique indices from the pool for the pairs
        const uniqueIndices = Array.from({ length: themeItems.length }, (_, i) => i)
            .sort(() => 0.5 - Math.random())
            .slice(0, pairsNeeded)

        // If we still don't have enough distinct items (e.g. very large grid vs small theme), 
        // we'd need to reuse. But our themes have ~12-30 items, and max grid is 8x8 (32 pairs).
        // If pairsNeeded > themeItems.length, we need to wrap around.

        const selectedIndices: number[] = []
        if (pairsNeeded <= themeItems.length) {
            selectedIndices.push(...uniqueIndices)
        } else {
            // Fill with all unique, then random remainder
            selectedIndices.push(...Array.from({ length: themeItems.length }, (_, i) => i))
            const remainder = pairsNeeded - themeItems.length
            for (let i = 0; i < remainder; i++) {
                selectedIndices.push(Math.floor(Math.random() * themeItems.length))
            }
        }

        // Create Deck (pairs)
        const deckIndices = [...selectedIndices, ...selectedIndices]
            .sort(() => 0.5 - Math.random())

        const newCards = deckIndices.map((iconIndex, id) => ({
            id,
            iconIndex, // This is index into themeItems
            isFlipped: false,
            isMatched: false,
        }))

        setCards(newCards)
        setFlippedCards([])
        setIsProcessing(false)
        setActiveItems(themeItems)
        setMoves(0)
        setMistakes(0)
        setSeenCards(new Set())

        // Clear storage on explicit new game
        localStorage.removeItem('memory_game_state_egypt')
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
                            ? { ...c, isMatched: true }
                            : c
                    )
                    setCards(matchedState)
                    setFlippedCards([])
                    setIsProcessing(false)

                    // Add to seen
                    setSeenCards(prev => {
                        const next = new Set(prev)
                        next.add(id1)
                        next.add(id2)
                        return next
                    })

                    // Check End Game
                    if (matchedState.every(c => c.isMatched)) {
                        onGameEnd(moves + 1) // Pass moves as score
                        localStorage.removeItem('memory_game_state_egypt') // Clear on win
                    }

                }, 500)
            } else {
                // No Match
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

                    // Update seen cards
                    setSeenCards(prev => {
                        const next = new Set(prev)
                        next.add(id1)
                        next.add(id2)
                        return next
                    })
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

    // Dynamic Font Size
    const fontSize = {
        4: 'text-4xl sm:text-5xl md:text-6xl',
        6: 'text-2xl sm:text-3xl md:text-4xl',
        8: 'text-xl sm:text-2xl md:text-3xl'
    }[config.gridSize]

    // Stats
    const totalPairs = (config.gridSize * config.gridSize) / 2
    const matchedCount = cards.filter(c => c.isMatched).length / 2

    // Accuracy
    const accuracy = (matchedCount + mistakes) > 0
        ? Math.round((matchedCount / (matchedCount + mistakes)) * 100)
        : 100

    return (
        <div
            ref={boardRef}
            className={cn(
                "flex flex-col lg:flex-row items-center lg:items-start justify-center w-full gap-4 lg:gap-6 p-4 rounded-3xl transition-all duration-300",
                fullScreen ? "fixed inset-0 z-50 bg-black/95 backdrop-blur-xl justify-center items-center" : "max-w-6xl mx-auto"
            )}
        >
            {/* Left: Game Grid */}
            <div className={cn(
                "w-full flex-1 flex items-center justify-center",
                fullScreen ? "h-full p-4" : ""
            )}>
                <div className={cn(
                    "grid gap-2 w-full aspect-square p-2 bg-card/50 rounded-2xl border border-border/50 shadow-2xl backdrop-blur-sm",
                    "max-w-[min(80vh,100%)] max-h-[80vh]",
                    gridCols
                )}>
                    {cards.map(card => {
                        const item = activeItems[card.iconIndex] // Safe access
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
                                    {/* Back (Face Down) - Themed */}
                                    <div
                                        className={cn(
                                            "absolute inset-0 backface-hidden rounded-xl bg-gradient-to-br from-secondary to-secondary/80 border border-secondary/50 flex items-center justify-center shadow-lg group hover:border-primary/50 transition-colors",
                                            "flex items-center justify-center"
                                        )}
                                        style={{ backfaceVisibility: "hidden" }}
                                    >
                                        {/* Card Back Pattern */}
                                        <div className="absolute inset-2 border border-primary/20 rounded-lg opacity-50" />
                                        <Crown className="w-1/3 h-1/3 text-primary opacity-70" />
                                    </div>

                                    {/* Front (Face Up) */}
                                    <div
                                        className={cn(
                                            "absolute inset-0 backface-hidden rounded-xl border-2 flex items-center justify-center shadow-lg bg-gradient-to-br from-background to-secondary/10 backdrop-blur-md",
                                            card.isMatched
                                                ? "border-primary shadow-[0_0_15px_rgba(var(--primary),0.4)]"
                                                : "border-primary/50"
                                        )}
                                        style={{
                                            backfaceVisibility: "hidden",
                                            transform: "rotateY(180deg)"
                                        }}
                                    >
                                        {item && (
                                            typeof item === 'string' ? (
                                                <span className={cn(
                                                    "select-none transition-all duration-500 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]",
                                                    fontSize,
                                                    card.isMatched ? "scale-110 text-primary" : "text-primary/70"
                                                )}>
                                                    {item}
                                                </span>
                                            ) : (
                                                (() => {
                                                    const Icon = item
                                                    return (
                                                        <Icon
                                                            className={cn(
                                                                "w-1/2 h-1/2 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-500",
                                                                card.isMatched ? "text-primary scale-110" : "text-primary/70"
                                                            )}
                                                        />
                                                    )
                                                })()
                                            )
                                        )}
                                    </div>
                                </motion.div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>

            {/* Right: Stats Panel - Themed */}
            <div className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-4">
                {/* Stats Card */}
                <div className="bg-card/50 backdrop-blur-md border border-border/50 p-6 rounded-2xl shadow-lg flex flex-col gap-6">
                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 text-center uppercase tracking-widest">
                        Expedition Log
                    </h3>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-secondary/20 border border-border/50 rounded-lg">
                            <span className="text-muted-foreground text-sm font-bold uppercase">Moves</span>
                            <span className="text-2xl font-mono font-bold text-foreground">{moves}</span>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-secondary/20 border border-border/50 rounded-lg">
                            <span className="text-muted-foreground text-sm font-bold uppercase">Accuracy</span>
                            <span className={cn(
                                "text-2xl font-mono font-bold transition-colors",
                                accuracy >= 80 ? "text-emerald-400" : accuracy >= 50 ? "text-secondary-foreground" : "text-red-400"
                            )}>
                                {accuracy}%
                            </span>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-secondary/20 border border-border/50 rounded-lg">
                            <span className="text-muted-foreground text-sm font-bold uppercase">Artifacts</span>
                            <span className="text-xl font-mono font-medium text-foreground">
                                <span className="text-primary">{matchedCount}</span>
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
                        className="w-full py-3 px-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-black/20 active:scale-95 transition-all flex items-center justify-center gap-2 group border border-primary/20"
                    >
                        <span className="group-hover:rotate-180 transition-transform duration-500">
                            <Ghost size={20} />
                        </span>
                        Restart Expedition
                    </button>

                    <button
                        onClick={toggleFullScreen}
                        className="w-full py-3 px-4 bg-secondary/50 hover:bg-secondary text-secondary-foreground font-semibold rounded-xl border border-border/50 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        {fullScreen ? (
                            <>
                                <MousePointerClick className="w-4 h-4" />
                                Exit Full Screen
                            </>
                        ) : (
                            <>
                                <Maximize className="w-4 h-4" />
                                Focus Mode
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
