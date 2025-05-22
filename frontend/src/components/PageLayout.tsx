import React from 'react';
import BackgroundCircles from './BackgroundCircles';

interface PageLayoutProps {
    children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen w-full bg-[#0c0c18] relative">
            <BackgroundCircles />

            <div className="relative z-10 min-h-screen w-full">
                {children}
            </div>
        </div>
    );
};

export default PageLayout;