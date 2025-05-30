import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageLayout from '../../components/PageLayout';
import FormHeader from '../../components/forms/FormHeader';
import { FormContainer } from '../../components/forms/FormContainer';
import Logo from '/Logo.png';

interface NotFoundPageProps {}

const NotFoundPage: React.FC<NotFoundPageProps> = () => {
    const { t } = useTranslation();

    return (
        <PageLayout>
            <div className="relative overflow-hidden">
                {/* Main Content */}
                <div className="xl:mt-[10vh] sm:mt-[10vh] relative z-10 flex items-center justify-center p-4">
                    <div className="w-full max-w-md">

                        <FormHeader
                            title="404"
                            subtitle={t('notFound.pageNotFound')}
                        />

                        <FormContainer>
                            {/* 404 Icon */}
                            <div className="text-center mb-6">
                                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#87d7de]/20 mb-4">
                                    <img src={Logo} alt="logo" height="50px" width="50px"/>
                                </div>
                            </div>

                            {/* Error Message */}
                            <div className="text-center mb-8">
                                <p className="text-[#FFFFFF]/70 font-[Ubuntu-Regular] text-[12pt] mb-4">
                                    {t('notFound.mainMessage')}
                                </p>
                                <p className="text-[#FFFFFF]/50 font-[Ubuntu-Regular] text-[10pt]">
                                    {t('notFound.description')}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-4">
                                {/* Go Home Button */}
                                <Link
                                    to="/main-page"
                                    className="block w-full text-center bg-[#FFFFFF] text-[#0c0c18] py-4 px-6 rounded-lg
                                        font-[Ubuntu-Regular] text-[12pt] font-medium hover:bg-[#87d7de] hover:text-[#FFFFFF]
                                        focus:outline-none focus:ring-2 focus:ring-[#87d7de] focus:ring-offset-2
                                        focus:ring-offset-[#33455e] transition-all duration-200"
                                >
                                    {t('notFound.goToMainPage')}
                                </Link>

                                {/* Go Back Button */}
                                <button
                                    onClick={() => window.history.back()}
                                    className="block w-full text-center bg-transparent border border-[#87d7de] text-[#87d7de] py-4 px-6 rounded-lg
                                        font-[Ubuntu-Regular] text-[12pt] font-medium hover:bg-[#87d7de] hover:text-[#FFFFFF]
                                        focus:outline-none focus:ring-2 focus:ring-[#87d7de] focus:ring-offset-2
                                        focus:ring-offset-[#33455e] transition-all duration-200"
                                >
                                    {t('notFound.goBack')}
                                </button>
                            </div>

                            {/* Additional Links */}
                            <div className="flex justify-center items-center mt-8 space-x-6">
                                <Link
                                    to="/login"
                                    className="text-[#FFFFFF]/70 hover:text-[#87d7de] transition-colors duration-200 underline font-[Ubuntu-Regular] text-[10pt]"
                                >
                                    {t('notFound.signIn')}
                                </Link>
                                <span className="text-[#FFFFFF]/30">•</span>
                                <Link
                                    to="/signup"
                                    className="text-[#FFFFFF]/70 hover:text-[#87d7de] transition-colors duration-200 underline font-[Ubuntu-Regular] text-[10pt]"
                                >
                                    {t('notFound.signUp')}
                                </Link>
                            </div>

                            {/* Help Text */}
                            <div className="mt-8 p-4 bg-[#87d7de]/10 border border-[#87d7de]/30 rounded-lg">
                                <p className="text-[#87d7de] text-[10pt] font-[Ubuntu-Regular] text-center">
                                    💡 {t('notFound.helpText')}
                                </p>
                            </div>
                        </FormContainer>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default NotFoundPage;