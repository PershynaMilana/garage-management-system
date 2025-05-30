import React, { createContext, useEffect, useState } from 'react';

export interface ThemeSettings {
    theme: 'dark' | 'light' | 'default';
    fontSize: '12' | '16' | '20' | '24';
    background: 'default' | 'custom';
}

interface ThemeContextType {
    settings: ThemeSettings;
    updateTheme: (theme: ThemeSettings['theme']) => void;
    updateFontSize: (fontSize: ThemeSettings['fontSize']) => void;
    updateBackground: (background: ThemeSettings['background']) => void;
    updateSettings: (settings: Partial<ThemeSettings>) => void;
}

const defaultSettings: ThemeSettings = {
    theme: 'dark',
    fontSize: '16',
    background: 'default'
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [settings, setSettings] = useState<ThemeSettings>(() => {
        try {
            const saved = localStorage.getItem('themeSettings');
            return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
        } catch {
            return defaultSettings;
        }
    });

    useEffect(() => {
        localStorage.setItem('themeSettings', JSON.stringify(settings));
        applyThemeToDOM(settings);
    }, [settings]);

    useEffect(() => {
        applyThemeToDOM(settings);
    }, []);

    const updateTheme = (theme: ThemeSettings['theme']) => {
        setSettings(prev => ({ ...prev, theme }));
    };

    const updateFontSize = (fontSize: ThemeSettings['fontSize']) => {
        setSettings(prev => ({ ...prev, fontSize }));
    };

    const updateBackground = (background: ThemeSettings['background']) => {
        setSettings(prev => ({ ...prev, background }));
    };

    const updateSettings = (newSettings: Partial<ThemeSettings>) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    };

    return (
        <ThemeContext.Provider value={{
            settings,
            updateTheme,
            updateFontSize,
            updateBackground,
            updateSettings
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

const applyThemeToDOM = (settings: ThemeSettings) => {
    const root = document.documentElement;

    root.setAttribute('data-theme', settings.theme);
    root.setAttribute('data-font-size', settings.fontSize);
    root.setAttribute('data-background', settings.background);

    const fontSizeMap = {
        '12': '0.75rem',
        '16': '1rem',
        '20': '1.25rem',
        '24': '1.5rem'
    };

    root.style.setProperty('--base-font-size', fontSizeMap[settings.fontSize]);

    if (settings.theme === 'light') {
        root.style.setProperty('--bg-primary', '#ffffff');
        root.style.setProperty('--bg-secondary', '#f8f9fa');
        root.style.setProperty('--bg-tertiary', '#e9ecef');
        root.style.setProperty('--text-primary', '#212529');
        root.style.setProperty('--text-secondary', '#495057');
        root.style.setProperty('--text-muted', '#6c757d');
        root.style.setProperty('--border-color', '#dee2e6');
        root.style.setProperty('--accent-color', '#0066cc');
        root.style.setProperty('--input-bg', '#ffffff');
        root.style.setProperty('--modal-bg', '#ffffff');
        root.style.setProperty('--success-color', '#28a745');
        root.style.setProperty('--warning-color', '#ffc107');
        root.style.setProperty('--error-color', '#dc3545');
        root.style.setProperty('--info-color', '#17a2b8');

    } else if (settings.theme === 'dark') {
        root.style.setProperty('--bg-primary', '#0c0c18');
        root.style.setProperty('--bg-secondary', '#1a1a2e');
        root.style.setProperty('--bg-tertiary', '#2a3f5f');
        root.style.setProperty('--text-primary', '#ffffff');
        root.style.setProperty('--text-secondary', '#e9ecef');
        root.style.setProperty('--text-muted', '#adb5bd');
        root.style.setProperty('--border-color', '#4e6b8c');
        root.style.setProperty('--accent-color', '#87d7de');
        root.style.setProperty('--input-bg', '#2a3f5f');
        root.style.setProperty('--modal-bg', '#2a3f5f');
        root.style.setProperty('--success-color', '#28a745');
        root.style.setProperty('--warning-color', '#ffc107');
        root.style.setProperty('--error-color', '#dc3545');
        root.style.setProperty('--info-color', '#87d7de');

    } else {
        root.style.setProperty('--bg-primary', '#0c0c18');
        root.style.setProperty('--bg-secondary', '#2a3f5f');
        root.style.setProperty('--bg-tertiary', '#4e6b8c');
        root.style.setProperty('--text-primary', '#ffffff');
        root.style.setProperty('--text-secondary', '#e9ecef');
        root.style.setProperty('--text-muted', '#adb5bd');
        root.style.setProperty('--border-color', '#4e6b8c');
        root.style.setProperty('--accent-color', '#87d7de');
        root.style.setProperty('--input-bg', '#4e6b8c');
        root.style.setProperty('--modal-bg', '#2a3f5f');
        root.style.setProperty('--success-color', '#28a745');
        root.style.setProperty('--warning-color', '#ffc107');
        root.style.setProperty('--error-color', '#dc3545');
        root.style.setProperty('--info-color', '#87d7de');
    }
};