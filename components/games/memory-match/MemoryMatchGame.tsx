"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
    Gamepad2,
    Ghost,
    Heart,
    Zap,
    Star,
    Music,
    Sun,
    Moon,
    Cloud,
    Snowflake,
    RefreshCcw,
    Trophy,
} from "lucide-react"

// Fallback for cn if not found in utils, but it's standard in these projects. 
// I'll check for lib/utils first to be safe, but since I'm writing the file I'll just assume standard shadcn-like structure 
// or I can define a simple one here if needed. 
// Actually, looking at previous ls, I didn't see a lib folder, I saw utils in components or root?
// Wait, Step 4 `ls app` and Step 13 `ls components` didn't show `lib`. 
// Step 4 showed `app`, `components`, plus some files. 
// Step 21 `app/page.tsx` imports from `@/utils/content`.
// So standard `cn` helper might not be there or might be in `@/utils/cn` or `clsx` usage directly.
// Checking `package.json` (Step 12), `clsx` and `tailwind-merge` are installed.
// I will create a local helper for now or just import clsx directly to avoid errors.

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

const ICONS = [
    Ghost,
    Heart,
    Zap,
    Star,
    Music,
    Sun,
    Moon,
    Cloud,
    Snowflake,
    Gamepad2,
]

interface Card {
    id: number
    iconId: number
    isFlipped: boolean
    isMatched: boolean
}

export default function MemoryMatchGame() {
    const [cards, setCards] = useState<Card[]>([])
    const [flippedCards, setFlippedCards] = useState<number[]>([]) // Store matched *indices* or IDs
    const [matchedPairs, setMatchedPairs] = useState<number[]>([]) // Store iconIds
    const [moves, setMoves] = useState(0)
    const [gameWon, setGameWon] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)

    // Initialize Game
    useEffect(() => {
        startNewGame()
    }, [])



    const handleCardClick = (id: number) => {
        // Prevent clicking if:
        // 1. Processing a match match
        // 2. Card is already flipped
        // 3. Card is already matched
        if (isProcessing) return
        const card = cards.find((c) => c.id === id)
        if (!card || card.isFlipped || card.isMatched) return

        // Flip the card
        const newCards = [...cards]
        const cardIndex = newCards.findIndex((c) => c.id === id)
        newCards[cardIndex].isFlipped = true
        setCards(newCards)

        const newFlipped = [...flippedCards, id]
        setFlippedCards(newFlipped)

        // Check for match
        if (newFlipped.length === 2) {
            setIsProcessing(true)
            setMoves((prev) => prev + 1)

            const [firstId, secondId] = newFlipped
            const firstCard = cards.find(c => c.id === firstId)
            const secondCard = cards.find(c => c.id === secondId)

            if (firstCard && secondCard && firstCard.iconId === secondCard.iconId) {
                // Match found
                setMatchedPairs((prev) => [...prev, firstCard.iconId])

                // Mark as matched after short delay to show the flip
                setTimeout(() => {
                    const matchedCardsState = newCards.map(c =>
                        c.id === firstId || c.id === secondId ? { ...c, isMatched: true, isFlipped: true } : c
                    )
                    setCards(matchedCardsState)
                    setFlippedCards([])
                    setIsProcessing(false)

                    // Check Win
                    if (matchedPairs.length + 1 === 8) { // +1 because we state update hasn't propagated to matchedPairs yet? 
                        // Actually relying on state inside strict mode or closure might be tricky.
                        // Better to check the calculated length.
                        // current matchedPairs.length is OLD. new match is +1. Total pairs = 8.
                        setGameWon(true)
                    }
                }, 500)
            } else {
                // No Match
                setTimeout(() => {
                    const resetCards = newCards.map(c =>
                        c.id === firstId || c.id === secondId ? { ...c, isFlipped: false } : c
                    )
                    setCards(resetCards)
                    setFlippedCards([])
                    setIsProcessing(false)
                }, 1000)
            }
        }
    }

    // Get the actual Icon component based on iconId
    // Need to grab the same set of 8 icons in same order? 
    // Wait, I randomized the selection in startNewGame. I need to store the *icons* or map consistently.
    // Correction: I should store the icons in state or use a fixed mapping if I want to persist.
    // For simplicity, let's just pick 8 fixed icons for now or simpler:
    // Random picking is fine if we only render. But my `iconId` logic above relied on index in `selectedIcons`.
    // If `selectedIcons` is local to `startNewGame`, I can't retrieve the icon component during render.
    // FIX: Store the active icon set in state.

    const [activeIcons, setActiveIcons] = useState<any[]>([])

    // Correcting startNewGame to set activeIcons
    const startNewGame = () => {
        const shuffledIcons = [...ICONS].sort(() => 0.5 - Math.random())
        const selected = shuffledIcons.slice(0, 8)
        setActiveIcons(selected)

        const pairs = selected.map((_, index) => index)
        const deckIds = [...pairs, ...pairs].sort(() => 0.5 - Math.random())

        const initialCards = deckIds.map((iconId, index) => ({
            id: index,
            iconId,
            isFlipped: false,
            isMatched: false,
        }))

        setCards(initialCards)
        setFlippedCards([])
        setMatchedPairs([])
        setMoves(0)
        setGameWon(false)
        setIsProcessing(false)
    }

    // Use fixed version in useEffect
    useEffect(() => {
        startNewGame()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="flex flex-col items-center justify-center p-4 w-full max-w-4xl mx-auto">
            <div className="flex justify-between items-center w-full mb-8">
                <div className="flex flex-col">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                        Memory Match
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">Find all matching pairs</p>
                </div>
                <div className="flex items-center gap-6">
                    <div className="bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-700">
                        <span className="text-gray-400 text-xs uppercase tracking-wider">Moves</span>
                        <p className="text-2xl font-mono font-bold text-white">{moves}</p>
                    </div>
                    <button
                        onClick={startNewGame}
                        className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-colors border border-gray-700"
                        title="Restart Game"
                    >
                        <RefreshCcw size={20} />
                    </button>
                </div>
            </div>

            <div className="relative">
                <div className="grid grid-cols-4 gap-4">
                    {cards.map((card) => {
                        const Icon = activeIcons[card.iconId]
                        return (
                            <div
                                key={card.id}
                                className="aspect-square w-20 h-20 sm:w-24 sm:h-24 perspective-1000"
                                onClick={() => handleCardClick(card.id)}
                            >
                                <motion.div
                                    initial={false}
                                    animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }} // Faster, smoother flip
                                    className="w-full h-full relative preserve-3d cursor-pointer"
                                    style={{ transformStyle: "preserve-3d" }}
                                >
                                    {/* Front (Hidden state) */}
                                    <div
                                        className={cn(
                                            "absolute inset-0 backface-hidden rounded-xl",
                                            "bg-gradient-to-br from-gray-800 to-gray-900",
                                            "border border-gray-700 shadow-xl",
                                            "flex items-center justify-center",
                                            "group hover:border-purple-500/50 transition-colors"
                                        )}
                                        style={{ backfaceVisibility: "hidden" }}
                                    >
                                        <Gamepad2 className="text-gray-600 w-8 h-8 group-hover:text-gray-500 transition-colors opacity-50" />
                                    </div>

                                    {/* Back (Revealed state) */}
                                    <div
                                        className={cn(
                                            "absolute inset-0 backface-hidden rounded-xl",
                                            "bg-gradient-to-br from-indigo-900/90 to-purple-900/90",
                                            "border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.3)]",
                                            "flex items-center justify-center"
                                        )}
                                        style={{
                                            backfaceVisibility: "hidden",
                                            transform: "rotateY(180deg)"
                                        }}
                                    >
                                        {Icon && <Icon className="w-10 h-10 text-white drop-shadow-lg" />}
                                    </div>
                                </motion.div>
                            </div>
                        )
                    })}
                </div>

                {gameWon && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-50 flex justify-center pointer-events-none"
                    >
                        <div className="bg-gray-900/95 backdrop-blur-xl border border-gray-700 p-8 rounded-2xl shadow-2xl text-center pointer-events-auto max-w-sm mx-4">
                            <div className="inline-flex p-4 rounded-full bg-yellow-500/20 mb-4">
                                <Trophy className="w-12 h-12 text-yellow-500" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-2">Victory!</h3>
                            <p className="text-gray-300 mb-6">
                                You completed the game in <span className="text-white font-bold">{moves}</span> moves.
                            </p>
                            <button
                                onClick={startNewGame}
                                className="px-6 py-3 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-200 transition-colors w-full"
                            >
                                Play Again
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
