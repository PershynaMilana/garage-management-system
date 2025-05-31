import React, { useActionState, useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../store/hooks';
import { useAuth } from '../../store/hooks';
import { clearError } from '../../store/authSlice';
import PageLayout from '../../components/layout/PageLayout.tsx';
import FormHeader from '../../components/forms/FormHeader';
import { FormContainer, ErrorMessage, SuccessMessage, SubmitButton } from '../../components/forms/FormContainer';
import { createRegisterAction, initialRegisterState } from '../../lib/authActions';
import {
    validateEmail,
    validateStrongPassword,
    validateFullName,
    validatePhoneNumber
} from '../../utils/validation';

interface RegisterPageProps {}

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

const RegisterPage: React.FC<RegisterPageProps> = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, error, isAuthenticated } = useAuth();

    // Form values state
    const [formValues, setFormValues] = useState({
        fullName: '',
        email: '',
        password: '',
        phoneNumber: ''
    });

    const [fieldState, setFieldState] = useState({
        fullName: { touched: false, focused: false },
        email: { touched: false, focused: false },
        password: { touched: false, focused: false },
        phoneNumber: { touched: false, focused: false }
    });

    // validate after user stops typing
    const debouncedFullName = useDebounce(formValues.fullName, 300);
    const debouncedEmail = useDebounce(formValues.email, 300);
    const debouncedPassword = useDebounce(formValues.password, 300);
    const debouncedPhoneNumber = useDebounce(formValues.phoneNumber, 300);

    const [validationErrors, setValidationErrors] = useState({
        fullName: undefined as string | undefined,
        email: undefined as string | undefined,
        password: undefined as string | undefined,
        phoneNumber: undefined as string | undefined
    });

    // Cleanup auth errors on unmounting
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
        if (fieldState.fullName.touched) {
            setValidationErrors(prev => ({
                ...prev,
                fullName: validateFullName(debouncedFullName)
            }));
        }
    }, [debouncedFullName, fieldState.fullName.touched]);

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
                password: validateStrongPassword(debouncedPassword)
            }));
        }
    }, [debouncedPassword, fieldState.password.touched]);

    useEffect(() => {
        if (fieldState.phoneNumber.touched) {
            setValidationErrors(prev => ({
                ...prev,
                phoneNumber: validatePhoneNumber(debouncedPhoneNumber)
            }));
        }
    }, [debouncedPhoneNumber, fieldState.phoneNumber.touched]);

    // Create register action using extracted logic
    const registerAction = createRegisterAction(dispatch);
    const [state, formAction, isPending] = useActionState(registerAction, initialRegisterState);

    // Optimized field change handler
    const handleFieldChange = useCallback((fieldName: keyof typeof formValues, value: string) => {
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
    const handleFieldFocus = useCallback((fieldName: keyof typeof formValues) => {
        setFieldState(prev => ({
            ...prev,
            [fieldName]: { ...prev[fieldName], focused: true }
        }));
    }, []);

    // Handle field blur
    const handleFieldBlur = useCallback((fieldName: keyof typeof formValues) => {
        setFieldState(prev => ({
            ...prev,
            [fieldName]: {
                ...prev[fieldName],
                focused: false,
                touched: true
            }
        }));

        // Immediate validation on blur for better UX
        let error: string | undefined;
        switch (fieldName) {
            case 'fullName':
                error = validateFullName(formValues.fullName);
                break;
            case 'email':
                error = validateEmail(formValues.email);
                break;
            case 'password':
                error = validateStrongPassword(formValues.password);
                break;
            case 'phoneNumber':
                error = validatePhoneNumber(formValues.phoneNumber);
                break;
        }

        setValidationErrors(prev => ({
            ...prev,
            [fieldName]: error
        }));
    }, [formValues]);

    // Get field error with priority: server > validation > none
    const getFieldError = (fieldName: keyof typeof formValues) => {
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
                            title={t('auth.register.title')}
                            subtitle={t('auth.register.subtitle')}
                        />

                        <FormContainer>
                            {/* Global Error */}
                            {(error || state.errors.general) && (
                                <ErrorMessage message={error || state.errors.general!} />
                            )}

                            {/* Success message */}
                            {state.success && (
                                <SuccessMessage message={t('auth.register.successMessage')} />
                            )}

                            {/* Form with React 19 action - noValidate отключает HTML валидацию */}
                            <form action={formAction} className="space-y-6" noValidate>
                                {/* Full Name Field */}
                                <div>
                                    <label htmlFor="fullName" className="block text-[#FFFFFF] font-[Ubuntu-Regular] text-[12pt] mb-3">
                                        {t('auth.register.fullName')}
                                    </label>
                                    <input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        value={formValues.fullName}
                                        placeholder={t('auth.register.fullNamePlaceholder')}
                                        className={`w-full px-4 py-4 bg-[#527f8b]/50 border rounded-lg
                                   text-[#FFFFFF] placeholder-[#FFFFFF]/50 font-[Ubuntu-Regular] text-[12pt]
                                   focus:outline-none focus:ring-2 transition-all duration-200 backdrop-blur-sm
                                   ${getFieldError('fullName')
                                            ? 'border-[#B63232] focus:ring-[#B63232] focus:border-[#B63232]'
                                            : 'border-[#4e6b8c] focus:ring-[#87d7de] focus:border-[#87d7de]'
                                        }`}
                                        onChange={(e) => handleFieldChange('fullName', e.target.value)}
                                        onFocus={() => handleFieldFocus('fullName')}
                                        onBlur={() => handleFieldBlur('fullName')}
                                        disabled={isPending || isLoading}
                                    />
                                    {getFieldError('fullName') && (
                                        <p className="mt-2 text-[#B63232] text-[10pt] font-[Ubuntu-Regular]">
                                            {getFieldError('fullName')}
                                        </p>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="block text-[#FFFFFF] font-[Ubuntu-Regular] text-[12pt] mb-3">
                                        {t('auth.register.email')}
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formValues.email}
                                        placeholder={t('auth.register.emailPlaceholder')}
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
                                        {t('auth.register.password')}
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={formValues.password}
                                        placeholder={t('auth.register.passwordPlaceholder')}
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

                                {/* Phone Number Field */}
                                <div>
                                    <label htmlFor="phoneNumber" className="block text-[#FFFFFF] font-[Ubuntu-Regular] text-[12pt] mb-3">
                                        {t('auth.register.phoneNumber')}
                                    </label>
                                    <input
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        type="text"
                                        value={formValues.phoneNumber}
                                        placeholder={t('auth.register.phoneNumberPlaceholder')}
                                        className={`w-full px-4 py-4 bg-[#527f8b]/50 border rounded-lg
                                   text-[#FFFFFF] placeholder-[#FFFFFF]/50 font-[Ubuntu-Regular] text-[12pt]
                                   focus:outline-none focus:ring-2 transition-all duration-200 backdrop-blur-sm
                                   ${getFieldError('phoneNumber')
                                            ? 'border-[#B63232] focus:ring-[#B63232] focus:border-[#B63232]'
                                            : 'border-[#4e6b8c] focus:ring-[#87d7de] focus:border-[#87d7de]'
                                        }`}
                                        onChange={(e) => handleFieldChange('phoneNumber', e.target.value)}
                                        onFocus={() => handleFieldFocus('phoneNumber')}
                                        onBlur={() => handleFieldBlur('phoneNumber')}
                                        disabled={isPending || isLoading}
                                    />
                                    {getFieldError('phoneNumber') && (
                                        <p className="mt-2 text-[#B63232] text-[10pt] font-[Ubuntu-Regular]">
                                            {getFieldError('phoneNumber')}
                                        </p>
                                    )}
                                </div>

                                <SubmitButton
                                    isLoading={isPending || isLoading}
                                    loadingText={t('auth.register.loadingText')}
                                >
                                    {t('auth.register.submitButton')}
                                </SubmitButton>
                            </form>

                            {/* Footer Link */}
                            <div className="text-center mt-6">
                                <span className="text-[#FFFFFF]/70 font-[Ubuntu-Regular] text-[10pt]">
                                    {t('auth.register.alreadyHaveAccount')}
                                </span>
                                {' '}
                                <Link
                                    to="/login"
                                    className="text-[#FFFFFF]/70 hover:text-[#87d7de] transition-colors duration-200 underline font-[Ubuntu-Regular] text-[10pt]"
                                >
                                    {t('auth.register.signIn')}
                                </Link>
                            </div>
                        </FormContainer>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default RegisterPage;