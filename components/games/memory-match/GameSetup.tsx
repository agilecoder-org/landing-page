import { useState } from "react"
import { motion } from "framer-motion"
import {
    Check,
    ScrollText // Replaced Rocket with a themed icon for the button
} from "lucide-react"
import { GameConfig, GridSize, Theme } from "./types"
import { THEMES } from "./themes"

interface GameSetupProps {
    onStartGame: (config: GameConfig) => void
}

export default function GameSetup({ onStartGame }: GameSetupProps) {
    const [config, setConfig] = useState<GameConfig>({
        gridSize: 4,
        theme: 'apprentice', // Updated default to match new Egyptian theme IDs
    })

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-3xl bg-card/40 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/10 relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/60 to-primary" />

            <h2 className="text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/60">
                Ascend the Hierarchy
            </h2>

            {/* Theme Selection */}
            <div className="mb-10">
                <label className="block text-sm uppercase tracking-wider text-muted-foreground font-semibold mb-6 text-center">
                    Select Difficulty Level
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {THEMES.map((theme) => {
                        const isSelected = config.theme === theme.id
                        // theme.icon is now a string (Unicode), not a component
                        return (
                            <button
                                key={theme.id}
                                onClick={() => setConfig({ ...config, theme: theme.id as Theme })}
                                className={`
                                    group relative flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300
                                    ${isSelected
                                        ? 'bg-primary/10 border-primary/50 ring-1 ring-primary/50 shadow-[0_0_20px_rgba(var(--primary),0.2)]'
                                        : 'bg-secondary/10 border-transparent hover:bg-secondary/20 hover:scale-105'
                                    } border
                                `}
                            >
                                <div className={`w-16 h-16 flex items-center justify-center rounded-xl mb-3 text-3xl transition-transform duration-300 ${isSelected ? 'scale-110' : 'group-hover:scale-110'} ${theme.color} bg-opacity-20`}>
                                    {theme.icon}
                                </div>
                                <span className={`text-xs font-bold uppercase tracking-tighter transition-colors ${isSelected ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}>
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

            <div className="flex justify-center mb-10">
                {/* Grid Size - Centered since it's the only option now */}
                <div className="space-y-4 w-full max-w-md">
                    <label className="block text-sm uppercase tracking-wider text-muted-foreground font-semibold text-center">
                        Tomb Size
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
            </div>

            <div className="flex justify-center pt-4">
                <button
                    onClick={() => onStartGame(config)}
                    className="
                        group relative px-16 py-4 bg-gradient-to-r from-primary to-primary/80 rounded-xl 
                        text-primary-foreground font-bold text-lg shadow-xl shadow-primary/20 
                        hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-300
                    "
                >
                    <span className="relative z-10 flex items-center gap-2">
                        Enter Tomb <ScrollText size={20} className="group-hover:rotate-12 transition-transform" />
                    </span>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
            </div>
        </motion.div>
    )
}