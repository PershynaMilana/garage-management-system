/**
 * @fileoverview Redux store configuration and type definitions
 */

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice'; // Імпортуємо наш новий редюсер користувачів

/**
 * Main Redux store configuration
 * Combines all reducers and configures middleware
 */
export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer, // Додаємо редюсер для управління станом користувачів
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }),
});

/**
 * Root state type inferred from store
 * Use this type for useSelector hooks
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * App dispatch type inferred from store
 * Use this type for useDispatch hooks
 */
export type AppDispatch = typeof store.dispatch;
