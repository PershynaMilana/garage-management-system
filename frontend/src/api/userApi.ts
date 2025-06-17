import axios from 'axios';
import { User, UserListResponse, UserQueryParams, UserRole } from '../types/user'; 

const API_BASE_URL = 'https://garage-management-system-backend-lwya.onrender.com/api';

export const userApi = {
    getAllUsers: async (params: UserQueryParams): Promise<UserListResponse> => {
        try {
            const response = await axios.get<UserListResponse>(`${API_BASE_URL}/users`, { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    getUserById: async (userId: number): Promise<User> => {
        try {
            const response = await axios.get<User>(`${API_BASE_URL}/users/${userId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching user with ID ${userId}:`, error);
            throw error;
        }
    },

    updateUserRole: async (userId: number, newRole: UserRole): Promise<{ success: boolean; message: string }> => {
        try {
            const response = await axios.put<{ success: boolean; message: string }>(`${API_BASE_URL}/users/${userId}/role`, { newRole });
            return response.data;
        } catch (error) {
            console.error(`Error updating user ${userId} role to ${newRole}:`, error);
            throw error;
        }
    }
};