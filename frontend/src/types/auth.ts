/**
 * @fileoverview Type definitions for authentication system
 */

/**
 * User entity representing authenticated user data
 * @interface User
 */
export interface User {
    /** Unique user identifier */
    id: string; // Або number, залежить від бекенду
    /** User's email address */
    email: string;
    /** User's full name */
    fullName: string;
    /** Optional phone number associated with the user */
    phoneNumber?: string;
    /** Optional URL to user's profile photo */
    photoUrl?: string; // Додано для синхронізації з бекендом
}

/**
 * Authentication state structure for Redux store
 * @interface AuthState
 */
export interface AuthState {
    /** Current authenticated user data */
    user: User | null;
    /** JWT authentication token */
    token: string | null;
    /** Loading state for async operations */
    isLoading: boolean;
    /** Error message from failed operations */
    error: string | null;
    /** Whether user is currently authenticated */
    isAuthenticated: boolean;
}

/**
 * Request payload for user login
 * @interface LoginRequest
 */
export interface LoginRequest {
    /** User's email address */
    email: string;
    /** User's password */
    password: string;
}

/**
 * Request payload for user registration
 * @interface SignUpRequest
 */
export interface SignUpRequest {
    /** User's full name */
    fullName: string;
    /** User's email address */
    email: string;
    /** User's chosen password */
    password: string;
    /** User's phone number */
    phoneNumber: string;
}

/**
 * Request payload for forgot password functionality
 * @interface ForgotPasswordRequest
 */
export interface ForgotPasswordRequest {
    /** User's email address to send reset code */
    email: string;
}

/**
 * Request payload for password change
 * @interface ChangePasswordRequest
 */
export interface ChangePasswordRequest {
    /** Old password to verify */
    oldPassword: string; // Змінено з 'code'
    /** New password to set */
    newPassword: string;
}

/**
 * Successful authentication response from API
 * @interface AuthResponse
 */
export interface AuthResponse {
    /** Authenticated user data */
    user: User; // Тип User тепер включає photoUrl
    /** JWT authentication token */
    token: string;
}

/**
 * API error response structure
 * @interface ApiError
 */
export interface ApiError {
    /** Error message describing what went wrong */
    message: string;
    /** HTTP status code */
    status: number;
}
