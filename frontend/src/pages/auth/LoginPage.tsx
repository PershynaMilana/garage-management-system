import React, { useActionState, useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../store/hooks';
import { useAuth } from '../../store/hooks';
import { clearError } from '../../store/authSlice';
import PageLayout from '../../components/layout/PageLayout.tsx';
import FormHeader from '../../components/forms/FormHeader';
import { FormContainer, ErrorMessage, SuccessMessage, SubmitButton } from '../../components/forms/FormContainer';
import { createLoginAction, initialLoginState } from '../../lib/authActions';
import { validateEmail, validatePassword } from '../../utils/validation';

interface LoginPageProps {}

// Debounce hook for performance optimization
const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

const LoginPage: React.FC<LoginPageProps> = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, error, isAuthenticated } = useAuth();

    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    });

    const [fieldState, setFieldState] = useState({
        email: { touched: false, focused: false },
        password: { touched: false, focused: false }
    });

    // validate after user stops typing
    const debouncedEmail = useDebounce(formValues.email, 300);
    const debouncedPassword = useDebounce(formValues.password, 300);

    const [validationErrors, setValidationErrors] = useState({
        email: undefined as string | undefined,
        password: undefined as string | undefined
    });

    // Cleanup auth errors on unmount
    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/main-page');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (fieldState.email.touched) {
            setValidationErrors(prev => ({
                ...prev,
                email: validateEmail(debouncedEmail)
            }));
        }
    }, [debouncedEmail, fieldState.email.touched]);

    useEffect(() => {
        if (fieldState.password.touched) {
            setValidationErrors(prev => ({
                ...prev,
                password: validatePassword(debouncedPassword)
            }));
        }
    }, [debouncedPassword, fieldState.password.touched]);

    // Create login action
    const loginAction = createLoginAction(dispatch);
    const [state, formAction, isPending] = useActionState(loginAction, initialLoginState);

    // Optimized field change handler
    const handleFieldChange = useCallback((fieldName: 'email' | 'password', value: string) => {
        // Update form values immediately for responsive UI
        setFormValues(prev => ({
            ...prev,
            [fieldName]: value
        }));

        // Mark as touched if not already
        if (!fieldState[fieldName].touched) {
            setFieldState(prev => ({
                ...prev,
                [fieldName]: { ...prev[fieldName], touched: true }
            }));
        }
    }, [fieldState]);

    // Handle field focus
    const handleFieldFocus = useCallback((fieldName: 'email' | 'password') => {
        setFieldState(prev => ({
            ...prev,
            [fieldName]: { ...prev[fieldName], focused: true }
        }));
    }, []);

    // Handle field blur
    const handleFieldBlur = useCallback((fieldName: 'email' | 'password') => {
        setFieldState(prev => ({
            ...prev,
            [fieldName]: {
                ...prev[fieldName],
                focused: false,
                touched: true
            }
        }));

        // Immediate validation on blur for better UX
        if (fieldName === 'email') {
            setValidationErrors(prev => ({
                ...prev,
                email: validateEmail(formValues.email)
            }));
        } else if (fieldName === 'password') {
            setValidationErrors(prev => ({
                ...prev,
                password: validatePassword(formValues.password)
            }));
        }
    }, [formValues]);

    // Get field error with priority: server > validation > none
    const getFieldError = (fieldName: 'email' | 'password') => {
        // Don't show validation errors while user is actively typing
        if (fieldState[fieldName].focused && !state.errors[fieldName]) {
            return undefined;
        }
        return state.errors[fieldName] || validationErrors[fieldName];
    };

    return (
        <PageLayout>
            <div className="relative overflow-hidden">
                {/* Main Content */}
                <div className="xl:mt-[10vh] sm:mt-[10vh] relative z-10 flex items-center justify-center p-4">
                    <div className="w-full max-w-md">

                        <FormHeader
                            title={t('auth.login.title')}
                            subtitle={t('auth.login.subtitle')}
                        />

                        <FormContainer>
                            {/* Global Error */}
                            {(error || state.errors.general) && (
                                <ErrorMessage message={error || state.errors.general!} />
                            )}

                            {/* Success message */}
                            {state.success && (
                                <SuccessMessage message={t('auth.login.successMessage')} />
                            )}

                            {/* Form with React 19 action - noValidate отключает HTML валидацию */}
                            <form action={formAction} className="space-y-6" noValidate>
                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="block text-[#FFFFFF] font-[Ubuntu-Regular] text-[12pt] mb-3">
                                        {t('auth.login.email')}
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formValues.email}
                                        placeholder={t('auth.login.emailPlaceholder')}
                                        className={`w-full px-4 py-4 bg-[#527f8b]/50 border rounded-lg
                                   text-[#FFFFFF] placeholder-[#FFFFFF]/50 font-[Ubuntu-Regular] text-[12pt]
                                   focus:outline-none focus:ring-2 transition-all duration-200 backdrop-blur-sm
                                   ${getFieldError('email')
                                            ? 'border-[#B63232] focus:ring-[#B63232] focus:border-[#B63232]'
                                            : 'border-[#4e6b8c] focus:ring-[#87d7de] focus:border-[#87d7de]'
                                        }`}
                                        onChange={(e) => handleFieldChange('email', e.target.value)}
                                        onFocus={() => handleFieldFocus('email')}
                                        onBlur={() => handleFieldBlur('email')}
                                        disabled={isPending || isLoading}
                                    />
                                    {getFieldError('email') && (
                                        <p className="mt-2 text-[#B63232] text-[10pt] font-[Ubuntu-Regular]">
                                            {getFieldError('email')}
                                        </p>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label htmlFor="password" className="block text-[#FFFFFF] font-[Ubuntu-Regular] text-[12pt] mb-3">
                                        {t('auth.login.password')}
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={formValues.password}
                                        placeholder={t('auth.login.passwordPlaceholder')}
                                        className={`w-full px-4 py-4 bg-[#527f8b]/50 border rounded-lg
                                   text-[#FFFFFF] placeholder-[#FFFFFF]/50 font-[Ubuntu-Regular] text-[12pt]
                                   focus:outline-none focus:ring-2 transition-all duration-200 backdrop-blur-sm
                                   ${getFieldError('password')
                                            ? 'border-[#B63232] focus:ring-[#B63232] focus:border-[#B63232]'
                                            : 'border-[#4e6b8c] focus:ring-[#87d7de] focus:border-[#87d7de]'
                                        }`}
                                        onChange={(e) => handleFieldChange('password', e.target.value)}
                                        onFocus={() => handleFieldFocus('password')}
                                        onBlur={() => handleFieldBlur('password')}
                                        disabled={isPending || isLoading}
                                    />
                                    {getFieldError('password') && (
                                        <p className="mt-2 text-[#B63232] text-[10pt] font-[Ubuntu-Regular]">
                                            {getFieldError('password')}
                                        </p>
                                    )}
                                </div>

                                <SubmitButton
                                    isLoading={isPending || isLoading}
                                    loadingText={t('auth.login.loadingText')}
                                >
                                    {t('auth.login.submitButton')}
                                </SubmitButton>
                            </form>

                            {/* Footer Links */}
                            <div className="flex justify-between items-center mt-6">
                                <Link
                                    to="/forgot-password"
                                    className="text-[#FFFFFF]/70 hover:text-[#87d7de] transition-colors duration-200 underline font-[Ubuntu-Regular] text-[10pt]"
                                >
                                    {t('auth.login.forgotPassword')}
                                </Link>
                                <Link
                                    to="/signup"
                                    className="text-[#FFFFFF]/70 hover:text-[#87d7de] transition-colors duration-200 underline font-[Ubuntu-Regular] text-[10pt]"
                                >
                                    {t('auth.login.signUp')}
                                </Link>
                            </div>
                        </FormContainer>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default LoginPage;