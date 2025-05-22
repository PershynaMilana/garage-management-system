import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { useAuth } from '../../store/hooks';
import { registerUser, clearError } from '../../store/authSlice';

interface RegisterPageProps {}

const RegisterPage: React.FC<RegisterPageProps> = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        garageNumber: ''
    });

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, error, isAuthenticated } = useAuth();

    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home');
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(registerUser(formData));
    };

    return (
        <div className="min-h-screen bg-auth-bg flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-auth-card rounded-lg p-8 shadow-2xl border border-auth-border">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-auth-text mb-2">Welcome</h1>
                        <div className="w-16 h-0.5 bg-auth-gradient mx-auto"></div>
                        <p className="text-auth-text-muted mt-4">Let's get to know each other</p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-auth-text mb-2">
                                Full Name
                            </label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Devon Lane"
                                className="w-full px-4 py-3 bg-auth-input border border-auth-border rounded-lg
                         text-auth-text placeholder-auth-text-muted focus:outline-none
                         focus:ring-2 focus:ring-auth-accent focus:border-transparent
                         transition-colors duration-200"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-auth-text mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="example@gmail.com"
                                className="w-full px-4 py-3 bg-auth-input border border-auth-border rounded-lg
                         text-auth-text placeholder-auth-text-muted focus:outline-none
                         focus:ring-2 focus:ring-auth-accent focus:border-transparent
                         transition-colors duration-200"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-auth-text mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="12345678"
                                className="w-full px-4 py-3 bg-auth-input border border-auth-border rounded-lg
                         text-auth-text placeholder-auth-text-muted focus:outline-none
                         focus:ring-2 focus:ring-auth-accent focus:border-transparent
                         transition-colors duration-200"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label htmlFor="garageNumber" className="block text-sm font-medium text-auth-text mb-2">
                                Garage Number
                            </label>
                            <input
                                id="garageNumber"
                                name="garageNumber"
                                type="text"
                                value={formData.garageNumber}
                                onChange={handleChange}
                                placeholder=""
                                className="w-full px-4 py-3 bg-auth-input border border-auth-border rounded-lg
                         text-auth-text placeholder-auth-text-muted focus:outline-none
                         focus:ring-2 focus:ring-auth-accent focus:border-transparent
                         transition-colors duration-200"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-auth-button text-auth-button-text py-3 px-4 rounded-lg
                       font-medium hover:bg-gray-100 focus:outline-none focus:ring-2
                       focus:ring-auth-accent focus:ring-offset-2 focus:ring-offset-auth-card
                       transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Signing Up...' : 'Sign up'}
                        </button>
                    </form>

                    {/* Footer Link */}
                    <div className="text-center mt-6 text-sm">
                        <span className="text-auth-text-muted">Already have an account? </span>
                        <Link
                            to="/login"
                            className="text-auth-text-muted hover:text-auth-accent transition-colors duration-200 underline"
                        >
                            Sign in
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

export default RegisterPage;