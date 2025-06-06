// frontend/src/store/userSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { userApi } from '../api/userApi';
import { User, UserListResponse, UserQueryParams, UserRole } from '../types/user';

interface UserState {
    users: User[];
    totalUsers: number;
    currentPage: number;
    totalPages: number;
    limit: number;
    search: string;
    roleFilter?: UserRole;
    loading: boolean;
    error: string | null;
    selectedUserId: number | null;
}

const initialState: UserState = {
    users: [],
    totalUsers: 0,
    currentPage: 1,
    totalPages: 1,
    limit: 6,
    search: '',
    roleFilter: undefined,
    loading: false,
    error: null,
    selectedUserId: null,
};

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (params: UserQueryParams, { getState, rejectWithValue }) => {
        try {
            const response = await userApi.getAllUsers(params);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const updateUserRoleAsync = createAsyncThunk(
    'users/updateUserRole',
    async ({ userId, newRole }: { userId: number; newRole: UserRole }, { rejectWithValue, dispatch }) => {
        try {
            const response = await userApi.updateUserRole(userId, newRole);
            dispatch(fetchUsers({ /* передайте поточні фільтри та пагінацію */ }));
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);


const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
            // state.currentPage = 1; // <--- ВИДАЛІТЬ ЦЕЙ РЯДОК
        },
        setRoleFilter: (state, action: PayloadAction<UserRole | undefined>) => {
            state.roleFilter = action.payload;
            state.currentPage = 1;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.limit = action.payload;
            state.currentPage = 1;
        },
        setSelectedUserId: (state, action: PayloadAction<number | null>) => {
            state.selectedUserId = action.payload;
        },
        updateUserRoleLocally: (state, action: PayloadAction<{ userId: number; newRole: UserRole }>) => {
            const { userId, newRole } = action.payload;
            const user = state.users.find(u => u.userId === userId);
            if (user) {
                user.role = newRole;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<UserListResponse>) => {
                state.loading = false;
                state.users = action.payload.users;
                state.totalUsers = action.payload.totalUsers;
                state.currentPage = action.payload.currentPage;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateUserRoleAsync.pending, (state) => {
                // Можна додати індикатор завантаження для конкретного оновлення
            })
            .addCase(updateUserRoleAsync.fulfilled, (state, action) => {
                // Оскільки ми перезавантажуємо fetchUsers у updateUserRoleAsync,
                // тут можна просто відобразити успіх або нічого не робити
            })
            .addCase(updateUserRoleAsync.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const { setSearch, setRoleFilter, setCurrentPage, setLimit, setSelectedUserId, updateUserRoleLocally } = userSlice.actions;

export default userSlice.reducer;
