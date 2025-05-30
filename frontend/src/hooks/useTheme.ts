import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import type { ThemeSettings } from '../contexts/ThemeContext';

/**
 * Custom hook for working with themes
 * Provides access to theme settings and functions to modify them
 *
 * @returns {object} Object with theme settings and control functions
 * @throws {Error} If used outside ThemeProvider
 *
 */
export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error(
            'useTheme must be used within a ThemeProvider. ' +
            'Make sure to wrap your component tree with <ThemeProvider>.'
        );
    }

    const {
        settings,
        updateTheme,
        updateFontSize,
        updateBackground,
        updateSettings
    } = context;

    /**
     * Checks if the current theme is dark
     */
    const isDarkTheme = settings.theme === 'dark' || settings.theme === 'default';

    /**
     * Checks if the current theme is light
     */
    const isLightTheme = settings.theme === 'light';

    /**
     * Toggles between dark and light theme
     * If current theme is 'default', switches to 'light'
     */
    const toggleTheme = () => {
        const newTheme: ThemeSettings['theme'] = isDarkTheme ? 'light' : 'dark';
        updateTheme(newTheme);
    };

    /**
     * Increases font size by one level
     * Maximum size: 24px
     */
    const increaseFontSize = () => {
        const sizes: ThemeSettings['fontSize'][] = ['12', '16', '20', '24'];
        const currentIndex = sizes.indexOf(settings.fontSize);
        const nextIndex = Math.min(currentIndex + 1, sizes.length - 1);
        updateFontSize(sizes[nextIndex]);
    };

    /**
     * Decreases font size by one level
     * Minimum size: 12px
     */
    const decreaseFontSize = () => {
        const sizes: ThemeSettings['fontSize'][] = ['12', '16', '20', '24'];
        const currentIndex = sizes.indexOf(settings.fontSize);
        const prevIndex = Math.max(currentIndex - 1, 0);
        updateFontSize(sizes[prevIndex]);
    };

    /**
     * Resets font size to default (16px)
     */
    const resetFontSize = () => {
        updateFontSize('16');
    };

    /**
     * Resets all settings to default values
     */
    const resetToDefaults = () => {
        updateSettings({
            theme: 'dark',
            fontSize: '16',
            background: 'default'
        });
    };

    /**
     * Checks if custom background is being used
     */
    const isCustomBackground = settings.background === 'custom';

    /**
     * Toggles background type between default and custom
     */
    const toggleBackground = () => {
        const newBackground: ThemeSettings['background'] =
            settings.background === 'default' ? 'custom' : 'default';
        updateBackground(newBackground);
    };

    /**
     * Gets human-readable name of current theme
     */
    const getThemeDisplayName = () => {
        switch (settings.theme) {
            case 'dark':
                return 'Dark Theme';
            case 'light':
                return 'Light Theme';
            case 'default':
                return 'Default Theme';
            default:
                return 'Unknown Theme';
        }
    };

    /**
     * Gets human-readable name of current font size
     */
    const getFontSizeDisplayName = () => {
        switch (settings.fontSize) {
            case '12':
                return 'Small (12px)';
            case '16':
                return 'Medium (16px)';
            case '20':
                return 'Large (20px)';
            case '24':
                return 'Extra Large (24px)';
            default:
                return 'Unknown Size';
        }
    };

    /**
     * Checks if font size can be increased
     */
    const canIncreaseFontSize = settings.fontSize !== '24';

    /**
     * Checks if font size can be decreased
     */
    const canDecreaseFontSize = settings.fontSize !== '12';

    /**
     * Gets CSS variable value for current theme
     */
    const getCSSVariable = (variableName: string): string => {
        return getComputedStyle(document.documentElement)
            .getPropertyValue(`--${variableName}`)
            .trim();
    };

    /**
     * Gets all theme CSS variables
     */
    const getThemeColors = () => ({
        bgPrimary: getCSSVariable('bg-primary'),
        bgSecondary: getCSSVariable('bg-secondary'),
        bgTertiary: getCSSVariable('bg-tertiary'),
        textPrimary: getCSSVariable('text-primary'),
        textSecondary: getCSSVariable('text-secondary'),
        textMuted: getCSSVariable('text-muted'),
        borderColor: getCSSVariable('border-color'),
        accentColor: getCSSVariable('accent-color'),
        inputBg: getCSSVariable('input-bg'),
        modalBg: getCSSVariable('modal-bg')
    });

    return {
        // Main settings
        settings,

        // Update functions
        updateTheme,
        updateFontSize,
        updateBackground,
        updateSettings,

        // Theme utilities
        isDarkTheme,
        isLightTheme,
        toggleTheme,
        getThemeDisplayName,

        // Font size utilities
        increaseFontSize,
        decreaseFontSize,
        resetFontSize,
        getFontSizeDisplayName,
        canIncreaseFontSize,
        canDecreaseFontSize,

        // Background utilities
        isCustomBackground,
        toggleBackground,

        // General utilities
        resetToDefaults,
        getCSSVariable,
        getThemeColors
    };
};

export default useTheme;