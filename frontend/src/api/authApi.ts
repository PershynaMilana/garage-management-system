import {
    LoginRequest,
    SignUpRequest,
    ForgotPasswordRequest,
    ChangePasswordRequest,
    AuthResponse,
    User
} from '../types/auth';

const API_BASE_URL = 'https://garage-management-system-backend-lwya.onrender.com/api';

const logRequest = (method: string, url: string, data?: any) => {
    console.log(`API Request: ${method} ${url}`);
    if (data) {
        console.log('Request data:', data);
    }
};

const logResponse = (method: string, url: string, response: any, duration: number) => {
    console.log(`API Response: ${method} ${url} (${duration}ms)`);
    console.log('Response data:', response);
};

const logError = (method: string, url: string, error: any, duration: number) => {
    console.log(`API Error: ${method} ${url} (${duration}ms)`);
    console.log('Error:', error);
};

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };
};

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

            return {
                user: {
                    id: responseData.user?.userId || 'unknown',
                    email: data.email,
                    fullName: responseData.user?.name || 'User',
                    phoneNumber: responseData.user?.phone || ''
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

        const apiData = {
            name: data.fullName,
            email: data.email,
            phone: data.phoneNumber,
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
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify(data),
            });

            await handleApiError(response);
            const responseData = await response.json();
            const duration = Date.now() - startTime;

            logResponse('POST', url, responseData, duration);

            return responseData;
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
            const response = await fetch(url, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(data),
            });

            await handleApiError(response);
            const responseData = await response.json();
            const duration = Date.now() - startTime;

            logResponse('POST', url, responseData, duration);

            return responseData;
        } catch (error: any) {
            const duration = Date.now() - startTime;
            logError('POST', url, error, duration);
            throw error;
        }
    },

    logout: async (): Promise<{ message: string }> => { 
        const url = `${API_BASE_URL}/auth/logout`;
        const startTime = Date.now();

        logRequest('POST', url);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: getAuthHeaders(),
            });

            await handleApiError(response);
            const responseData = await response.json(); 
            const duration = Date.now() - startTime;

            logResponse('POST', url, responseData, duration);
            return responseData;
        } catch (error: any) {
            const duration = Date.now() - startTime;
            logError('POST', url, error, duration);
            throw error;
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

            return {
                id: responseData.userId || 'unknown',
                email: responseData.email || '',
                fullName: responseData.name || 'User',
                phoneNumber: responseData.phone || '',
                photoUrl: responseData.photoUrl || undefined
            };
        } catch (error: any) {
            const duration = Date.now() - startTime;
            logError('GET', url, error, duration);
            throw error;
        }
    },

    updateProfile: async (data: {
        newName?: string;
        newEmail?: string;
        newPassword?: string;
        newPhoneNumber?: string;
    }): Promise<{ message: string }> => {
        const url = `${API_BASE_URL}/auth/profile`;
        const startTime = Date.now();

        const updateData: any = {};
        if (data.newName?.trim()) updateData.name = data.newName.trim();
        if (data.newEmail?.trim()) updateData.email = data.newEmail.trim();
        if (data.newPassword?.trim()) updateData.password = data.newPassword.trim();
        if (data.newPhoneNumber?.trim()) updateData.phone = data.newPhoneNumber.trim();

        logRequest('PUT', url, updateData);

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(updateData),
            });

            await handleApiError(response);
            const responseData = await response.json();
            const duration = Date.now() - startTime;

            logResponse('PUT', url, responseData, duration);

            return {
                message: responseData.message || 'Profile updated successfully'
            };
        } catch (error: any) {
            const duration = Date.now() - startTime;
            logError('PUT', url, error, duration);
            throw error;
        }
    },

    uploadProfilePhoto: async (file: File): Promise<{ message: string; photoUrl?: string }> => {
        const url = `${API_BASE_URL}/auth/profile/photo`;
        const startTime = Date.now();

        logRequest('POST', url, { fileName: file.name, fileSize: file.size });

        try {
            const formData = new FormData();
            formData.append('photo', file);

            const token = localStorage.getItem('token');
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    ...(token && { 'Authorization': `Bearer ${token}` })
                },
                body: formData,
            });

            await handleApiError(response);
            const responseData = await response.json();
            const duration = Date.now() - startTime;

            logResponse('POST', url, responseData, duration);

            return {
                message: responseData.message || 'Photo uploaded successfully',
                photoUrl: responseData.photoUrl
            };
        } catch (error: any) {
            const duration = Date.now() - startTime;
            logError('POST', url, error, duration);
            throw error;
        }
    }
};
