import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { useAuth } from '../../store/hooks';
import { registerUser, clearError } from '../../store/authSlice';
import PageLayout from '../../components/PageLayout';
import Footer from "../../components/Footer.tsx";

interface RegisterPageProps {}

interface ValidationErrors {
    fullName?: string;
    email?: string;
    password?: string;
    garageNumber?: string;
}

const RegisterPage: React.FC<RegisterPageProps> = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        garageNumber: ''
    });
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
    const [touched, setTouched] = useState({
        fullName: false,
        email: false,
        password: false,
        garageNumber: false
    });

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
        if (password.length < 6) {
            return 'Password must be at least 6 characters long';
        }
        return undefined;
    };

    const validateGarageNumber = (garageNumber: string): string | undefined => {
        if (!garageNumber.trim()) {
            return 'Garage number is required';
        }
        return undefined;
    };

    useEffect(() => {
        const errors: ValidationErrors = {};

        if (touched.fullName) {
            const nameError = validateFullName(formData.fullName);
            if (nameError) errors.fullName = nameError;
        }

        if (touched.email) {
            const emailError = validateEmail(formData.email);
            if (emailError) errors.email = emailError;
        }

        if (touched.password) {
            const passwordError = validatePassword(formData.password);
            if (passwordError) errors.password = passwordError;
        }

        if (touched.garageNumber) {
            const garageError = validateGarageNumber(formData.garageNumber);
            if (garageError) errors.garageNumber = garageError;
        }

        setValidationErrors(errors);
    }, [formData, touched]);

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

    const handleBlur = (fieldName: keyof typeof touched) => {
        setTouched(prev => ({ ...prev, [fieldName]: true }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setTouched({
            fullName: true,
            email: true,
            password: true,
            garageNumber: true
        });

        const nameError = validateFullName(formData.fullName);
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);
        const garageError = validateGarageNumber(formData.garageNumber);

        if (nameError || emailError || passwordError || garageError) {
            setValidationErrors({
                fullName: nameError,
                email: emailError,
                password: passwordError,
                garageNumber: garageError
            });
            return;
        }

        dispatch(registerUser(formData));
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
                                Welcome
                            </h2>
                            <h2 className="text-[#FFFFFF] font-[IBMPlexMono-Regular] text-[18pt]">Let's get to know each other</h2>
                            <div className="w-full h-0.5 bg-[#87d7de] mx-auto my-4"></div>
                        </div>

                        {/* Register Card */}
                        <div className="backdrop-blur-sm rounded-lg p-8 shadow-2xl border border-[#696969]/30">

                            {/* Global Error */}
                            {error && (
                                <div className="mb-6 p-4 bg-[#B63232]/20 border border-[#B63232]/50 rounded-lg">
                                    <p className="text-[#B63232] text-[10pt] font-[Ubuntu-Regular]">{error}</p>
                                </div>
                            )}

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Full Name */}
                                <div>
                                    <label htmlFor="fullName" className="block text-[#FFFFFF] font-[Ubuntu-Regular] text-[12pt] mb-3">
                                        Full Name
                                    </label>
                                    <input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        onBlur={() => handleBlur('fullName')}
                                        placeholder="Devon Lane"
                                        className={`w-full px-4 py-4 bg-[#527f8b]/50 border rounded-lg
                           text-[#FFFFFF] placeholder-[#FFFFFF]/50 font-[Ubuntu-Regular] text-[12pt]
                           focus:outline-none focus:ring-2 transition-all duration-200 backdrop-blur-sm
                           ${validationErrors.fullName
                                            ? 'border-[#B63232] focus:ring-[#B63232] focus:border-[#B63232]'
                                            : 'border-[#4e6b8c] focus:ring-[#87d7de] focus:border-[#87d7de]'
                                        }`}
                                        disabled={isLoading}
                                    />
                                    {validationErrors.fullName && (
                                        <p className="mt-2 text-[#B63232] text-[10pt] font-[Ubuntu-Regular]">
                                            {validationErrors.fullName}
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
                                        value={formData.email}
                                        onChange={handleChange}
                                        onBlur={() => handleBlur('email')}
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

                                {/* Password */}
                                <div>
                                    <label htmlFor="password" className="block text-[#FFFFFF] font-[Ubuntu-Regular] text-[12pt] mb-3">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        onBlur={() => handleBlur('password')}
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

                                {/* Garage Number */}
                                <div>
                                    <label htmlFor="garageNumber" className="block text-[#FFFFFF] font-[Ubuntu-Regular] text-[12pt] mb-3">
                                        Garage Number
                                    </label>
                                    <input
                                        id="garageNumber"
                                        name="garageNumber"
                                        type="text"
                                        value={formData.garageNumber}
                                        onChange={handleChange}
                                        onBlur={() => handleBlur('garageNumber')}
                                        placeholder=""
                                        className={`w-full px-4 py-4 bg-[#527f8b]/50 border rounded-lg
                           text-[#FFFFFF] placeholder-[#FFFFFF]/50 font-[Ubuntu-Regular] text-[12pt]
                           focus:outline-none focus:ring-2 transition-all duration-200 backdrop-blur-sm
                           ${validationErrors.garageNumber
                                            ? 'border-[#B63232] focus:ring-[#B63232] focus:border-[#B63232]'
                                            : 'border-[#4e6b8c] focus:ring-[#87d7de] focus:border-[#87d7de]'
                                        }`}
                                        disabled={isLoading}
                                    />
                                    {validationErrors.garageNumber && (
                                        <p className="mt-2 text-[#B63232] text-[10pt] font-[Ubuntu-Regular]">
                                            {validationErrors.garageNumber}
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
                                    {isLoading ? 'Signing Up...' : 'Sign Up'}
                                </button>
                            </form>

                            {/* Footer Link */}
                            <div className="text-center mt-6">
                                <span className="text-[#FFFFFF]/70 font-[Ubuntu-Regular] text-[10pt]">Already have an account? </span>
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