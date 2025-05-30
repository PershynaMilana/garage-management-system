export interface ThemeSettings {
    theme: 'dark' | 'light' | 'default';
    fontSize: '12' | '16' | '20' | '24';
    background: 'default' | 'custom';
}

export type ThemeMode = ThemeSettings['theme'];
export type FontSize = ThemeSettings['fontSize'];
export type BackgroundType = ThemeSettings['background'];

export interface ThemeColors {
    bgPrimary: string;
    bgSecondary: string;
    bgTertiary: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    borderColor: string;
    accentColor: string;
    inputBg: string;
    modalBg: string;
}

export interface FontSizeConfig {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
}