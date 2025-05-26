/**
 * @fileoverview Typed Redux hooks for the application
 */

import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { useMemo } from 'react';
import type { RootState, AppDispatch } from './store';

/**
 * Typed useDispatch hook
 * Use this instead of plain useDispatch for proper typing
 * @returns Typed dispatch function
 * @example
 * const dispatch = useAppDispatch();
 * dispatch(loginUser({ email, password }));
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Typed useSelector hook
 * Use this instead of plain useSelector for proper typing
 * @example
 * const user = useAppSelector(state => state.auth.user);
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Custom hook for accessing authentication state
 * Provides convenient access to all auth-related state with memoization
 * to prevent infinite re-renders
 * @returns Object containing all authentication state properties
 * @example
 * const { user, isLoading, error, isAuthenticated } = useAuth();
 *
 * if (isLoading) return <Spinner />;
 * if (error) return <ErrorMessage message={error} />;
 * if (!isAuthenticated) return <LoginForm />;
 */
export const useAuth = () => {
    const auth = useAppSelector((state) => state.auth);

    return useMemo(() => ({
        /** Current authenticated user */
        user: auth.user,
        /** JWT authentication token */
        token: auth.token,
        /** Whether an auth operation is in progress */
        isLoading: auth.isLoading,
        /** Current error message if any */
        error: auth.error,
        /** Whether user is currently authenticated */
        isAuthenticated: auth.isAuthenticated,
    }), [auth.user, auth.token, auth.isLoading, auth.error, auth.isAuthenticated]);
};