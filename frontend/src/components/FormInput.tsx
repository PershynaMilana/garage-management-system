/**
 * Universal form input component
 * Reusable input field with consistent styling and error handling
 * HTML validation disabled - uses only custom validation
 */

import React from 'react';

interface FormInputProps {
    /** Field identifier */
    id: string;
    /** Field name for form submission */
    name: string;
    /** Field label text */
    label: string;
    /** Input type */
    type?: string;
    /** Placeholder text */
    placeholder?: string;
    /** Whether field is disabled */
    disabled?: boolean;
    /** Error message to display */
    error?: string;
    /** Additional input attributes (HTML validation attributes will be ignored) */
    inputProps?: Omit<React.InputHTMLAttributes<HTMLInputElement>,
        'required' | 'minLength' | 'maxLength' | 'pattern' | 'title'>;
    /** Custom CSS classes */
    className?: string;
}

/**
 * Universal form input component with consistent styling
 * HTML validation is disabled to use only custom validation
 * @param props - Component props
 * @returns Rendered form input field
 */
const FormInput: React.FC<FormInputProps> = ({
                                                 id,
                                                 name,
                                                 label,
                                                 type = 'text',
                                                 placeholder,
                                                 disabled = false,
                                                 error,
                                                 inputProps,
                                                 className = ''
                                             }) => {
    const baseInputClasses = `w-full px-4 py-4 bg-[#527f8b]/50 border rounded-lg
        text-[#FFFFFF] placeholder-[#FFFFFF]/50 font-[Ubuntu-Regular] text-[12pt]
        focus:outline-none focus:ring-2 transition-all duration-200 backdrop-blur-sm`;

    const errorClasses = error
        ? 'border-[#B63232] focus:ring-[#B63232] focus:border-[#B63232]'
        : 'border-[#4e6b8c] focus:ring-[#87d7de] focus:border-[#87d7de]';

    const inputClasses = `${baseInputClasses} ${errorClasses} ${className}`;

    return (
        <div>
            <label
                htmlFor={id}
                className="block text-[#FFFFFF] font-[Ubuntu-Regular] text-[12pt] mb-3"
            >
                {label}
            </label>
            <input
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                className={inputClasses}
                disabled={disabled}
                {...inputProps}
            />
            {error && (
                <p className="mt-2 text-[#B63232] text-[10pt] font-[Ubuntu-Regular]">
                    {error}
                </p>
            )}
        </div>
    );
};

export default FormInput;