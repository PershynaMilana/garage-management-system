import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { useAuth } from '../../store/hooks';
import { changePassword, clearError } from '../../store/authSlice';
import PageLayout from '../../components/PageLayout';
import Footer from "../../components/Footer.tsx";

interface ChangePasswordPageProps {}

interface ValidationErrors {
    code?: string;
    newPassword?: string;
}

const ChangePasswordPage: React.FC<ChangePasswordPageProps> = () => {
    const [formData, setFormData] = useState({
        code: '',
        newPassword: ''
    });
    const [success, setSuccess] = useState(false);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
    const [touched, setTouched] = useState({ code: false, newPassword: false });

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useAuth();

    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    const validateCode = (code: string): string | undefined => {
        if (!code) {
            return 'Code is required';
        }
        if (!/^\d{6}$/.test(code)) {
            return 'Code must be 6 digits';
        }
        return undefined;
    };

    const validatePassword = (password: string): string | undefined => {
        if (!password) {
            return 'New password is required';
        }
        if (password.length < 8) {
            return 'Password must be at least 8 characters long';
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        }
        return undefined;
    };

    useEffect(() => {
        const errors: ValidationErrors = {};

        if (touched.code) {
            const codeError = validateCode(formData.code);
            if (codeError) errors.code = codeError;
        }

        if (touched.newPassword) {
            const passwordError = validatePassword(formData.newPassword);
            if (passwordError) errors.newPassword = passwordError;
        }

        setValidationErrors(errors);
    }, [formData.code, formData.newPassword, touched]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (!touched[name as keyof typeof touched]) {
            setTouched(prev => ({ ...prev, [name]: true }));
        }
    };

    const handleBlur = (field: keyof typeof touched) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setTouched({ code: true, newPassword: true });

        const codeError = validateCode(formData.code);
        const passwordError = validatePassword(formData.newPassword);

        if (codeError || passwordError) {
            setValidationErrors({
                code: codeError,
                newPassword: passwordError
            });
            return;
        }

        const result = await dispatch(changePassword(formData));

        if (changePassword.fulfilled.match(result)) {
            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        }
    };

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
                                Change Password
                            </h2>
                            <h2 className="text-[#FFFFFF] font-[IBMPlexMono-Regular] text-[16pt]">
                                Enter your verification code and new password
                            </h2>
                            <div className="w-full h-0.5 bg-[#87d7de] mx-auto my-4"></div>
                        </div>

                        {/* Change Password Card */}
                        <div className="backdrop-blur-sm rounded-lg p-8 shadow-2xl border border-[#696969]/30">

                            {/* Global Error */}
                            {error && (
                                <div className="mb-6 p-4 bg-[#B63232]/20 border border-[#B63232]/50 rounded-lg">
                                    <p className="text-[#B63232] text-[10pt] font-[Ubuntu-Regular]">{error}</p>
                                </div>
                            )}

                            {/* Success message */}
                            {success && (
                                <div className="mb-6 p-4 bg-[#22C55E]/20 border border-[#22C55E]/50 rounded-lg">
                                    <p className="text-[#22C55E] text-[10pt] font-[Ubuntu-Regular]">
                                        Password successfully changed! Redirecting to login page...
                                    </p>
                                </div>
                            )}

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="code" className="block text-[#FFFFFF] font-[Ubuntu-Regular] text-[12pt] mb-3">
                                        Verification Code
                                    </label>
                                    <input
                                        id="code"
                                        name="code"
                                        type="text"
                                        value={formData.code}
                                        onChange={handleChange}
                                        onBlur={() => handleBlur('code')}
                                        placeholder="******"
                                        maxLength={6}
                                        className={`w-full px-4 py-4 bg-[#527f8b]/50 border rounded-lg
                                   text-[#FFFFFF] placeholder-[#FFFFFF]/50 font-[Ubuntu-Regular] text-[12pt]
                                   focus:outline-none focus:ring-2 transition-all duration-200 backdrop-blur-sm
                                   ${validationErrors.code
                                            ? 'border-[#B63232] focus:ring-[#B63232] focus:border-[#B63232]'
                                            : 'border-[#4e6b8c] focus:ring-[#87d7de] focus:border-[#87d7de]'
                                        }`}
                                        required
                                        disabled={isLoading || success}
                                    />
                                    {validationErrors.code && (
                                        <p className="mt-2 text-[#B63232] text-[10pt] font-[Ubuntu-Regular]">
                                            {validationErrors.code}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="newPassword" className="block text-[#FFFFFF] font-[Ubuntu-Regular] text-[12pt] mb-3">
                                        New Password
                                    </label>
                                    <input
                                        id="newPassword"
                                        name="newPassword"
                                        type="password"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        onBlur={() => handleBlur('newPassword')}
                                        placeholder="Enter new password"
                                        className={`w-full px-4 py-4 bg-[#527f8b]/50 border rounded-lg
                                   text-[#FFFFFF] placeholder-[#FFFFFF]/50 font-[Ubuntu-Regular] text-[12pt]
                                   focus:outline-none focus:ring-2 transition-all duration-200 backdrop-blur-sm
                                   ${validationErrors.newPassword
                                            ? 'border-[#B63232] focus:ring-[#B63232] focus:border-[#B63232]'
                                            : 'border-[#4e6b8c] focus:ring-[#87d7de] focus:border-[#87d7de]'
                                        }`}
                                        required
                                        disabled={isLoading || success}
                                    />
                                    {validationErrors.newPassword && (
                                        <p className="mt-2 text-[#B63232] text-[10pt] font-[Ubuntu-Regular]">
                                            {validationErrors.newPassword}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading || success}
                                    className="w-full bg-[#FFFFFF] text-[#0c0c18] py-4 px-6 rounded-lg
                               font-[Ubuntu-Regular] text-[12pt] font-medium hover:bg-[#87d7de] hover:text-[#FFFFFF]
                               focus:outline-none focus:ring-2 focus:ring-[#87d7de] focus:ring-offset-2
                               focus:ring-offset-[#33455e] transition-all duration-200
                               disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? 'Changing Password...' : success ? 'Success!' : 'Change Password'}
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

export default ChangePasswordPage;