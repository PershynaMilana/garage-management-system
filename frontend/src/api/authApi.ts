import {
    LoginRequest,
    SignUpRequest,
    ForgotPasswordRequest,
    ChangePasswordRequest,
    AuthResponse,
    User
} from '../types/auth';

export const authApi = {

    login: async (data: LoginRequest): Promise<AuthResponse> => {
        console.log('API: Login request', data);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (data.email === 'test@example.com' && data.password === 'password') {
                    resolve({
                        user: {
                            id: '1',
                            email: data.email,
                            fullName: 'Test User',
                            garageNumber: '123'
                        },
                        token: 'fake-jwt-token'
                    });
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 1000);
        });
    },

    signUp: async (data: SignUpRequest): Promise<AuthResponse> => {
        console.log('API: Sign up request', data);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (data.email && data.password && data.fullName) {
                    resolve({
                        user: {
                            id: Math.random().toString(36).substr(2, 9),
                            email: data.email,
                            fullName: data.fullName,
                            garageNumber: data.garageNumber
                        },
                        token: 'fake-jwt-token'
                    });
                } else {
                    reject(new Error('Invalid data'));
                }
            }, 1000);
        });
    },

    forgotPassword: async (data: ForgotPasswordRequest): Promise<{ message: string }> => {
        console.log('API: Forgot password request', data);

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    message: 'Password reset code sent to your email'
                });
            }, 1000);
        });
    },

    changePassword: async (data: ChangePasswordRequest): Promise<{ message: string }> => {
        console.log('API: Change password request', data);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (data.code === '693415') {
                    resolve({
                        message: 'Password changed successfully'
                    });
                } else {
                    reject(new Error('Invalid code'));
                }
            }, 1000);
        });
    },

    logout: async (): Promise<void> => {
        console.log('API: Logout request');

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 500);
        });
    },

    getProfile: async (): Promise<User> => {
        console.log('API: Get profile request');

        return new Promise((resolve, reject) => {
            const token = localStorage.getItem('token');

            setTimeout(() => {
                if (token) {
                    resolve({
                        id: '1',
                        email: 'test@example.com',
                        fullName: 'Test User',
                        garageNumber: '123'
                    });
                } else {
                    reject(new Error('No token'));
                }
            }, 500);
        });
    }
};