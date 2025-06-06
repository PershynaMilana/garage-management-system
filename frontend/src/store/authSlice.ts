/**
 * @fileoverview Redux slice for authentication state management with real API calls
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';
import {
    AuthState,
    LoginRequest,
    SignUpRequest,
    ForgotPasswordRequest,
    ChangePasswordRequest,
    User // Імпортуємо інтерфейс User
} from '../types/auth';

/**
 * Initial authentication state
 * Checks localStorage for existing token to maintain session
 */
const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('token'),
    isLoading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem('token'),
};

/**
 * Async thunk for user login with real API
 */
export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials: LoginRequest, { rejectWithValue }) => {
        try {
            console.log('Login attempt:', credentials);

            const response = await authApi.login(credentials);

            // Save token to localStorage
            localStorage.setItem('token', response.token);

            // Повертаємо повний об'єкт користувача з токеном
            return { user: response.user, token: response.token };
        } catch (error: any) {
            console.error('Login error:', error);
            return rejectWithValue(error.message || 'Login failed');
        }
    }
);

/**
 * Async thunk for user registration with real API
 */
export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData: SignUpRequest, { rejectWithValue }) => {
        try {
            console.log('Register attempt:', userData);

            const response = await authApi.signUp(userData);

            // authApi.signUp вже викликає login, тому токен буде збережено там
            // Повертаємо повний об'єкт користувача з токеном
            return { user: response.user, token: response.token };
        } catch (error: any) {
            console.error('Registration error:', error);
            return rejectWithValue(error.message || 'Registration failed');
        }
    }
);

/**
 * Async thunk for forgot password
 */
export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (data: ForgotPasswordRequest, { rejectWithValue }) => {
        try {
            console.log('Forgot password attempt:', data);

            const response = await authApi.forgotPassword(data);
            return response;
        } catch (error: any) {
            console.error('Forgot password error:', error);
            return rejectWithValue(error.message || 'Failed to send reset code');
        }
    }
);

/**
 * Async thunk for password change
 */
export const changePassword = createAsyncThunk(
    'auth/changePassword',
    async (data: ChangePasswordRequest, { rejectWithValue }) => {
        try {
            console.log('Change password attempt:', data);

            const response = await authApi.changePassword(data);
            return response;
        } catch (error: any) {
            console.error('Change password error:', error);
            return rejectWithValue(error.message || 'Failed to change password');
        }
    }
);

/**
 * Async thunk for user logout
 */
export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            localStorage.removeItem('token');
            await authApi.logout(); 
            return null;
        } catch (error: any) {
            console.error('Logout API error:', error);
            return rejectWithValue(error.message || 'Logout failed at API level');
        }
    }
);

/**
 * Async thunk for validating existing token
 */
export const validateCurrentToken = createAsyncThunk(
    'auth/validateToken',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            const user = await authApi.getProfile();
            // Повертаємо повний об'єкт користувача з токеном
            return {
                user,
                token
            };
        } catch (error: any) {
            console.error('Token validation error:', error);
            localStorage.removeItem('token');
            return rejectWithValue(error.message || 'Token validation failed');
        }
    }
);

/**
 * Authentication slice with reducers and extra reducers for async actions
 */
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        /**
         * Clears any authentication error
         */
        clearError: (state) => {
            state.error = null;
        },
        /**
         * Sets loading state manually
         */
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        /**
         * Manually clear auth state (for logout without API call)
         */
        clearAuth: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem('token');
        },
        // НОВИЙ РЕДУКТОР: Оновлення даних користувача в стані Redux
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        // Login user reducers
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user; // Встановлюємо повний об'єкт user
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
            })

            // Register user reducers
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user; // Встановлюємо повний об'єкт user
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
            })

            // Validate token reducers
            .addCase(validateCurrentToken.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(validateCurrentToken.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user; // Встановлюємо повний об'єкт user
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(validateCurrentToken.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.error = null;
            })

            // Forgot password reducers
            .addCase(forgotPassword.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            // Change password reducers
            .addCase(changePassword.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            // Logout user reducers
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.error = action.payload as string;
            });
    },
});

// Експортуємо новий екшн setUser
export const { clearError, setLoading, clearAuth, setUser } = authSlice.actions;
export default authSlice.reducer;
