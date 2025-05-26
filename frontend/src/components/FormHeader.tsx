/**
 * Universal form header component
 * Consistent header styling for all authentication forms
 */

import React from 'react';

interface FormHeaderProps {
    /** Main title text */
    title: string;
    /** Subtitle text */
    subtitle: string;
}

/**
 * Universal form header with consistent styling
 * @param props - Component props
 * @returns Rendered form header
 */
const FormHeader: React.FC<FormHeaderProps> = ({ title, subtitle }) => {
    return (
        <div className="text-center mb-8">
            <div className="w-full h-0.5 bg-[#87d7de] mx-auto mb-4"></div>
            <h2 className="text-[24pt] sm:text-[36pt] font-[IBMPlexMono-Regular] text-[#FFFFFF] mb-4">
                {title}
            </h2>
            <h2 className="text-[#FFFFFF] font-[IBMPlexMono-Regular] text-[18pt]">
                {subtitle}
            </h2>
            <div className="w-full h-0.5 bg-[#87d7de] mx-auto my-4"></div>
        </div>
    );
};

export default FormHeader;