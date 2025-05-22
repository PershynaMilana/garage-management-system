// Типы для авторизации
export interface User {
    id: string;
    email: string;
    fullName: string;
    garageNumber?: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface SignUpRequest {
    fullName: string;
    email: string;
    password: string;
    garageNumber: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ChangePasswordRequest {
    code: string;
    newPassword: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface ApiError {
    message: string;
    status: number;
}