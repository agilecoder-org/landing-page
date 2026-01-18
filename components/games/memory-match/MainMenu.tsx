import { motion } from "framer-motion"
import { User, Users, Globe, Smartphone, ArrowRight } from "lucide-react"

interface MainMenuProps {
    onSelectMode: (mode: 'SOLO' | 'LOCAL' | 'ONLINE') => void
}

export default function MainMenu({ onSelectMode }: MainMenuProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            {/* Solo */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectMode('SOLO')}
                className="text-left bg-card hover:bg-accent border border-border p-8 rounded-xl transition-colors group relative overflow-hidden"
            >
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-foreground mb-2">Play solo</h3>
                    <p className="text-muted-foreground mb-4">Play solo to improve your accuracy!</p>
                    <span className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium shadow-sm group-hover:bg-primary/90 transition-colors">
                        Start solo game
                    </span>
                </div>
                <User className="absolute -right-4 -bottom-4 w-32 h-32 text-primary/10 rotate-12" />
            </motion.button>

            {/* Online / Random - Placeholder function */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-left bg-card hover:bg-accent border border-border p-8 rounded-xl transition-colors group relative overflow-hidden"
            >
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-foreground mb-2">Play with anybody</h3>
                    <p className="text-muted-foreground mb-4">Somebody may be waiting for you to join right now!</p>
                    <span className="inline-flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium shadow-sm group-hover:bg-secondary/90 transition-colors">
                        Join random player
                    </span>
                </div>
                <Globe className="absolute -right-4 -bottom-4 w-32 h-32 text-secondary/10 rotate-12" />
            </motion.button>

            {/* Friend Link - Placeholder */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-left bg-card hover:bg-accent border border-border p-8 rounded-xl transition-colors group relative overflow-hidden"
            >
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-foreground mb-2">Play with a friend</h3>
                    <p className="text-muted-foreground mb-4">Simply send a link to your online friend to begin!</p>
                    <span className="inline-flex items-center px-4 py-2 bg-muted text-muted-foreground rounded-lg font-medium shadow-sm group-hover:bg-muted/90 transition-colors">
                        Start 2-player game
                    </span>
                </div>
                <Users className="absolute -right-4 -bottom-4 w-32 h-32 text-muted-foreground/10 rotate-12" />
            </motion.button>

            {/* Local MP */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectMode('LOCAL')}
                className="text-left bg-card hover:bg-accent border border-border p-8 rounded-xl transition-colors group relative overflow-hidden"
            >
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-foreground mb-2">Play locally</h3>
                    <p className="text-muted-foreground mb-4">Play with your friend on the same device!</p>
                    <span className="inline-flex items-center px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium shadow-sm group-hover:bg-accent/90 transition-colors">
                        Start local game
                    </span>
                </div>
                <Smartphone className="absolute -right-4 -bottom-4 w-32 h-32 text-accent-foreground/10 rotate-12" />
            </motion.button>
        </div>
    )
}
