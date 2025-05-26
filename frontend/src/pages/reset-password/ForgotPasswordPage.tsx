import React, { useActionState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { useAuth } from '../../store/hooks';
import { clearError } from '../../store/authSlice';
import PageLayout from '../../components/PageLayout';
import Footer from "../../components/Footer.tsx";
import FormInput from '../../components/FormInput';
import FormHeader from '../../components/FormHeader';
import { FormContainer, ErrorMessage, SuccessMessage, SubmitButton } from '../../components/FormContainer';
import { createForgotPasswordAction, initialForgotPasswordState } from '../../lib/authActions';

interface ForgotPasswordPageProps {}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = () => {
    const dispatch = useAppDispatch();
    const { isLoading, error } = useAuth();

    // Cleanup auth errors on unmounting
    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    const sendCodeAction = createForgotPasswordAction(dispatch);
    const [state, formAction, isPending] = useActionState(sendCodeAction, initialForgotPasswordState);

    return (
        <PageLayout>
            <div className="relative overflow-hidden">
                {/* Main Content */}
                <div className="xl:mt-[10vh] sm:mt-[10vh] relative z-10 flex items-center justify-center p-4">
                    <div className="w-full max-w-md">

                        <FormHeader
                            title="Forgot Password?"
                            subtitle="Enter your email to receive a verification code"
                        />

                        <FormContainer>
                            {/* Global Error */}
                            {(error || state.errors.general) && (
                                <ErrorMessage message={error || state.errors.general!} />
                            )}

                            {/* Success message */}
                            {state.codeSent && (
                                <SuccessMessage message="Verification code has been sent to your email" />
                            )}

                            <form action={formAction} className="space-y-6" noValidate>
                                <FormInput
                                    id="email"
                                    name="email"
                                    label="Email"
                                    type="email"
                                    placeholder="example@gmail.com"
                                    error={state.errors.email}
                                    disabled={isPending || isLoading || state.codeSent}
                                />

                                <SubmitButton
                                    isLoading={isPending || isLoading}
                                    disabled={state.codeSent}
                                    loadingText="Sending..."
                                >
                                    {state.codeSent ? 'Code Sent' : 'Send Code'}
                                </SubmitButton>
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
                        </FormContainer>
                    </div>
                </div>
            </div>
            <Footer />
        </PageLayout>
    );
};

export default ForgotPasswordPage;