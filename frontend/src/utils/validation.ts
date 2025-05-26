/**
 * Validation utilities for authentication forms
 * Contains pure validation functions for different field types
 */

/**
 * Validates email address format
 * @param email - Email string to validate
 * @returns Error message or undefined if valid
 */
export const validateEmail = (email: string): string | undefined => {
    if (!email) {
        return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }
    return undefined;
};

/**
 * Validates password with basic requirements (for login)
 * @param password - Password string to validate
 * @returns Error message or undefined if valid
 */
export const validatePassword = (password: string): string | undefined => {
    if (!password) {
        return 'Password is required';
    }
    if (password.length < 6) {
        return 'Password must be at least 6 characters long';
    }
    return undefined;
};

/**
 * Validates password with strong requirements (for registration/change)
 * @param password - Password string to validate
 * @returns Error message or undefined if valid
 */
export const validateStrongPassword = (password: string): string | undefined => {
    if (!password) {
        return 'Password is required';
    }
    if (password.length < 8) {
        return 'Password must be at least 8 characters long';
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    return undefined;
};

/**
 * Validates full name field
 * @param name - Full name string to validate
 * @returns Error message or undefined if valid
 */
export const validateFullName = (name: string): string | undefined => {
    if (!name.trim()) {
        return 'Full name is required';
    }
    if (name.trim().length < 2) {
        return 'Full name must be at least 2 characters long';
    }
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
        return 'Full name should contain only letters and spaces';
    }
    return undefined;
};

/**
 * Validates 6-digit verification code
 * @param code - Verification code string to validate
 * @returns Error message or undefined if valid
 */
export const validateCode = (code: string): string | undefined => {
    if (!code) {
        return 'Code is required';
    }
    if (!/^\d{6}$/.test(code)) {
        return 'Code must be 6 digits';
    }
    return undefined;
};

/**
 * Validates garage number field
 * @param garageNumber - Garage number string to validate
 * @returns Error message or undefined if valid
 */
export const validateGarageNumber = (garageNumber: string): string | undefined => {
    if (!garageNumber.trim()) {
        return 'Garage number is required';
    }
    if (!/^[A-Za-z0-9\-]+$/.test(garageNumber.trim())) {
        return 'Garage number should contain only letters, numbers, and hyphens';
    }
    return undefined;
};