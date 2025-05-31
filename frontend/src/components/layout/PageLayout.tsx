import React from 'react';
import BackgroundCircles from './BackgroundCircles.tsx';
import Footer from '../Footer.tsx';
import Header from '../Header.tsx';
import useTheme from "../../hooks/useTheme.ts";

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
            {/* Header */}
            <Header />

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

            {/* Main content */}
            <div
                className="relative z-10 w-full md:pl-16 pt-16 md:pt-0"
                style={{
                    fontSize: `var(--base-font-size)`,
                    minHeight: 'calc(100vh - 64px)'
                }}
            >
                <div className="min-h-full pb-20">
                    {children}
                </div>
            </div>

            {/* Footer */}
            <div className="md:pl-16">
                <Footer />
            </div>
        </div>
    );
};

export default PageLayout;