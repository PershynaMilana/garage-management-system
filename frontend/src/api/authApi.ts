import {
    LoginRequest,
    SignUpRequest,
    ForgotPasswordRequest,
    ChangePasswordRequest,
    AuthResponse,
    User
} from '../types/auth';

// Базовый URL для API
const API_BASE_URL = 'http://localhost:3000/api';

// Утилита для логирования запросов
const logRequest = (method: string, url: string, data?: any) => {
    console.log(`🌐 API Request: ${method} ${url}`);
    if (data) {
        console.log('📤 Request data:', data);
    }
};

// Утилита для логирования ответов
const logResponse = (method: string, url: string, response: any, duration: number) => {
    console.log(`✅ API Response: ${method} ${url} (${duration}ms)`);
    console.log('📥 Response data:', response);
};

// Утилита для логирования ошибок
const logError = (method: string, url: string, error: any, duration: number) => {
    console.log(`❌ API Error: ${method} ${url} (${duration}ms)`);
    console.log('💥 Error:', error);
};

// Утилита для создания headers с токеном
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };
};

// Обработка ошибок API
const handleApiError = async (response: Response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
    }
    return response;
};

export const authApi = {

    login: async (data: LoginRequest): Promise<AuthResponse> => {
        const url = `${API_BASE_URL}/auth/login`;
        const startTime = Date.now();

        logRequest('POST', url, data);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            await handleApiError(response);
            const responseData = await response.json();
            const duration = Date.now() - startTime;

            logResponse('POST', url, responseData, duration);

            // Преобразуем ответ в нужный формат
            return {
                user: {
                    id: responseData.user?.id || 'unknown',
                    email: data.email,
                    fullName: responseData.user?.name || 'User',
                    garageNumber: responseData.user?.phone || ''
                },
                token: responseData.token
            };
        } catch (error: any) {
            const duration = Date.now() - startTime;
            logError('POST', url, error, duration);
            throw error;
        }
    },

    signUp: async (data: SignUpRequest): Promise<AuthResponse> => {
        const url = `${API_BASE_URL}/auth/register`;
        const startTime = Date.now();

        // Преобразуем данные в формат API
        const apiData = {
            name: data.fullName,
            email: data.email,
            phone: data.garageNumber,
            password: data.password
        };

        logRequest('POST', url, apiData);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apiData),
            });

            await handleApiError(response);
            const responseData = await response.json();
            const duration = Date.now() - startTime;

            logResponse('POST', url, responseData, duration);

            // После успешной регистрации логинимся
            return await authApi.login({
                email: data.email,
                password: data.password
            });
        } catch (error: any) {
            const duration = Date.now() - startTime;
            logError('POST', url, error, duration);
            throw error;
        }
    },

    forgotPassword: async (data: ForgotPasswordRequest): Promise<{ message: string }> => {
        const url = `${API_BASE_URL}/auth/forgot-password`;
        const startTime = Date.now();

        logRequest('POST', url, data);

        try {
            // TODO: Заменить на реальный API когда будет endpoint
            await new Promise(resolve => setTimeout(resolve, 1000));
            const duration = Date.now() - startTime;

            const response = { message: 'Password reset code sent to your email' };
            logResponse('POST', url, response, duration);

            return response;
        } catch (error: any) {
            const duration = Date.now() - startTime;
            logError('POST', url, error, duration);
            throw error;
        }
    },

    changePassword: async (data: ChangePasswordRequest): Promise<{ message: string }> => {
        const url = `${API_BASE_URL}/auth/change-password`;
        const startTime = Date.now();

        logRequest('POST', url, data);

        try {
            // Для демо принимаем код 693415
            if (data.code !== '693415') {
                throw new Error('Invalid verification code');
            }

            // TODO: Заменить на реальный API когда будет endpoint для смены пароля через код
            await new Promise(resolve => setTimeout(resolve, 1000));
            const duration = Date.now() - startTime;

            const response = { message: 'Password changed successfully' };
            logResponse('POST', url, response, duration);

            return response;
        } catch (error: any) {
            const duration = Date.now() - startTime;
            logError('POST', url, error, duration);
            throw error;
        }
    },

    logout: async (): Promise<void> => {
        const url = `${API_BASE_URL}/auth/logout`;
        const startTime = Date.now();

        logRequest('POST', url);

        try {
            // Простое удаление токена (можно добавить API вызов если нужно)
            await new Promise(resolve => setTimeout(resolve, 500));
            const duration = Date.now() - startTime;

            logResponse('POST', url, { message: 'Logged out successfully' }, duration);
        } catch (error: any) {
            const duration = Date.now() - startTime;
            logError('POST', url, error, duration);
            // Не бросаем ошибку для logout
        }
    },

    getProfile: async (): Promise<User> => {
        const url = `${API_BASE_URL}/auth/me`;
        const startTime = Date.now();

        logRequest('GET', url);

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: getAuthHeaders(),
            });

            await handleApiError(response);
            const responseData = await response.json();
            const duration = Date.now() - startTime;

            logResponse('GET', url, responseData, duration);

            // Преобразуем ответ в нужный формат
            return {
                id: responseData.id || 'unknown',
                email: responseData.email || '',
                fullName: responseData.name || 'User',
                garageNumber: responseData.phone || ''
            };
        } catch (error: any) {
            const duration = Date.now() - startTime;
            logError('GET', url, error, duration);
            throw error;
        }
    }
};