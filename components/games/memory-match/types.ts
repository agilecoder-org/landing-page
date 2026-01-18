export type GameState = 'MENU' | 'SETUP' | 'PLAYING' | 'GAME_OVER'
export type GameMode = 'SOLO' | 'LOCAL' | 'ONLINE'
export type GridSize = 4 | 6 | 8
export type Theme = 'animals' | 'robots' | 'tech' | 'space' | 'food'

export interface GameConfig {
    mode: GameMode
    gridSize: GridSize
    theme: Theme
    playerCount: number
}
