import React, { useActionState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { useAuth } from '../../store/hooks';
import { registerUser, clearError } from '../../store/authSlice';
import PageLayout from '../../components/PageLayout';
import Footer from "../../components/Footer.tsx";

interface RegisterPageProps {}

interface RegisterFormState {
    errors: {
        fullName?: string;
        email?: string;
        password?: string;
        garageNumber?: string;
        general?: string;
    };
    success: boolean;
}

const initialState: RegisterFormState = {
    errors: {},
    success: false
};

const RegisterPage: React.FC<RegisterPageProps> = () => {
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

    const validateFullName = (name: string): string | undefined => {
        if (!name.trim()) {
            return 'Full name is required';
        }
        if (name.trim().length < 2) {
            return 'Full name must be at least 2 characters long';
        }
        if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
            return 'Full name should contain only letters and spaces';
        }
        return undefined;
    };

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
        if (password.length < 8) {
            return 'Password must be at least 8 characters long';
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        }
        return undefined;
    };

    const validateGarageNumber = (garageNumber: string): string | undefined => {
        if (!garageNumber.trim()) {
            return 'Garage number is required';
        }
        if (!/^[A-Za-z0-9\-]+$/.test(garageNumber.trim())) {
            return 'Garage number should contain only letters, numbers, and hyphens';
        }
        return undefined;
    };

    async function registerAction(_prevState: RegisterFormState, formData: FormData): Promise<RegisterFormState> {
        const fullName = formData.get('fullName') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const garageNumber = formData.get('garageNumber') as string;

        const nameError = validateFullName(fullName);
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);
        const garageError = validateGarageNumber(garageNumber);

        if (nameError || emailError || passwordError || garageError) {
            return {
                errors: {
                    fullName: nameError,
                    email: emailError,
                    password: passwordError,
                    garageNumber: garageError
                },
                success: false
            };
        }

        try {
            const result = await dispatch(registerUser({
                fullName: fullName.trim(),
                email: email.trim(),
                password,
                garageNumber: garageNumber.trim()
            }));

            if (registerUser.fulfilled.match(result)) {
                return {
                    errors: {},
                    success: true
                };
            } else {
                return {
                    errors: {
                        general: 'Registration failed. This email might already be in use.'
                    },
                    success: false
                };
            }
        } catch (err) {
            return {
                errors: {
                    general: 'An unexpected error occurred. Please try again.'
                },
                success: false
            };
        }
    }

    const [state, formAction, isPending] = useActionState(registerAction, initialState);

    return (
        <PageLayout>
            <div className="relative overflow-hidden">
                {/* Main Content */}
                <div className="xl:mt-[10vh] sm:mt-[10vh] relative z-10 flex items-center justify-center p-4">
                    <div className="w-full max-w-md">

                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="w-full h-0.5 bg-[#87d7de] mx-auto mb-4"></div>
                            <h2 className="text-[24pt] sm:text-[36pt] font-[IBMPlexMono-Regular] text-[#FFFFFF] mb-4">
                                Welcome
                            </h2>
                            <h2 className="text-[#FFFFFF] font-[IBMPlexMono-Regular] text-[18pt]">
                                Let's get to know each other
                            </h2>
                            <div className="w-full h-0.5 bg-[#87d7de] mx-auto my-4"></div>
                        </div>

                        {/* Register Card */}
                        <div className="backdrop-blur-sm rounded-lg p-8 shadow-2xl border border-[#696969]/30">

                            {/* Global Error */}
                            {(error || state.errors.general) && (
                                <div className="mb-6 p-4 bg-[#B63232]/20 border border-[#B63232]/50 rounded-lg">
                                    <p className="text-[#B63232] text-[10pt] font-[Ubuntu-Regular]">
                                        {error || state.errors.general}
                                    </p>
                                </div>
                            )}

                            {/* Success message */}
                            {state.success && (
                                <div className="mb-6 p-4 bg-[#22C55E]/20 border border-[#22C55E]/50 rounded-lg">
                                    <p className="text-[#22C55E] text-[10pt] font-[Ubuntu-Regular]">
                                        Registration successful! Redirecting to dashboard...
                                    </p>
                                </div>
                            )}

                            {/* Form with React 19 action */}
                            <form action={formAction} className="space-y-6">
                                {/* Full Name */}
                                <div>
                                    <label htmlFor="fullName" className="block text-[#FFFFFF] font-[Ubuntu-Regular] text-[12pt] mb-3">
                                        Full Name
                                    </label>
                                    <input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        placeholder="Devon Lane"
                                        className={`w-full px-4 py-4 bg-[#527f8b]/50 border rounded-lg
                                   text-[#FFFFFF] placeholder-[#FFFFFF]/50 font-[Ubuntu-Regular] text-[12pt]
                                   focus:outline-none focus:ring-2 transition-all duration-200 backdrop-blur-sm
                                   ${state.errors.fullName
                                            ? 'border-[#B63232] focus:ring-[#B63232] focus:border-[#B63232]'
                                            : 'border-[#4e6b8c] focus:ring-[#87d7de] focus:border-[#87d7de]'
                                        }`}
                                        disabled={isPending || isLoading}
                                        required
                                        minLength={2}
                                        pattern="[a-zA-Z\s]+"
                                        title="Full name should contain only letters and spaces"
                                    />
                                    {state.errors.fullName && (
                                        <p className="mt-2 text-[#B63232] text-[10pt] font-[Ubuntu-Regular]">
                                            {state.errors.fullName}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-[#FFFFFF] font-[Ubuntu-Regular] text-[12pt] mb-3">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="example@gmail.com"
                                        className={`w-full px-4 py-4 bg-[#527f8b]/50 border rounded-lg
                                   text-[#FFFFFF] placeholder-[#FFFFFF]/50 font-[Ubuntu-Regular] text-[12pt]
                                   focus:outline-none focus:ring-2 transition-all duration-200 backdrop-blur-sm
                                   ${state.errors.email
                                            ? 'border-[#B63232] focus:ring-[#B63232] focus:border-[#B63232]'
                                            : 'border-[#4e6b8c] focus:ring-[#87d7de] focus:border-[#87d7de]'
                                        }`}
                                        disabled={isPending || isLoading}
                                        required
                                    />
                                    {state.errors.email && (
                                        <p className="mt-2 text-[#B63232] text-[10pt] font-[Ubuntu-Regular]">
                                            {state.errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Password */}
                                <div>
                                    <label htmlFor="password" className="block text-[#FFFFFF] font-[Ubuntu-Regular] text-[12pt] mb-3">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Create a strong password"
                                        className={`w-full px-4 py-4 bg-[#527f8b]/50 border rounded-lg
                                   text-[#FFFFFF] placeholder-[#FFFFFF]/50 font-[Ubuntu-Regular] text-[12pt]
                                   focus:outline-none focus:ring-2 transition-all duration-200 backdrop-blur-sm
                                   ${state.errors.password
                                            ? 'border-[#B63232] focus:ring-[#B63232] focus:border-[#B63232]'
                                            : 'border-[#4e6b8c] focus:ring-[#87d7de] focus:border-[#87d7de]'
                                        }`}
                                        disabled={isPending || isLoading}
                                        required
                                        minLength={8}
                                    />
                                    {state.errors.password && (
                                        <p className="mt-2 text-[#B63232] text-[10pt] font-[Ubuntu-Regular]">
                                            {state.errors.password}
                                        </p>
                                    )}
                                </div>

                                {/* Garage Number */}
                                <div>
                                    <label htmlFor="garageNumber" className="block text-[#FFFFFF] font-[Ubuntu-Regular] text-[12pt] mb-3">
                                        Garage Number
                                    </label>
                                    <input
                                        id="garageNumber"
                                        name="garageNumber"
                                        type="text"
                                        placeholder="A-123 or 456"
                                        className={`w-full px-4 py-4 bg-[#527f8b]/50 border rounded-lg
                                   text-[#FFFFFF] placeholder-[#FFFFFF]/50 font-[Ubuntu-Regular] text-[12pt]
                                   focus:outline-none focus:ring-2 transition-all duration-200 backdrop-blur-sm
                                   ${state.errors.garageNumber
                                            ? 'border-[#B63232] focus:ring-[#B63232] focus:border-[#B63232]'
                                            : 'border-[#4e6b8c] focus:ring-[#87d7de] focus:border-[#87d7de]'
                                        }`}
                                        disabled={isPending || isLoading}
                                        required
                                        pattern="[A-Za-z0-9\-]+"
                                        title="Garage number should contain only letters, numbers, and hyphens"
                                    />
                                    {state.errors.garageNumber && (
                                        <p className="mt-2 text-[#B63232] text-[10pt] font-[Ubuntu-Regular]">
                                            {state.errors.garageNumber}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isPending || isLoading}
                                    className="w-full bg-[#FFFFFF] text-[#0c0c18] py-4 px-6 rounded-lg
                               font-[Ubuntu-Regular] text-[12pt] font-medium hover:bg-[#87d7de] hover:text-[#FFFFFF]
                               focus:outline-none focus:ring-2 focus:ring-[#87d7de] focus:ring-offset-2
                               focus:ring-offset-[#33455e] transition-all duration-200
                               disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isPending || isLoading ? 'Signing Up...' : 'Sign Up'}
                                </button>
                            </form>

                            {/* Footer Link */}
                            <div className="text-center mt-6">
                                <span className="text-[#FFFFFF]/70 font-[Ubuntu-Regular] text-[10pt]">
                                    Already have an account?
                                </span>
                                {' '}
                                <Link
                                    to="/login"
                                    className="text-[#FFFFFF]/70 hover:text-[#87d7de] transition-colors duration-200 underline font-[Ubuntu-Regular] text-[10pt]"
                                >
                                    Sign in
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

export default RegisterPage;