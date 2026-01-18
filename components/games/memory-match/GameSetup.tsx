import { useState } from "react"
import { motion } from "framer-motion"
import {
    Cat,
    Bot,
    Rocket,
    Leaf,
    Sparkles,
    Check
} from "lucide-react"
import { GameConfig, GridSize, Theme } from "./types"

interface GameSetupProps {
    initialMode: 'SOLO' | 'LOCAL' | 'ONLINE'
    onStartGame: (config: GameConfig) => void
    onBack: () => void
}

const THEMES: { id: Theme; label: string; icon: any; color: string }[] = [
    { id: 'animals', label: 'Animals', icon: Cat, color: 'bg-primary/20 text-primary' },
    { id: 'robots', label: 'Robots', icon: Bot, color: 'bg-destructive/20 text-destructive' },
    { id: 'space', label: 'Space', icon: Rocket, color: 'bg-accent text-accent-foreground' },
    { id: 'tech', label: 'Tech', icon: Sparkles, color: 'bg-secondary/20 text-secondary-foreground' },
    { id: 'food', label: 'Food', icon: Leaf, color: 'bg-green-500/20 text-green-500' },
]

export default function GameSetup({ initialMode, onStartGame, onBack }: GameSetupProps) {
    const [config, setConfig] = useState<GameConfig>({
        mode: initialMode,
        gridSize: 4,
        theme: 'animals',
        playerCount: initialMode === 'SOLO' ? 1 : 2
    })

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-3xl bg-card/40 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/10 relative overflow-hidden"
        >
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

            <h2 className="text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-br from-white to-white/60">
                Setup Game
            </h2>

            {/* Theme Selection */}
            <div className="mb-10">
                <label className="block text-sm uppercase tracking-wider text-muted-foreground font-semibold mb-6 text-center">
                    Select Theme
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    {THEMES.map((theme) => {
                        const isSelected = config.theme === theme.id
                        const Icon = theme.icon
                        return (
                            <button
                                key={theme.id}
                                onClick={() => setConfig({ ...config, theme: theme.id })}
                                className={`
                                    group relative flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300
                                    ${isSelected
                                        ? 'bg-primary/20 border-primary/50 ring-1 ring-primary/50 shadow-[0_0_20px_rgba(var(--primary),0.3)]'
                                        : 'bg-secondary/10 border-transparent hover:bg-secondary/20 hover:scale-105'
                                    } border
                                `}
                            >
                                <div className={`p-4 rounded-xl mb-3 transition-transform duration-300 ${isSelected ? 'scale-110' : 'group-hover:scale-110'} ${theme.color} bg-opacity-20`}>
                                    <Icon size={28} />
                                </div>
                                <span className={`text-sm font-medium transition-colors ${isSelected ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}>
                                    {theme.label}
                                </span>
                                {isSelected && (
                                    <div className="absolute top-3 right-3 bg-primary text-primary-foreground rounded-full p-1 shadow-lg">
                                        <Check size={10} strokeWidth={4} />
                                    </div>
                                )}
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {/* Grid Size */}
                <div className="space-y-4">
                    <label className="block text-sm uppercase tracking-wider text-muted-foreground font-semibold text-center">
                        Grid Size
                    </label>
                    <div className="bg-secondary/20 p-1.5 rounded-xl flex gap-2">
                        {[4, 6, 8].map((size) => (
                            <button
                                key={size}
                                onClick={() => setConfig({ ...config, gridSize: size as GridSize })}
                                className={`
                                    flex-1 py-3 rounded-lg font-bold text-sm transition-all duration-300
                                    ${config.gridSize === size
                                        ? 'bg-background shadow-lg text-primary scale-100'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                                    }
                                `}
                            >
                                {size}x{size}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Players */}
                <div className="space-y-4">
                    <label className="block text-sm uppercase tracking-wider text-muted-foreground font-semibold text-center">
                        Players
                    </label>
                    <div className="bg-secondary/20 p-1.5 rounded-xl flex gap-2">
                        {[1, 2, 3, 4].map((count) => (
                            <button
                                key={count}
                                disabled={initialMode === 'SOLO' && count > 1}
                                onClick={() => setConfig({ ...config, playerCount: count })}
                                className={`
                                    flex-1 py-3 rounded-lg font-bold text-sm transition-all duration-300 flex items-center justify-center
                                    ${config.playerCount === count
                                        ? 'bg-background shadow-lg text-primary scale-100'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                                    }
                                    ${initialMode === 'SOLO' && count > 1 ? 'opacity-30 cursor-not-allowed hover:bg-transparent' : ''}
                                `}
                            >
                                {count}P
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex justify-center pt-4">
                <button
                    onClick={() => onStartGame(config)}
                    className="
                        group relative px-16 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl 
                        text-white font-bold text-lg shadow-xl shadow-indigo-500/20 
                        hover:shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all duration-300
                    "
                >
                    <span className="relative z-10 flex items-center gap-2">
                        Start Game <Rocket size={20} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
            </div>
        </motion.div>
    )
}
