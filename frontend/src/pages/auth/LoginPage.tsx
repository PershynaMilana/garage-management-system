import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { useAuth } from '../../store/hooks';
import { loginUser, clearError } from '../../store/authSlice';
import PageLayout from '../../components/PageLayout';

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, error, isAuthenticated } = useAuth();

    // Очищаем ошибку при размонтировании
    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    // Редирект после успешной авторизации
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    return (
        <PageLayout>
            <div className="min-h-screen relative overflow-hidden">

                {/* Main Content */}
                <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
                    <div className="w-full max-w-md">
                        {/* Page Title */}
                        <div className="absolute top-8 left-8">
                            <h1 className="text-[#FFFFFF] font-[Ubuntu-Regular] text-[18pt] sm:text-[15pt]">Log In</h1>
                        </div>

                        {/* Login Card */}
                        <div className="bg-[#33455e] backdrop-blur-sm rounded-lg p-8 shadow-2xl border border-[#4e6b8c]/30">
                            {/* Header */}
                            <div className="text-center mb-8">
                                <h2 className="text-[24pt] sm:text-[36pt] font-[Ubuntu-Regular] text-[#FFFFFF] mb-4">
                                    Welcome Back
                                </h2>
                                <div className="w-full h-0.5 bg-[#87d7de] mx-auto mb-4"></div>
                                <p className="text-[#FFFFFF] font-[Ubuntu-Regular] text-[12pt] sm:text-[15pt]">Log in</p>
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="mb-6 p-4 bg-[#B63232]/20 border border-[#B63232]/50 rounded-lg">
                                    <p className="text-[#B63232] text-[10pt] font-[Ubuntu-Regular]">{error}</p>
                                </div>
                            )}

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-[#FFFFFF] font-[Ubuntu-Regular] text-[12pt] mb-3">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="example@gmail.com"
                                        className="w-full px-4 py-4 bg-[#527f8b]/50 border border-[#4e6b8c] rounded-lg
                           text-[#FFFFFF] placeholder-[#FFFFFF]/50 font-[Ubuntu-Regular] text-[12pt]
                           focus:outline-none focus:ring-2 focus:ring-[#87d7de] focus:border-[#87d7de]
                           transition-all duration-200 backdrop-blur-sm"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-[#FFFFFF] font-[Ubuntu-Regular] text-[12pt] mb-3">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="12345678"
                                        className="w-full px-4 py-4 bg-[#527f8b]/50 border border-[#4e6b8c] rounded-lg
                           text-[#FFFFFF] placeholder-[#FFFFFF]/50 font-[Ubuntu-Regular] text-[12pt]
                           focus:outline-none focus:ring-2 focus:ring-[#87d7de] focus:border-[#87d7de]
                           transition-all duration-200 backdrop-blur-sm"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-[#FFFFFF] text-[#0c0c18] py-4 px-6 rounded-lg
                         font-[Ubuntu-Regular] text-[12pt] font-medium hover:bg-[#87d7de] hover:text-[#FFFFFF]
                         focus:outline-none focus:ring-2 focus:ring-[#87d7de] focus:ring-offset-2
                         focus:ring-offset-[#33455e] transition-all duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? 'Signing In...' : 'Sign In'}
                                </button>
                            </form>

                            {/* Footer Links */}
                            <div className="flex justify-between items-center mt-8 text-[10pt]">
                                <Link
                                    to="/forgot-password"
                                    className="text-[#FFFFFF]/70 hover:text-[#87d7de] transition-colors duration-200 underline font-[Ubuntu-Regular]"
                                >
                                    Forgot password?
                                </Link>
                                <Link
                                    to="/signup"
                                    className="text-[#FFFFFF]/70 hover:text-[#87d7de] transition-colors duration-200 underline font-[Ubuntu-Regular]"
                                >
                                    Sign Up
                                </Link>
                            </div>

                            {/* Test credentials hint */}
                            <div className="mt-6 p-3 bg-[#87d7de]/10 border border-[#87d7de]/30 rounded text-[8pt]">
                                <p className="text-[#87d7de] font-[Ubuntu-Regular]">
                                    Test: test@example.com / password
                                </p>
                            </div>
                        </div>

                        {/* Copyright */}
                        <div className="flex justify-between items-center mt-8 text-[8pt]">
                            <span className="text-[#FFFFFF]/50 font-[Ubuntu-Regular]">©2025 LOGO. All rights reserved</span>
                            <div className="flex space-x-2">
                                <div className="w-6 h-4 bg-[#B63232] rounded-sm flex items-center justify-center">
                                    <span className="text-[#FFFFFF] text-xs">🇬🇧</span>
                                </div>
                                <div className="w-6 h-4 bg-[#87d7de] rounded-sm flex items-center justify-center">
                                    <span className="text-[#FFFFFF] text-xs">🇺🇦</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default LoginPage;