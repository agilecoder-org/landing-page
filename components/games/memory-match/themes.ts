export type ThemeType = 'unicode';

export interface ThemeConfig {
    id: string;
    label: string;
    type: ThemeType;
    icon: string; // Changed from LucideIcon to string
    color: string;
    items: string[];
}

// Level 1: Distinct Human and Deity forms (Easier to tell apart)
const LEVEL_EASY = [
    '𓀀', '𓀁', '𓀂', '𓀃', '𓀄', '𓀅', '𓀆', '𓀇', '𓀈', '𓀉', '𓀊', '𓀋', '𓁐', '𓁑', '𓁒', '𓁓'
];

// Level 2: Animals and Birds (Moderately distinct silhouettes)
const LEVEL_MEDIUM = [
    '𓃒', '𓃓', '𓃔', '𓃕', '𓃖', '𓃗', '𓃘', '𓃙', '𓃚', '𓅀', '𓅁', '𓅂', '𓅃', '𓅄', '𓅅', '𓅆'
];

// Level 3: Tools and Abstract Symbols (Harder to distinguish quickly)
const LEVEL_HARD = [
    '𓌀', '𓌁', '𓌂', '𓌃', '𓌄', '𓌅', '𓌆', '𓌇', '𓋰', '𓋱', '𓋲', '𓋳', '𓍀', '𓍁', '𓍂', '𓍃'
];

// Level 4: Geometric and Minimalist (Extremely difficult/similar)
const LEVEL_EXPERT = [
    '𓐀', '𓐁', '𓐂', '𓐃', '𓐄', '𓐅', '𓐆', '𓐇', '𓏰', '𓏱', '𓏲', '𓏳', '𓏴', '𓏵', '𓏶', '𓏷'
];

export const THEMES: ThemeConfig[] = [
    {
        id: 'apprentice',
        label: 'Apprentice (Human)',
        type: 'unicode',
        icon: '𓀀',
        color: 'bg-primary/20 text-primary',
        items: LEVEL_EASY
    },
    {
        id: 'scribe',
        label: 'Scribe (Nature)',
        type: 'unicode',
        icon: '𓃗',
        color: 'bg-primary/20 text-primary',
        items: LEVEL_MEDIUM
    },
    {
        id: 'architect',
        label: 'Architect (Tools)',
        type: 'unicode',
        icon: '𓌊',
        color: 'bg-primary/20 text-primary',
        items: LEVEL_HARD
    },
    {
        id: 'pharaoh',
        label: 'Pharaoh (Abstract)',
        type: 'unicode',
        icon: '𓋹',
        color: 'bg-primary/20 text-primary',
        items: LEVEL_EXPERT
    }
];

export const getThemeById = (id: string): ThemeConfig | undefined => {
    return THEMES.find(t => t.id === id);
}

export const getRandomTheme = (): ThemeConfig => {
    return THEMES[Math.floor(Math.random() * THEMES.length)];
}