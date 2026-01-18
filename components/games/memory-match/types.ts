// Game is strictly single player now
export type GameState = 'MENU' | 'SETUP' | 'PLAYING' | 'GAME_OVER';
export type GridSize = 4 | 6 | 8;

export type Theme = 'apprentice' | 'scribe' | 'architect' | 'pharaoh';

export interface GameConfig {
    gridSize: GridSize;
    theme: Theme;
}

export const getRequiredPairs = (gridSize: GridSize): number => {
    return (gridSize * gridSize) / 2;
};