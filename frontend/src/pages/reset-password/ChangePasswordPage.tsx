import React, { useActionState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { useAuth } from '../../store/hooks';
import { clearError } from '../../store/authSlice';
import PageLayout from '../../components/PageLayout';
import Footer from "../../components/Footer.tsx";
import FormInput from '../../components/FormInput';
import FormHeader from '../../components/FormHeader';
import { FormContainer, ErrorMessage, SuccessMessage, SubmitButton } from '../../components/FormContainer';
import { createChangePasswordAction, initialChangePasswordState } from '../../lib/authActions';

interface ChangePasswordPageProps {}

const ChangePasswordPage: React.FC<ChangePasswordPageProps> = () => {
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
                            title="Change Password"
                            subtitle="Enter your verification code and new password"
                        />

                        <FormContainer>
                            {/* Global Error */}
                            {(error || state.errors.general) && (
                                <ErrorMessage message={error || state.errors.general!} />
                            )}

                            {/* Success message */}
                            {state.success && (
                                <SuccessMessage message="Password successfully changed! Redirecting to login page..." />
                            )}

                            <form action={formAction} className="space-y-6" noValidate>
                                <FormInput
                                    id="code"
                                    name="code"
                                    label="Verification Code"
                                    type="text"
                                    placeholder="693415"
                                    error={state.errors.code}
                                    disabled={isPending || isLoading || state.success}
                                />

                                <FormInput
                                    id="newPassword"
                                    name="newPassword"
                                    label="New Password"
                                    type="password"
                                    placeholder="Enter new password"
                                    error={state.errors.newPassword}
                                    disabled={isPending || isLoading || state.success}
                                />

                                <SubmitButton
                                    isLoading={isPending || isLoading}
                                    disabled={state.success}
                                    loadingText="Changing Password..."
                                >
                                    {state.success ? 'Success!' : 'Change Password'}
                                </SubmitButton>
                            </form>
                        </FormContainer>
                    </div>
                </div>
            </div>
            <Footer />
        </PageLayout>
    );
};

export default ChangePasswordPage;