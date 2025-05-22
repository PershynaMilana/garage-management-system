import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { useAuth } from '../../store/hooks';
import { forgotPassword, clearError } from '../../store/authSlice';

interface ForgotPasswordPageProps {}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = () => {
    const [email, setEmail] = useState('');
    const [codeSent, setCodeSent] = useState(false);

    const dispatch = useAppDispatch();
    const { isLoading, error } = useAuth();

    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    const handleSendCode = async () => {
        const result = await dispatch(forgotPassword({ email }));

        if (forgotPassword.fulfilled.match(result)) {
            setCodeSent(true);
        }
    };

    return (
        <div className="min-h-screen bg-auth-bg flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-auth-card rounded-lg p-8 shadow-2xl border border-auth-border">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-auth-text mb-6">Forgot your password?</h1>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Success message */}
                    {codeSent && (
                        <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                            <p className="text-green-400 text-sm">Код отправлен на вашу почту</p>
                        </div>
                    )}

                    {/* Form */}
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-auth-text mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@gmail.com"
                                className="w-full px-4 py-3 bg-auth-input border border-auth-border rounded-lg
                         text-auth-text placeholder-auth-text-muted focus:outline-none
                         focus:ring-2 focus:ring-auth-accent focus:border-transparent
                         transition-colors duration-200"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <button
                            onClick={handleSendCode}
                            disabled={isLoading || !email || codeSent}
                            className="w-full bg-auth-button text-auth-button-text py-3 px-4 rounded-lg
                       font-medium hover:bg-gray-100 focus:outline-none focus:ring-2
                       focus:ring-auth-accent focus:ring-offset-2 focus:ring-offset-auth-card
                       transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Sending...' : codeSent ? 'Code Sent' : 'Send Code'}
                        </button>

                        {codeSent && (
                            <Link
                                to="/change-password"
                                className="block w-full text-center bg-auth-accent text-white py-3 px-4 rounded-lg
                         font-medium hover:bg-auth-accent-hover transition-colors duration-200"
                            >
                                Enter Code
                            </Link>
                        )}
                    </div>

                    {/* Footer Links */}
                    <div className="flex justify-between items-center mt-6 text-sm">
                        <Link
                            to="/login"
                            className="text-auth-text-muted hover:text-auth-accent transition-colors duration-200 underline"
                        >
                            Sign in
                        </Link>
                        <Link
                            to="/signup"
                            className="text-auth-text-muted hover:text-auth-accent transition-colors duration-200 underline"
                        >
                            Sign Up
                        </Link>
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

export default ForgotPasswordPage;