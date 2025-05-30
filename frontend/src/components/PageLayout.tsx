import React from 'react';
import BackgroundCircles from './BackgroundCircles';
import Footer from './Footer';
import useTheme from "../hooks/useTheme.ts";


interface PageLayoutProps {
    children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    const { settings } = useTheme();

    const getBackgroundClass = () => {
        switch (settings.theme) {
            case 'light':
                return 'bg-[#4a4a52] text-gray-900';
            case 'dark':
                return 'bg-[#0c0c18] text-white';
            default:
                return 'bg-[#0c0c18] text-white';
        }
    };


    // Для светлой темы можно добавить тонкий градиент или узор
    const getLightThemeBackground = () => {
        if (settings.theme === 'light') {
            return {
                background: settings.background === 'custom'
                    ? 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
                    : '#ffffff'
            };
        }
        return {};
    };

    return (
        <div
            className={`min-h-screen w-full relative transition-colors duration-300 ${getBackgroundClass()}`}
            style={getLightThemeBackground()}
        >
           <BackgroundCircles />

            {settings.theme === 'light' && settings.background === 'custom' && (
                <div className="absolute inset-0 opacity-5">
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: `radial-gradient(circle at 25% 25%, #0066cc 2px, transparent 2px),
                                            radial-gradient(circle at 75% 75%, #0066cc 1px, transparent 1px)`,
                            backgroundSize: '50px 50px'
                        }}
                    />
                </div>
            )}

            <div
                className="relative z-10 min-h-screen w-full"
                style={{ fontSize: `var(--base-font-size)` }}
            >
                {children}
            </div>

            <Footer />
        </div>
    );
};

export default PageLayout;