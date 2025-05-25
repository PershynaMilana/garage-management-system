import React, { useActionState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { useAuth } from '../../store/hooks';
import { forgotPassword, clearError } from '../../store/authSlice';
import PageLayout from '../../components/PageLayout';
import Footer from "../../components/Footer.tsx";

interface ForgotPasswordPageProps {}

interface ForgotPasswordFormState {
    errors: {
        email?: string;
        general?: string;
    };
    success: boolean;
    codeSent: boolean;
}

const initialState: ForgotPasswordFormState = {
    errors: {},
    success: false,
    codeSent: false
};

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = () => {
    const dispatch = useAppDispatch();
    const { isLoading, error } = useAuth();

    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

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

    async function sendCodeAction(_prevState: ForgotPasswordFormState, formData: FormData): Promise<ForgotPasswordFormState> {
        const email = formData.get('email') as string;

        const emailError = validateEmail(email);

        if (emailError) {
            return {
                errors: {
                    email: emailError
                },
                success: false,
                codeSent: false
            };
        }

        try {
            const result = await dispatch(forgotPassword({ email }));

            if (forgotPassword.fulfilled.match(result)) {
                return {
                    errors: {},
                    success: true,
                    codeSent: true
                };
            } else {
                return {
                    errors: {
                        general: 'Failed to send code. Please check your email address.'
                    },
                    success: false,
                    codeSent: false
                };
            }
        } catch (err) {
            return {
                errors: {
                    general: 'An unexpected error occurred. Please try again.'
                },
                success: false,
                codeSent: false
            };
        }
    }

    const [state, formAction, isPending] = useActionState(sendCodeAction, initialState);

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
                                Forgot Password?
                            </h2>
                            <h2 className="text-[#FFFFFF] font-[IBMPlexMono-Regular] text-[16pt]">
                                Enter your email to receive a verification code
                            </h2>
                            <div className="w-full h-0.5 bg-[#87d7de] mx-auto my-4"></div>
                        </div>

                        {/* Forgot Password Card */}
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
                            {state.codeSent && (
                                <div className="mb-6 p-4 bg-[#22C55E]/20 border border-[#22C55E]/50 rounded-lg">
                                    <p className="text-[#22C55E] text-[10pt] font-[Ubuntu-Regular]">
                                        Verification code has been sent to your email
                                    </p>
                                </div>
                            )}

                            {/* Form with React 19 action */}
                            <form action={formAction} className="space-y-6">
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
                                        required
                                        disabled={isPending || isLoading || state.codeSent}
                                    />
                                    {state.errors.email && (
                                        <p className="mt-2 text-[#B63232] text-[10pt] font-[Ubuntu-Regular]">
                                            {state.errors.email}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isPending || isLoading || state.codeSent}
                                    className="w-full bg-[#FFFFFF] text-[#0c0c18] py-4 px-6 rounded-lg
                               font-[Ubuntu-Regular] text-[12pt] font-medium hover:bg-[#87d7de] hover:text-[#FFFFFF]
                               focus:outline-none focus:ring-2 focus:ring-[#87d7de] focus:ring-offset-2
                               focus:ring-offset-[#33455e] transition-all duration-200
                               disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isPending || isLoading ? 'Sending...' : state.codeSent ? 'Code Sent' : 'Send Code'}
                                </button>
                            </form>

                            {/* Enter Code Button */}
                            {state.codeSent && (
                                <div className="mt-6">
                                    <Link
                                        to="/change-password"
                                        className="block w-full text-center bg-[#87d7de] text-[#FFFFFF] py-4 px-6 rounded-lg
                                   font-[Ubuntu-Regular] text-[12pt] font-medium hover:bg-[#87d7de]/80
                                   transition-all duration-200 focus:outline-none focus:ring-2
                                   focus:ring-[#87d7de] focus:ring-offset-2 focus:ring-offset-[#33455e]"
                                    >
                                        Enter Code
                                    </Link>
                                </div>
                            )}

                            {/* Footer Links */}
                            <div className="flex justify-between items-center mt-6">
                                <Link
                                    to="/login"
                                    className="text-[#FFFFFF]/70 hover:text-[#87d7de] transition-colors duration-200 underline font-[Ubuntu-Regular] text-[10pt]"
                                >
                                    Back to Sign In
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

export default ForgotPasswordPage;