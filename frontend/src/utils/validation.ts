export interface ValidationRule {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => boolean;
}

export interface ValidationResult {
    isValid: boolean;
    error?: string;
}

export class Validator {
    // Email validation
    static validateEmail(email: string): ValidationResult {
        if (!email) {
            return { isValid: false, error: 'Email is required' };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { isValid: false, error: 'Please enter a valid email address' };
        }

        return { isValid: true };
    }

    // Password validation
    static validatePassword(password: string, minLength: number = 8): ValidationResult {
        if (!password) {
            return { isValid: false, error: 'Password is required' };
        }

        if (password.length < minLength) {
            return { isValid: false, error: `Password must be at least ${minLength} characters long` };
        }

        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            return {
                isValid: false,
                error: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
            };
        }

        return { isValid: true };
    }

    // Simple password validation (for login)
    static validateSimplePassword(password: string, minLength: number = 6): ValidationResult {
        if (!password) {
            return { isValid: false, error: 'Password is required' };
        }

        if (password.length < minLength) {
            return { isValid: false, error: `Password must be at least ${minLength} characters long` };
        }

        return { isValid: true };
    }

    // Full name validation
    static validateFullName(name: string): ValidationResult {
        if (!name.trim()) {
            return { isValid: false, error: 'Full name is required' };
        }

        if (name.trim().length < 2) {
            return { isValid: false, error: 'Full name must be at least 2 characters long' };
        }

        if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
            return { isValid: false, error: 'Full name should contain only letters and spaces' };
        }

        return { isValid: true };
    }

    // Verification code validation
    static validateCode(code: string): ValidationResult {
        if (!code) {
            return { isValid: false, error: 'Code is required' };
        }

        if (!/^\d{6}$/.test(code)) {
            return { isValid: false, error: 'Code must be 6 digits' };
        }

        return { isValid: true };
    }

    // Garage number validation
    static validateGarageNumber(garageNumber: string): ValidationResult {
        if (!garageNumber.trim()) {
            return { isValid: false, error: 'Garage number is required' };
        }

        if (!/^[A-Za-z0-9\-]+$/.test(garageNumber.trim())) {
            return { isValid: false, error: 'Garage number should contain only letters, numbers, and hyphens' };
        }

        return { isValid: true };
    }

    // Generic field validation
    static validateField(value: string, rules: ValidationRule, fieldName: string): ValidationResult {
        if (rules.required && !value.trim()) {
            return { isValid: false, error: `${fieldName} is required` };
        }

        if (rules.minLength && value.length < rules.minLength) {
            return {
                isValid: false,
                error: `${fieldName} must be at least ${rules.minLength} characters long`
            };
        }

        if (rules.maxLength && value.length > rules.maxLength) {
            return {
                isValid: false,
                error: `${fieldName} must be no more than ${rules.maxLength} characters long`
            };
        }

        if (rules.pattern && !rules.pattern.test(value)) {
            return {
                isValid: false,
                error: `${fieldName} format is invalid`
            };
        }

        if (rules.custom && !rules.custom(value)) {
            return {
                isValid: false,
                error: `${fieldName} is invalid`
            };
        }

        return { isValid: true };
    }

    // Validate multiple fields at once
    static validateForm(data: Record<string, string>, rules: Record<string, ValidationRule>): Record<string, string> {
        const errors: Record<string, string> = {};

        Object.keys(rules).forEach(fieldName => {
            const value = data[fieldName] || '';
            const result = this.validateField(value, rules[fieldName], fieldName);

            if (!result.isValid && result.error) {
                errors[fieldName] = result.error;
            }
        });

        return errors;
    }
}

// Predefined validation rules for common use cases
export const ValidationRules = {
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
        required: true,
        minLength: 8,
        custom: (value: string) => /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)
    },
    simplePassword: {
        required: true,
        minLength: 6
    },
    fullName: {
        required: true,
        minLength: 2,
        pattern: /^[a-zA-Z\s]+$/
    },
    code: {
        required: true,
        pattern: /^\d{6}$/
    },
    garageNumber: {
        required: true,
        pattern: /^[A-Za-z0-9\-]+$/
    }
} as const;