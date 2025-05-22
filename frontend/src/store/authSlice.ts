import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Типы
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

// Типы для запросов
export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
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

// Начальное состояние
const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('token'),
    isLoading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem('token'),
};

// Async Thunks (заглушки для API)
export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials: LoginRequest, { rejectWithValue }) => {
        try {
            console.log('Login attempt:', credentials);

            // Заглушка API
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

                // Сохраняем токен
                localStorage.setItem('token', response.token);
                return response;
            } else {
                throw new Error('Неверные учетные данные');
            }
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData: RegisterRequest, { rejectWithValue }) => {
        try {
            console.log('Register attempt:', userData);

            // Заглушка API
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

                // Сохраняем токен
                localStorage.setItem('token', response.token);
                return response;
            } else {
                throw new Error('Заполните все поля');
            }
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (data: ForgotPasswordRequest, { rejectWithValue }) => {
        try {
            console.log('Forgot password attempt:', data);

            // Заглушка API
            await new Promise(resolve => setTimeout(resolve, 1000));

            return { message: 'Код отправлен на вашу почту' };
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const changePassword = createAsyncThunk(
    'auth/changePassword',
    async (data: ChangePasswordRequest, { rejectWithValue }) => {
        try {
            console.log('Change password attempt:', data);

            // Заглушка API
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (data.code === '693415') {
                return { message: 'Пароль успешно изменен' };
            } else {
                throw new Error('Неверный код');
            }
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async () => {
        localStorage.removeItem('token');
        return null;
    }
);

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    },
    extraReducers: (builder) => {
        // Login
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

            // Register
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

            // Forgot Password
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

            // Change Password
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

            // Logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.error = null;
            });
    },
});

export const { clearError, setLoading } = authSlice.actions;
export default authSlice.reducer;