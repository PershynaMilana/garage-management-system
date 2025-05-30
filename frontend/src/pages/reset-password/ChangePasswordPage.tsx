import React, { useActionState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../store/hooks';
import { useAuth } from '../../store/hooks';
import { clearError } from '../../store/authSlice';
import PageLayout from '../../components/PageLayout';
import FormInput from '../../components/forms/FormInput';
import FormHeader from '../../components/forms/FormHeader';
import { FormContainer, ErrorMessage, SuccessMessage, SubmitButton } from '../../components/forms/FormContainer';
import { createChangePasswordAction, initialChangePasswordState } from '../../lib/authActions';

interface ChangePasswordPageProps {}

const ChangePasswordPage: React.FC<ChangePasswordPageProps> = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useAuth();

    // Cleanup auth errors on unmounting
    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    // Create change password action
    const changePasswordAction = createChangePasswordAction(dispatch, navigate);
    const [state, formAction, isPending] = useActionState(changePasswordAction, initialChangePasswordState);

    return (
        <PageLayout>
            <div className="relative overflow-hidden">
                {/* Main Content */}
                <div className="xl:mt-[10vh] sm:mt-[10vh] relative z-10 flex items-center justify-center p-4">
                    <div className="w-full max-w-md">

                        <FormHeader
                            title={t('auth.changePassword.title')}
                            subtitle={t('auth.changePassword.subtitle')}
                        />

                        <FormContainer>
                            {/* Global Error */}
                            {(error || state.errors.general) && (
                                <ErrorMessage message={error || state.errors.general!} />
                            )}

                            {/* Success message */}
                            {state.success && (
                                <SuccessMessage message={t('auth.changePassword.successMessage')} />
                            )}

                            {/* Form with React 19 action - noValidate отключает HTML валидацию */}
                            <form action={formAction} className="space-y-6" noValidate>
                                <FormInput
                                    id="code"
                                    name="code"
                                    label={t('auth.changePassword.verificationCode')}
                                    type="text"
                                    placeholder={t('auth.changePassword.codePlaceholder')}
                                    error={state.errors.code}
                                    disabled={isPending || isLoading || state.success}
                                />

                                <FormInput
                                    id="newPassword"
                                    name="newPassword"
                                    label={t('auth.changePassword.newPassword')}
                                    type="password"
                                    placeholder={t('auth.changePassword.passwordPlaceholder')}
                                    error={state.errors.newPassword}
                                    disabled={isPending || isLoading || state.success}
                                />

                                <SubmitButton
                                    isLoading={isPending || isLoading}
                                    disabled={state.success}
                                    loadingText={t('auth.changePassword.loadingText')}
                                >
                                    {state.success ? t('auth.changePassword.successButton') : t('auth.changePassword.submitButton')}
                                </SubmitButton>
                            </form>
                        </FormContainer>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default ChangePasswordPage;