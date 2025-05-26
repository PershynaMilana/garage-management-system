/**
 * @fileoverview Redux slice for authentication state management
 * Contains async thunks for API calls and reducers for state updates
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * User entity representing authenticated user data
 * @interface User
 */
export interface User {
    /** Unique user identifier */
    id: string;
    /** User's email address */
    email: string;
    /** User's full name */
    fullName: string;
    /** Optional garage number associated with the user */
    garageNumber?: string;
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
 * @interface RegisterRequest
 */
export interface RegisterRequest {
    /** User's full name */
    fullName: string;
    /** User's email address */
    email: string;
    /** User's chosen password */
    password: string;
    /** User's garage number */
    garageNumber: string;
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
    /** Verification code from email */
    code: string;
    /** New password to set */
    newPassword: string;
}

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
 * Async thunk for user login
 * @param credentials - User email and password
 * @returns Promise with user data and token
 * @example
 * dispatch(loginUser({ email: 'user@example.com', password: 'password' }));
 */
export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials: LoginRequest, { rejectWithValue }) => {
        try {
            console.log('Login attempt:', credentials);

            // Mock API call - replace with actual API
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (credentials.email === 'test@example.com' && credentials.password === 'password') {
                const response = {
                    user: {
                        id: '1',
                        email: credentials.email,
                        fullName: 'Test User',
                        garageNumber: '123'
                    },
                    token: 'fake-jwt-token-' + Date.now()
                };

                // Save token to localStorage
                localStorage.setItem('token', response.token);
                return response;
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Async thunk for user registration
 * @param userData - User registration data
 * @returns Promise with user data and token
 * @example
 * dispatch(registerUser({ fullName: 'John Doe', email: 'john@example.com', password: 'password', garageNumber: '123' }));
 */
export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData: RegisterRequest, { rejectWithValue }) => {
        try {
            console.log('Register attempt:', userData);

            // Mock API call - replace with actual API
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (userData.email && userData.password && userData.fullName) {
                const response = {
                    user: {
                        id: Math.random().toString(36).substr(2, 9),
                        email: userData.email,
                        fullName: userData.fullName,
                        garageNumber: userData.garageNumber
                    },
                    token: 'fake-jwt-token-' + Date.now()
                };

                // Save token to localStorage
                localStorage.setItem('token', response.token);
                return response;
            } else {
                throw new Error('Please fill in all fields');
            }
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Async thunk for forgot password
 * Sends verification code to user's email
 * @param data - Email address for password reset
 * @returns Promise with success message
 * @example
 * dispatch(forgotPassword({ email: 'user@example.com' }));
 */
export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (data: ForgotPasswordRequest, { rejectWithValue }) => {
        try {
            console.log('Forgot password attempt:', data);

            // Mock API call - replace with actual API
            await new Promise(resolve => setTimeout(resolve, 1000));

            return { message: 'Verification code sent to your email' };
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Async thunk for password change
 * Changes user password using verification code
 * @param data - Verification code and new password
 * @returns Promise with success message
 * @example
 * dispatch(changePassword({ code: '693415', newPassword: 'newPassword123' }));
 */
export const changePassword = createAsyncThunk(
    'auth/changePassword',
    async (data: ChangePasswordRequest, { rejectWithValue }) => {
        try {
            console.log('Change password attempt:', data);

            // Mock API call - replace with actual API
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (data.code === '693415') {
                return { message: 'Password successfully changed' };
            } else {
                throw new Error('Invalid verification code');
            }
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Async thunk for user logout
 * Clears authentication data and removes token from storage
 * @returns Promise with null
 * @example
 * dispatch(logoutUser());
 */
export const logoutUser = createAsyncThunk(
    'auth/logout',
    async () => {
        localStorage.removeItem('token');
        return null;
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
         * @param state - Current auth state
         */
        clearError: (state) => {
            state.error = null;
        },
        /**
         * Sets loading state manually
         * @param state - Current auth state
         * @param action - Action with loading boolean payload
         */
        setLoading: (state, action) => {
            state.isLoading = action.payload;
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
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.isAuthenticated = false;
            })

            // Register user reducers
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
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
            });
    },
});

// Export actions and reducer
export const { clearError, setLoading } = authSlice.actions;
export default authSlice.reducer;