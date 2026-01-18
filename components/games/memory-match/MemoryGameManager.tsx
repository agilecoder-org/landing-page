"use client"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import MainMenu from "./MainMenu"
import GameSetup from "./GameSetup"
import GameBoard from "./GameBoard"
import { GameConfig, GameState, GameMode } from "./types"
import { ArrowLeft } from "lucide-react"

export default function MemoryGameManager() {
    const [gameState, setGameState] = useState<GameState>('MENU')
    const [config, setConfig] = useState<GameConfig>({
        mode: 'SOLO',
        gridSize: 4,
        theme: 'animals',
        playerCount: 1
    })

    // Handlers
    const handleSelectMode = (mode: GameMode) => {
        setConfig(prev => ({ ...prev, mode }))
        setGameState('SETUP')
    }

    const handleStartGame = (newConfig: GameConfig) => {
        setConfig(newConfig)
        setGameState('PLAYING')
    }

    const handleRestart = () => {
        // Re-trigger game start logic in board by just remounting or passing a key? 
        // Or simpler, just keep state playing. GameBoard watches config change or we can toggle a reset flag.
        // For now, let's just re-set 'PLAYING' (no-op) -> actually GameBoard has a 'startNewGame' exposed or useEffect.
        // Best is to key the GameBoard with a unique ID or timestamp.
        setConfig({ ...config, ts: Date.now() } as any) // Hacky force update
    }

    const handleBackToMenu = () => {
        setGameState('MENU')
    }

    return (
        <div className="w-full">
            {/* Header / Nav if deep in game */}
            {gameState !== 'MENU' && (
                <div className="w-full max-w-4xl flex justify-start mb-6">
                    <button
                        onClick={() => setGameState('MENU')}
                        className="flex items-center text-gray-500 hover:text-gray-800 transition-colors"
                    >
                        <ArrowLeft size={20} className="mr-2" />
                        Back to Menu
                    </button>
                </div>
            )}

            <AnimatePresence mode="wait">
                {gameState === 'MENU' && (
                    <motion.div
                        key="menu"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="w-full"
                    >
                        <MainMenu onSelectMode={handleSelectMode} />
                    </motion.div>
                )}

                {gameState === 'SETUP' && (
                    <motion.div
                        key="setup"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                    >
                        <GameSetup
                            initialMode={config.mode}
                            onStartGame={handleStartGame}
                            onBack={() => setGameState('MENU')}
                        />
                    </motion.div>
                )}

                {gameState === 'PLAYING' && (
                    <motion.div
                        key="board"
                        className="w-full flex justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <GameBoard
                            key={(config as any).ts || 'initial'} // Force remount on restart
                            config={config}
                            onGameEnd={(scores) => console.log('Game Over', scores)}
                            onRestart={handleRestart}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
