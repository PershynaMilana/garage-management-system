import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { useAuth } from '../../store/hooks';
import { loginUser, clearError } from '../../store/authSlice';
import PageLayout from '../../components/PageLayout';
import Footer from "../../components/Footer.tsx";

interface LoginPageProps {}

interface ValidationErrors {
    email?: string;
    password?: string;
}

const LoginPage: React.FC<LoginPageProps> = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
    const [touched, setTouched] = useState({ email: false, password: false });

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

    const validateEmail = (email: string): string | undefined => {
        if (!email) {
            return 'Email is required';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address';
        }
        return undefined;
    };

    const validatePassword = (password: string): string | undefined => {
        if (!password) {
            return 'Password is required';
        }
        if (password.length < 6) {
            return 'Password must be at least 6 characters long';
        }
        return undefined;
    };

    useEffect(() => {
        const errors: ValidationErrors = {};

        if (touched.email) {
            const emailError = validateEmail(email);
            if (emailError) errors.email = emailError;
        }

        if (touched.password) {
            const passwordError = validatePassword(password);
            if (passwordError) errors.password = passwordError;
        }

        setValidationErrors(errors);
    }, [email, password, touched]);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (!touched.email) {
            setTouched(prev => ({ ...prev, email: true }));
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (!touched.password) {
            setTouched(prev => ({ ...prev, password: true }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setTouched({ email: true, password: true });

        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        if (emailError || passwordError) {
            setValidationErrors({
                email: emailError,
                password: passwordError
            });
            return;
        }

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

                            {/* Global Error */}
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
                                        onChange={handleEmailChange}
                                        onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                                        placeholder="example@gmail.com"
                                        className={`w-full px-4 py-4 bg-[#527f8b]/50 border rounded-lg
                           text-[#FFFFFF] placeholder-[#FFFFFF]/50 font-[Ubuntu-Regular] text-[12pt]
                           focus:outline-none focus:ring-2 transition-all duration-200 backdrop-blur-sm
                           ${validationErrors.email
                                            ? 'border-[#B63232] focus:ring-[#B63232] focus:border-[#B63232]'
                                            : 'border-[#4e6b8c] focus:ring-[#87d7de] focus:border-[#87d7de]'
                                        }`}
                                        disabled={isLoading}
                                    />
                                    {validationErrors.email && (
                                        <p className="mt-2 text-[#B63232] text-[10pt] font-[Ubuntu-Regular]">
                                            {validationErrors.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-[#FFFFFF] font-[Ubuntu-Regular] text-[12pt] mb-3">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
                                        placeholder="12345678"
                                        className={`w-full px-4 py-4 bg-[#527f8b]/50 border rounded-lg
                           text-[#FFFFFF] placeholder-[#FFFFFF]/50 font-[Ubuntu-Regular] text-[12pt]
                           focus:outline-none focus:ring-2 transition-all duration-200 backdrop-blur-sm
                           ${validationErrors.password
                                            ? 'border-[#B63232] focus:ring-[#B63232] focus:border-[#B63232]'
                                            : 'border-[#4e6b8c] focus:ring-[#87d7de] focus:border-[#87d7de]'
                                        }`}
                                        disabled={isLoading}
                                    />
                                    {validationErrors.password && (
                                        <p className="mt-2 text-[#B63232] text-[10pt] font-[Ubuntu-Regular]">
                                            {validationErrors.password}
                                        </p>
                                    )}
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
                            <div className="flex justify-between items-center mt-6">
                                <Link
                                    to="/forgot-password"
                                    className="text-[#FFFFFF]/70 hover:text-[#87d7de] transition-colors duration-200 underline font-[Ubuntu-Regular] text-[10pt]"
                                >
                                    Forgot password?
                                </Link>
                                <Link
                                    to="/signup"
                                    className="text-[#FFFFFF]/70 hover:text-[#87d7de] transition-colors duration-200 underline font-[Ubuntu-Regular] text-[10pt]"
                                >
                                    Sign Up
                                </Link>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
            <Footer />
        </PageLayout>
    );
};

export default LoginPage;
