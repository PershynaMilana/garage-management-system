/**
 * React 19 server actions for authentication forms
 * Contains form actions and state interfaces with updated types
 */

import { AppDispatch } from '../store/store';
import {
    validateEmail,
    validatePassword, // Використовуємо validatePassword для старого пароля
    validateStrongPassword,
    validateFullName,
    validateCode, // Залишаємо validateCode, якщо він використовується в інших місцях, але не для changePassword
    validatePhoneNumber
} from '../utils/validation';
import { changePassword, forgotPassword, loginUser, registerUser } from "../store/authSlice";
import { LoginRequest, SignUpRequest } from '../types/auth';

// Form state interfaces
export interface LoginFormState {
    errors: {
        email?: string;
        password?: string;
        general?: string;
    };
    success: boolean;
}

export interface RegisterFormState {
    errors: {
        fullName?: string;
        email?: string;
        password?: string;
        phoneNumber?: string;
        general?: string;
    };
    success: boolean;
}

export interface ForgotPasswordFormState {
    errors: {
        email?: string;
        general?: string;
    };
    success: boolean;
    codeSent: boolean;
}

export interface ChangePasswordFormState {
    errors: {
        oldPassword?: string; // Змінено з 'code' на 'oldPassword'
        newPassword?: string;
        general?: string;
    };
    success: boolean;
}

// Initial states
export const initialLoginState: LoginFormState = {
    errors: {},
    success: false
};

export const initialRegisterState: RegisterFormState = {
    errors: {},
    success: false
};

export const initialForgotPasswordState: ForgotPasswordFormState = {
    errors: {},
    success: false,
    codeSent: false
};

export const initialChangePasswordState: ChangePasswordFormState = {
    errors: {},
    success: false
};

/**
 * Creates login action for React 19 useActionState
 * @param dispatch - Redux dispatch function
 * @returns Server action function
 */
export const createLoginAction = (dispatch: AppDispatch) => {
    return async function loginAction(
        _prevState: LoginFormState,
        formData: FormData
    ): Promise<LoginFormState> {
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        // Validate form data
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        if (emailError || passwordError) {
            return {
                errors: {
                    email: emailError,
                    password: passwordError
                },
                success: false
            };
        }

        try {
            const credentials: LoginRequest = { email, password };
            const result = await dispatch(loginUser(credentials));

            if (loginUser.fulfilled.match(result)) {
                return { errors: {}, success: true };
            } else {
                const errorMessage = result.payload as string || 'Login failed. Please check your credentials.';
                return {
                    errors: { general: errorMessage },
                    success: false
                };
            }
        } catch (err) {
            console.error('Login action error:', err);
            return {
                errors: { general: 'An unexpected error occurred. Please try again.' },
                success: false
            };
        }
    };
};

/**
 * Creates register action for React 19 useActionState
 * @param dispatch - Redux dispatch function
 * @returns Server action function
 */
export const createRegisterAction = (dispatch: AppDispatch) => {
    return async function registerAction(
        _prevState: RegisterFormState,
        formData: FormData
    ): Promise<RegisterFormState> {
        const fullName = formData.get('fullName') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const phoneNumber = formData.get('phoneNumber') as string;

        // Validate form data
        const nameError = validateFullName(fullName);
        const emailError = validateEmail(email);
        const passwordError = validateStrongPassword(password);
        const phoneError = validatePhoneNumber(phoneNumber);

        // Виправлено: Перевіряємо наявність помилок валідації, а не значення полів
        if (nameError || emailError || passwordError || phoneError) {
            return {
                errors: {
                    fullName: nameError,
                    email: emailError,
                    password: passwordError,
                    phoneNumber: phoneError
                },
                success: false
            };
        }

        try {
            const userData: SignUpRequest = {
                fullName: fullName.trim(),
                email: email.trim(),
                password,
                phoneNumber: phoneNumber.trim()
            };

            const result = await dispatch(registerUser(userData));

            if (registerUser.fulfilled.match(result)) {
                return { errors: {}, success: true };
            } else {
                const errorMessage = result.payload as string || 'Registration failed. This email might already be in use.';
                return {
                    errors: { general: errorMessage },
                    success: false
                };
            }
        } catch (err) {
            console.error('Registration action error:', err);
            return {
                errors: { general: 'An unexpected error occurred. Please try again.' },
                success: false
            };
        }
    };
};

/**
 * Creates forgot password action for React 19 useActionState
 * @param dispatch - Redux dispatch function
 * @returns Server action function
 */
export const createForgotPasswordAction = (dispatch: AppDispatch) => {
    return async function sendCodeAction(
        _prevState: ForgotPasswordFormState,
        formData: FormData
    ): Promise<ForgotPasswordFormState> {
        const email = formData.get('email') as string;

        // Validate email
        const emailError = validateEmail(email);

        if (emailError) {
            return {
                errors: { email: emailError },
                success: false,
                codeSent: false
            };
        }

        try {
            const result = await dispatch(forgotPassword({ email }));

            if (forgotPassword.fulfilled.match(result)) {
                return { errors: {}, success: true, codeSent: true };
            } else {
                const errorMessage = result.payload as string || 'Failed to send code. Please check your email address.';
                return {
                    errors: { general: errorMessage },
                    success: false,
                    codeSent: false
                };
            }
        } catch (err) {
            console.error('Forgot password action error:', err);
            return {
                errors: { general: 'An unexpected error occurred. Please try again.' },
                success: false,
                codeSent: false
            };
        }
    };
};

/**
 * Creates change password action for React 19 useActionState
 * @param dispatch - Redux dispatch function
 * @param navigate - Navigation function
 * @returns Server action function
 */
export const createChangePasswordAction = (dispatch: AppDispatch, navigate: (path: string) => void) => {
    return async function changePasswordAction(
        _prevState: ChangePasswordFormState,
        formData: FormData
    ): Promise<ChangePasswordFormState> {
        // Змінено: отримуємо oldPassword замість code
        const oldPassword = formData.get('oldPassword') as string; 
        const newPassword = formData.get('newPassword') as string;

        // Validate form data
        // Змінено: використовуємо validatePassword для oldPassword
        const oldPasswordError = validatePassword(oldPassword); 
        const newPasswordError = validateStrongPassword(newPassword); // Змінено назву змінної для ясності

        // Змінено: перевіряємо oldPasswordError замість codeError
        if (oldPasswordError || newPasswordError) { 
            return {
                errors: {
                    oldPassword: oldPasswordError, // Змінено з 'code' на 'oldPassword'
                    newPassword: newPasswordError
                },
                success: false
            };
        }

        try {
            // Змінено: передаємо oldPassword замість code
            const result = await dispatch(changePassword({ oldPassword, newPassword })); 

            if (changePassword.fulfilled.match(result)) {
                // Redirect to the login page after 3 seconds
                setTimeout(() => {
                    navigate('/login');
                }, 3000);

                return { errors: {}, success: true };
            } else {
                const errorMessage = result.payload as string || 'Failed to change password. Please check your credentials and try again.'; // Оновлено повідомлення
                return {
                    errors: { general: errorMessage },
                    success: false
                };
            }
        } catch (err) {
            console.error('Change password action error:', err);
            return {
                errors: { general: 'An unexpected error occurred. Please try again.' },
                success: false
            };
        }
    };
};
