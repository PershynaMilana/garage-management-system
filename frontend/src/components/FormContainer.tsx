/**
 * Universal form container and message components
 * Consistent styling for form wrappers and status messages
 */

import React from 'react';

interface FormContainerProps {
    /** Child components */
    children: React.ReactNode;
}

interface MessageProps {
    /** Message text */
    message: string;
}

interface SubmitButtonProps {
    /** Whether button is in loading state */
    isLoading?: boolean;
    /** Whether button is disabled */
    disabled?: boolean;
    /** Text to show when loading */
    loadingText?: string;
    /** Button text */
    children: React.ReactNode;
}

/**
 * Form container with backdrop blur styling
 * @param props - Component props
 * @returns Rendered form container
 */
export const FormContainer: React.FC<FormContainerProps> = ({ children }) => (
    <div className="backdrop-blur-sm rounded-lg p-8 shadow-2xl border border-[#696969]/30">
        {children}
    </div>
);

/**
 * Error message component
 * @param props - Component props
 * @returns Rendered error message
 */
export const ErrorMessage: React.FC<MessageProps> = ({ message }) => (
    <div className="mb-6 p-4 bg-[#B63232]/20 border border-[#B63232]/50 rounded-lg">
        <p className="text-[#B63232] text-[10pt] font-[Ubuntu-Regular]">
            {message}
        </p>
    </div>
);

/**
 * Success message component
 * @param props - Component props
 * @returns Rendered success message
 */
export const SuccessMessage: React.FC<MessageProps> = ({ message }) => (
    <div className="mb-6 p-4 bg-[#22C55E]/20 border border-[#22C55E]/50 rounded-lg">
        <p className="text-[#22C55E] text-[10pt] font-[Ubuntu-Regular]">
            {message}
        </p>
    </div>
);

/**
 * Submit button with loading states
 * @param props - Component props
 * @returns Rendered submit button
 */
export const SubmitButton: React.FC<SubmitButtonProps> = ({
                                                              isLoading = false,
                                                              disabled = false,
                                                              loadingText = 'Loading...',
                                                              children
                                                          }) => (
    <button
        type="submit"
        disabled={isLoading || disabled}
        className="w-full bg-[#FFFFFF] text-[#0c0c18] py-4 px-6 rounded-lg
            font-[Ubuntu-Regular] text-[12pt] font-medium hover:bg-[#87d7de] hover:text-[#FFFFFF]
            focus:outline-none focus:ring-2 focus:ring-[#87d7de] focus:ring-offset-2
            focus:ring-offset-[#33455e] transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed"
    >
        {isLoading ? loadingText : children}
    </button>
);