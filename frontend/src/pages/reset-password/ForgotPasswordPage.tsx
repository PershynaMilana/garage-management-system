import React, { useActionState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../store/hooks';
import { useAuth } from '../../store/hooks';
import { clearError } from '../../store/authSlice';
import PageLayout from '../../components/PageLayout';
import Footer from "../../components/Footer.tsx";
import FormInput from '../../components/forms/FormInput';
import FormHeader from '../../components/forms/FormHeader';
import { FormContainer, ErrorMessage, SuccessMessage, SubmitButton } from '../../components/forms/FormContainer';
import { createForgotPasswordAction, initialForgotPasswordState } from '../../lib/authActions';

interface ForgotPasswordPageProps {}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { isLoading, error } = useAuth();

    // Cleanup auth errors on unmounting
    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    // Create forgot password action
    const sendCodeAction = createForgotPasswordAction(dispatch);
    const [state, formAction, isPending] = useActionState(sendCodeAction, initialForgotPasswordState);

    return (
        <PageLayout>
            <div className="relative overflow-hidden">
                {/* Main Content */}
                <div className="xl:mt-[10vh] sm:mt-[10vh] relative z-10 flex items-center justify-center p-4">
                    <div className="w-full max-w-md">

                        <FormHeader
                            title={t('auth.forgotPassword.title')}
                            subtitle={t('auth.forgotPassword.subtitle')}
                        />

                        <FormContainer>
                            {/* Global Error */}
                            {(error || state.errors.general) && (
                                <ErrorMessage message={error || state.errors.general!} />
                            )}

                            {/* Success message */}
                            {state.codeSent && (
                                <SuccessMessage message={t('auth.forgotPassword.successMessage')} />
                            )}

                            {/* Form with React 19 action - noValidate отключает HTML валидацию */}
                            <form action={formAction} className="space-y-6" noValidate>
                                <FormInput
                                    id="email"
                                    name="email"
                                    label={t('auth.forgotPassword.email')}
                                    type="email"
                                    placeholder={t('auth.forgotPassword.emailPlaceholder')}
                                    error={state.errors.email}
                                    disabled={isPending || isLoading || state.codeSent}
                                />

                                <SubmitButton
                                    isLoading={isPending || isLoading}
                                    disabled={state.codeSent}
                                    loadingText={t('auth.forgotPassword.loadingText')}
                                >
                                    {state.codeSent ? t('auth.forgotPassword.codeSentButton') : t('auth.forgotPassword.submitButton')}
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
                                        {t('auth.forgotPassword.enterCodeButton')}
                                    </Link>
                                </div>
                            )}

                            {/* Footer Links */}
                            <div className="flex justify-between items-center mt-6">
                                <Link
                                    to="/login"
                                    className="text-[#FFFFFF]/70 hover:text-[#87d7de] transition-colors duration-200 underline font-[Ubuntu-Regular] text-[10pt]"
                                >
                                    {t('auth.forgotPassword.backToSignIn')}
                                </Link>
                                <Link
                                    to="/signup"
                                    className="text-[#FFFFFF]/70 hover:text-[#87d7de] transition-colors duration-200 underline font-[Ubuntu-Regular] text-[10pt]"
                                >
                                    {t('auth.forgotPassword.signUp')}
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