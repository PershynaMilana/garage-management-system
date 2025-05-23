import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { useAuth } from '../../store/hooks';
import { loginUser, clearError } from '../../store/authSlice';
import PageLayout from '../../components/PageLayout';
import Footer from "../../components/Footer.tsx";

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
            <div className=" relative overflow-hidden">

                {/* Main Content */}
                <div className="xl:mt-[10vh] sm:mt-[10vh] relative z-10 flex items-center justify-center  p-4">
                    <div className="w-full max-w-md">

                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="w-full h-0.5 bg-[#87d7de] mx-auto mb-4"></div>
                            <h2 className="text-[24pt] sm:text-[36pt] font-[IBMPlexMono-Regular] text-[#FFFFFF] mb-4">
                                Welcome Back
                            </h2>
                            <h2 className="text-[#FFFFFF] font-[IBMPlexMono-Regular] text-[24pt]">Log in</h2>
                            <div className="w-full h-0.5 bg-[#87d7de] mx-auto my-4"></div>
                        </div>

                        {/* Login Card */}
                        <div className=" backdrop-blur-sm rounded-lg p-8 shadow-2xl border border-[#696969]/30">


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


                        </div>


                    </div>

                </div>
            </div>
            <Footer />
        </PageLayout>
    );
};

export default LoginPage;