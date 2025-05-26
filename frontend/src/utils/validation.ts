/**
 * Validation utilities for authentication forms
 * Contains pure validation functions for different field types with i18n support
 */

import i18n from '../i18n'; // Путь к вашему i18n файлу

/**
 * Validates email address format
 * @param email - Email string to validate
 * @returns Error message or undefined if valid
 */
export const validateEmail = (email: string): string | undefined => {
    if (!email) {
        return i18n.t('validation.email.required');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return i18n.t('validation.email.invalid');
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
        return i18n.t('validation.password.required');
    }
    if (password.length < 6) {
        return i18n.t('validation.password.minLength');
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
        return i18n.t('validation.strongPassword.required');
    }
    if (password.length < 8) {
        return i18n.t('validation.strongPassword.minLength');
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        return i18n.t('validation.strongPassword.complexity');
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
        return i18n.t('validation.fullName.required');
    }
    if (name.trim().length < 2) {
        return i18n.t('validation.fullName.minLength');
    }
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
        return i18n.t('validation.fullName.invalid');
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
        return i18n.t('validation.code.required');
    }
    if (!/^\d{6}$/.test(code)) {
        return i18n.t('validation.code.invalid');
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
        return i18n.t('validation.garageNumber.required');
    }
    if (!/^[A-Za-z0-9\-]+$/.test(garageNumber.trim())) {
        return i18n.t('validation.garageNumber.invalid');
    }
    return undefined;
};