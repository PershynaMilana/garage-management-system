import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { useAuth } from '../../store/hooks';
import { changePassword, clearError } from '../../store/authSlice';

interface ChangePasswordPageProps {}

const ChangePasswordPage: React.FC<ChangePasswordPageProps> = () => {
    const [formData, setFormData] = useState({
        code: '',
        newPassword: ''
    });
    const [success, setSuccess] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useAuth();

    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await dispatch(changePassword(formData));

        if (changePassword.fulfilled.match(result)) {
            setSuccess(true);
            // Перенаправляем на логин через 2 секунды
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }
    };

    return (
        <div className="min-h-screen bg-auth-bg flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-auth-card rounded-lg p-8 shadow-2xl border border-auth-border">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-auth-text mb-6">Change your password</h1>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Success message */}
                    {success && (
                        <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                            <p className="text-green-400 text-sm">
                                Пароль успешно изменен! Перенаправляем на страницу входа...
                            </p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="code" className="block text-sm font-medium text-auth-text mb-2">
                                Code
                            </label>
                            <input
                                id="code"
                                name="code"
                                type="text"
                                value={formData.code}
                                onChange={handleChange}
                                placeholder="693415"
                                className="w-full px-4 py-3 bg-auth-input border border-auth-border rounded-lg
                         text-auth-text placeholder-auth-text-muted focus:outline-none
                         focus:ring-2 focus:ring-auth-accent focus:border-transparent
                         transition-colors duration-200"
                                required
                                disabled={isLoading || success}
                            />
                        </div>

                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-auth-text mb-2">
                                New password
                            </label>
                            <input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                value={formData.newPassword}
                                onChange={handleChange}
                                placeholder="12345678"
                                className="w-full px-4 py-3 bg-auth-input border border-auth-border rounded-lg
                         text-auth-text placeholder-auth-text-muted focus:outline-none
                         focus:ring-2 focus:ring-auth-accent focus:border-transparent
                         transition-colors duration-200"
                                required
                                disabled={isLoading || success}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || success}
                            className="w-full bg-auth-button text-auth-button-text py-3 px-4 rounded-lg
                       font-medium hover:bg-gray-100 focus:outline-none focus:ring-2
                       focus:ring-auth-accent focus:ring-offset-2 focus:ring-offset-auth-card
                       transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Changing...' : success ? 'Success!' : 'Change password'}
                        </button>
                    </form>

                    {/* Подсказка для тестирования */}
                    <div className="mt-4 p-2 bg-blue-500/10 border border-blue-500/20 rounded text-xs text-blue-400">
                        Для тестирования используйте код: 693415
                    </div>
                </div>

                {/* Copyright */}
                <div className="flex justify-between items-center mt-6 text-xs text-auth-text-muted">
                    <span>©2025 LOGO. All rights reserved</span>
                    <div className="flex space-x-2">
                        <span className="w-6 h-4 bg-red-500 rounded-sm flex items-center justify-center text-white text-xs">🇬🇧</span>
                        <span className="w-6 h-4 bg-blue-500 rounded-sm flex items-center justify-center text-white text-xs">🇺🇦</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordPage;