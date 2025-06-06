import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PageLayout from '../../components/layout/PageLayout.tsx';
import { validateEmail, validateFullName, validateStrongPassword } from '../../utils/validation';
import { authApi } from '../../api/authApi';
import PhotoUploadModal from "../../components/modals/PhotoUploadModal.tsx";
import AccountModal from "../../components/modals/AccountModal.tsx";
import { ThemeSettings } from "../../contexts";
import useTheme from "../../hooks/useTheme.ts";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { User } from '../../types/auth';
import { validateCurrentToken, setUser } from '../../store/authSlice'; // Імпортуємо setUser для оновлення стану

interface SettingsPageProps { }

const SettingsPage: React.FC<SettingsPageProps> = () => {
    const { i18n, t } = useTranslation();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch<AppDispatch>();
    const { user: reduxUser, isLoading: authLoading } = useSelector((state: RootState) => state.auth);

    const [activeTab, setActiveTab] = useState<'general' | 'account' | 'theme'>('account');
    const { settings, updateTheme, updateFontSize, updateBackground } = useTheme();
    const [timeFormat, setTimeFormat] = useState('12h');
    const [language, setLanguage] = useState(i18n.language);
    const [notifications, setNotifications] = useState(true);

    const [showAccountModal, setShowAccountModal] = useState(false);
    const [showPhotoModal, setShowPhotoModal] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    // Виправлено: Додано newPhoneNumber до початкового стану
    const [profileData, setProfileData] = useState({
        name: reduxUser?.fullName || 'Name',
        newName: '',
        password: '********',
        newPassword: '',
        email: reduxUser?.email || 'email@gmail.com',
        newEmail: '',
        phoneNumber: reduxUser?.phoneNumber || '',
        newPhoneNumber: '' // Додано нове поле
    });

    const [validationErrors, setValidationErrors] = useState({
        newName: '',
        newEmail: '',
        newPassword: '',
        newPhoneNumber: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [uploadingPhoto, setUploadingPhoto] = useState(false);

    // useEffect для завантаження даних профілю та ініціалізації полів
    useEffect(() => {
        if (reduxUser) {
            setProfileData(prev => ({
                ...prev,
                name: reduxUser.fullName,
                email: reduxUser.email,
                phoneNumber: reduxUser.phoneNumber || '',
                // newName, newEmail, newPassword, newPhoneNumber залишаються порожніми для введення нових значень
            }));
            if (reduxUser.photoUrl) {
                setPhotoPreview(reduxUser.photoUrl);
            } else {
                setPhotoPreview(null);
            }
        }
    }, [reduxUser]); // Залежність тільки від reduxUser

    const handleLanguageChange = (newLang: string) => {
        setLanguage(newLang);
        i18n.changeLanguage(newLang);

        setTimeout(() => {
            const { newName, newEmail, newPassword, newPhoneNumber } = profileData;
            if (validationErrors.newName && newName.trim()) {
                setValidationErrors(prev => ({
                    ...prev,
                    newName: validateFullName(newName) || ''
                }));
            }
            if (validationErrors.newEmail && newEmail.trim()) {
                setValidationErrors(prev => ({
                    ...prev,
                    newEmail: validateEmail(newEmail) || ''
                }));
            }
            if (validationErrors.newPassword && newPassword.trim()) {
                setValidationErrors(prev => ({
                    ...prev,
                    newPassword: validateStrongPassword(newPassword) || ''
                }));
            }
            if (validationErrors.newPhoneNumber && newPhoneNumber.trim()) {
                setValidationErrors(prev => ({
                    ...prev,
                    newPhoneNumber: validateField('newPhoneNumber', newPhoneNumber) || ''
                }));
            }
        }, 100);
    };

    const validateField = useCallback((field: string, value: string) => {
        switch (field) {
            case 'newName':
                return validateFullName(value);
            case 'newEmail':
                return validateEmail(value);
            case 'newPassword':
                return validateStrongPassword(value);
            case 'newPhoneNumber':
                // Додайте більш детальну валідацію номера телефону, якщо потрібно
                return value.trim() === '' ? t('validation.phoneNumberRequired') : undefined;
            default:
                return undefined;
        }
    }, [t]);

    const handleFieldChange = useCallback((field: string, value: string) => {
        setProfileData(prev => ({
            ...prev,
            [field]: value
        }));

        if (value.trim()) {
            const error = validateField(field, value);
            setValidationErrors(prev => ({
                ...prev,
                [field]: error || ''
            }));
        } else {
            setValidationErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    }, [validateField]);

    const handleFieldBlur = useCallback((field: string, value: string) => {
        const error = validateField(field, value);
        setValidationErrors(prev => ({
            ...prev,
            [field]: error || ''
        }));
    }, [validateField]);

    const isFormValid = useCallback(() => {
        const { newName, newEmail, newPassword, newPhoneNumber } = profileData;

        const hasInput = newName.trim() || newEmail.trim() || newPassword.trim() || newPhoneNumber.trim();
        if (!hasInput) {
            return false;
        }

        const hasErrors = Object.values(validationErrors).some(error => error.length > 0);
        if (hasErrors) return false;

        if (newName.trim() && validateFullName(newName)) return false;
        if (newEmail.trim() && validateEmail(newEmail)) return false;
        if (newPassword.trim() && validateStrongPassword(newPassword)) return false;
        if (newPhoneNumber.trim() && validateField('newPhoneNumber', newPhoneNumber)) return false;

        return true;
    }, [profileData, validationErrors, validateField]);

    const handleSaveProfile = async () => {
        setIsLoading(true);

        try {
            const updateData = {
                newName: profileData.newName.trim() || undefined,
                newEmail: profileData.newEmail.trim() || undefined,
                newPassword: profileData.newPassword.trim() || undefined,
                newPhoneNumber: profileData.newPhoneNumber.trim() || undefined // Використовуємо newPhoneNumber
            };

            await authApi.updateProfile(updateData);

            // Виправлено: Викликаємо validateCurrentToken для оновлення стану користувача в Redux
            const updatedUser = await dispatch(validateCurrentToken()).unwrap();
            
            // Оновлюємо локальний стан profileData на основі оновлених даних з Redux
            setProfileData(prev => ({
                ...prev,
                name: updatedUser.user.fullName,
                email: updatedUser.user.email,
                phoneNumber: updatedUser.user.phoneNumber || '',
                newName: '',
                newEmail: '',
                newPassword: '',
                newPhoneNumber: '' // Очищаємо поле newPhoneNumber
            }));

            setValidationErrors({
                newName: '',
                newEmail: '',
                newPassword: '',
                newPhoneNumber: ''
            });

            console.log('Profile updated successfully');

        } catch (error: any) {
            console.error('Failed to update profile:', error.message);
            // Можна додати локальне повідомлення про помилку
        } finally {
            setIsLoading(false);
        }
    };

    const handleUploadPhoto = async () => {
        if (!selectedPhoto) return;

        setUploadingPhoto(true);

        try {
            const response = await authApi.uploadProfilePhoto(selectedPhoto);

            console.log('Photo uploaded successfully');
            if (response.photoUrl) {
                setPhotoPreview(response.photoUrl);
            }

            // Виправлено: Викликаємо validateCurrentToken для оновлення стану користувача в Redux
            // Це оновить photoUrl в Redux state
            await dispatch(validateCurrentToken()).unwrap();

            setShowPhotoModal(false);
        } catch (error: any) {
            console.error('Failed to upload photo:', error.message);
        } finally {
            setUploadingPhoto(false);
        }
    };

    const handleFileSelect = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            setSelectedPhoto(file);

            const reader = new FileReader();
            reader.onload = (e) => {
                setPhotoPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelect(files[0]);
        }
    };

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFileSelect(files[0]);
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'general':
                return (
                    <div className="space-y-4 md:space-y-6">
                        {/* Notifications */}
                        <div
                            className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 border-b border-[#4e6b8c]/20 gap-2 sm:gap-0">
                            <span
                                className="text-[14pt] md:text-[16pt] font-[Ubuntu-Regular]">{t('settings.notifications')}</span>
                            <button
                                onClick={() => setNotifications(!notifications)}
                                className={`self-start sm:self-auto relative w-12 h-6 rounded-full transition-colors ${
                                    notifications ? 'bg-[#87d7de]' : 'bg-[#4e6b8c]'
                                }`}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                    notifications ? 'translate-x-7' : 'translate-x-1'
                                }`}/>
                            </button>
                        </div>

                        {/* Time Format */}
                        <div
                            className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 border-b border-[#4e6b8c]/20 gap-2 sm:gap-0">
                            <span
                                className="text-[14pt] md:text-[16pt] font-[Ubuntu-Regular]">{t('settings.timeFormat')}</span>
                            <select
                                value={timeFormat}
                                onChange={(e) => setTimeFormat(e.target.value)}
                                className="bg-[#4e6b8c]/50 border border-[#4e6b8c] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#87d7de] text-sm md:text-base w-full sm:w-auto"
                            >
                                <option value="12h">12h</option>
                                <option value="24h">24h</option>
                            </select>
                        </div>

                        {/* Language */}
                        <div
                            className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 gap-2 sm:gap-0">
                            <span
                                className="text-[14pt] md:text-[16pt] font-[Ubuntu-Regular]">{t('settings.language')}</span>
                            <select
                                value={language}
                                onChange={(e) => handleLanguageChange(e.target.value)}
                                className="bg-[#4e6b8c]/50 border border-[#4e6b8c] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#87d7de] text-sm md:text-base w-full sm:w-auto"
                            >
                                <option value="en">English 🇬🇧</option>
                                <option value="uk">Ukraine 🇺🇦</option>
                            </select>
                        </div>
                    </div>
                );

            case 'account':
                return (
                    <div className="space-y-4 md:space-y-6">
                        {/* Profile Picture */}
                        <div
                            className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 border-b border-[#4e6b8c]/20 gap-4 sm:gap-0">
                            <span
                                className="text-[14pt] md:text-[16pt] font-[Ubuntu-Regular]">{t('settings.profilePicture')}</span>
                            <button
                                onClick={() => setShowPhotoModal(true)}
                                className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-[#4e6b8c] overflow-hidden group transition-all duration-300 hover:border-[#87d7de] self-center sm:self-auto"
                            >
                                {photoPreview ? (
                                    <>
                                        <img
                                            src={photoPreview}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                        <div
                                            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <span className="text-white text-xl md:text-2xl">✎</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div
                                            className="w-full h-full bg-[#4e6b8c]/50 flex items-center justify-center text-2xl md:text-3xl">
                                            📷
                                        </div>
                                        <div
                                            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <span className="text-white text-xl md:text-2xl">+</span>
                                        </div>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Account fields */}
                        {[
                            { label: t('settings.name'), key: 'name', type: 'text', readOnly: true, value: profileData.name },
                            {
                                label: t('settings.newName'),
                                key: 'newName',
                                type: 'text',
                                placeholder: t('settings.enterNewName'),
                                value: profileData.newName
                            },
                            { label: t('settings.email'), key: 'email', type: 'email', readOnly: true, value: profileData.email },
                            {
                                label: t('settings.changeEmail'),
                                key: 'newEmail',
                                type: 'email',
                                placeholder: t('settings.enterNewEmail'),
                                value: profileData.newEmail
                            },
                            { label: t('settings.phoneNumber'), key: 'phoneNumber', type: 'text', readOnly: true, value: profileData.phoneNumber },
                            {
                                label: t('settings.newPhoneNumber'),
                                key: 'newPhoneNumber',
                                type: 'text',
                                placeholder: t('settings.enterNewPhoneNumber'),
                                value: profileData.newPhoneNumber
                            },
                            { label: t('settings.password'), key: 'password', type: 'password', readOnly: true, value: profileData.password },
                            {
                                label: t('settings.newPassword'),
                                key: 'newPassword',
                                type: 'password',
                                placeholder: t('settings.enterNewPassword'),
                                value: profileData.newPassword
                            }
                        ].map((field, index) => (
                            <div key={field.key} className={`py-4 gap-2 sm:gap-0 ${
                                index < 7 ? 'border-b border-[#4e6b8c]/20' : ''
                            }`}>
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                    <span
                                        className="text-[14pt] md:text-[16pt] font-[Ubuntu-Regular]">{field.label}</span>
                                    <div className="w-full sm:w-auto sm:min-w-[200px]">
                                        <input
                                            type={field.type}
                                            // Виправлено: Правильний доступ до значення для readOnly та editable полів
                                            value={
                                                field.readOnly
                                                    ? field.value
                                                    : profileData[field.key as keyof typeof profileData]
                                            }
                                            onChange={field.readOnly ? undefined : (e) => handleFieldChange(field.key, e.target.value)}
                                            onBlur={field.readOnly ? undefined : (e) => handleFieldBlur(field.key, e.target.value)}
                                            placeholder={field.placeholder}
                                            readOnly={field.readOnly}
                                            className={`bg-[#4e6b8c]/50 border rounded-lg px-3 py-2 text-white placeholder-[#FFFFFF]/50 focus:outline-none text-sm md:text-base w-full ${
                                                field.readOnly
                                                    ? 'border-[#4e6b8c]'
                                                    : validationErrors[field.key as keyof typeof validationErrors]
                                                        ? 'border-red-500 focus:border-red-500'
                                                        : 'border-[#4e6b8c] focus:border-[#87d7de]'
                                            }`}
                                        />
                                        {!field.readOnly && validationErrors[field.key as keyof typeof validationErrors] && (
                                            <p className="text-red-400 text-xs mt-1">
                                                {validationErrors[field.key as keyof typeof validationErrors]}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={() => setShowAccountModal(true)}
                            disabled={!isFormValid() || isLoading}
                            className={`w-full py-3 px-6 rounded-lg font-[Ubuntu-Regular] transition-colors mt-6 ${
                                isFormValid() && !isLoading
                                    ? 'bg-[#4e6b8c] text-white hover:bg-[#4e6b8c]/80 cursor-pointer'
                                    : 'bg-[#4e6b8c]/30 text-[#FFFFFF]/50 cursor-not-allowed'
                            }`}
                        >
                            {isLoading ? t('common.saving') : t('settings.saveChanges')}
                        </button>
                    </div>
                );

            case 'theme':
                return (
                    <div className="space-y-4 md:space-y-6">
                        {/* Theme */}
                        <div
                            className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 border-b border-theme gap-2 sm:gap-0">
                            <span className="text-responsive-base font-[Ubuntu-Regular] text-theme-primary">
                                {t('settings.theme')}
                            </span>
                            <select
                                value={settings.theme}
                                onChange={(e) => updateTheme(e.target.value as ThemeSettings['theme'])}
                                className="bg-[#4e6b8c]/50 border border-[#4e6b8c] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#87d7de] text-sm md:text-base w-full sm:w-auto"
                            >
                                <option value="dark" className="bg-theme-input text-theme-primary">
                                    {t('theme.dark')}
                                </option>
                                <option value="light" className="bg-theme-input text-theme-primary">
                                    {t('theme.light')}
                                </option>
                                <option value="default" className="bg-theme-input text-theme-primary">
                                    {t('theme.default')}
                                </option>
                            </select>
                        </div>

                        {/* Background */}
                        <div
                            className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 border-b border-theme gap-2 sm:gap-0">
                            <span className="text-responsive-base font-[Ubuntu-Regular] text-theme-primary">
                                {t('settings.background')}
                            </span>
                            <select
                                value={settings.background}
                                onChange={(e) => updateBackground(e.target.value as ThemeSettings['background'])}
                                className="bg-[#4e6b8c]/50 border border-[#4e6b8c] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#87d7de] text-sm md:text-base w-full sm:w-auto"
                            >
                                <option value="default" className="bg-theme-input text-theme-primary">
                                    {t('background.default')}
                                </option>
                                <option value="custom" className="bg-theme-input text-theme-primary">
                                    {t('background.custom')}
                                </option>
                            </select>
                        </div>

                        {/* Font Size */}
                        <div
                            className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 gap-2 sm:gap-0">
                            <span className="text-responsive-base font-[Ubuntu-Regular] text-theme-primary">
                                {t('settings.font')}
                            </span>
                            <select
                                value={settings.fontSize}
                                onChange={(e) => updateFontSize(e.target.value as ThemeSettings['fontSize'])}
                                className="bg-[#4e6b8c]/50 border border-[#4e6b8c] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#87d7de] text-sm md:text-base w-full sm:w-auto"
                            >
                                <option value="12">
                                    {t('fontSize.small')}
                                </option>
                                <option value="16">
                                    {t('fontSize.medium')}
                                </option>
                                <option value="20">
                                    {t('fontSize.large')}
                                </option>
                                <option value="24">
                                    {t('fontSize.extraLarge')}
                                </option>
                            </select>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <PageLayout>
            <div className="h-auto text-white pt-[5vh]">
                {/* Header */}
                <div className="p-4 md:p-8">
                    <h1 className="text-[24pt] md:text-[36pt] font-[IBMPlexMono-Regular] text-left ml-0 md:ml-[12vw] mb-4 md:mb-8">{t('settings.title')}</h1>
                </div>

                {/* Main Content Container */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8">
                    <div
                        className="bg-[#2a3f5f]/30 backdrop-blur-sm rounded-lg border border-[#4e6b8c]/30 overflow-hidden">
                        {/* Settings Header - скрываем на мобильных */}
                        <div className="hidden md:block p-6 border-b border-[#4e6b8c]/30">
                            <h2 className="text-[24pt] font-[IBMPlexMono-Regular]">{t('settings.title')}</h2>
                        </div>

                        {/* Mobile Tab Selector */}
                        <div className="md:hidden border-b border-[#4e6b8c]/30">
                            <div className="flex">
                                {[
                                    { key: 'general', label: t('settings.general') },
                                    { key: 'account', label: t('settings.account') },
                                    { key: 'theme', label: t('settings.theme') }
                                ].map(tab => (
                                    <button
                                        key={tab.key}
                                        onClick={() => setActiveTab(tab.key as any)}
                                        className={`flex-1 p-4 text-center transition-colors border-b-2 ${
                                            activeTab === tab.key
                                                ? 'text-[#87d7de] border-[#87d7de] bg-[#87d7de]/10'
                                                : 'text-[#FFFFFF]/70 border-transparent'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex flex-col md:flex-row min-h-[60vh]">
                            {/* Desktop Sidebar */}
                            <div className="hidden md:block w-64 flex-shrink-0 border-r border-[#4e6b8c]/30">
                                <div className="p-6">
                                    <nav className="space-y-2">
                                        {[
                                            { key: 'general', label: t('settings.general') },
                                            { key: 'account', label: t('settings.account') },
                                            { key: 'theme', label: t('settings.theme') }
                                        ].map(tab => (
                                            <button
                                                key={tab.key}
                                                onClick={() => setActiveTab(tab.key as any)}
                                                className={`w-full text-left p-3 rounded-lg transition-colors ${
                                                    activeTab === tab.key
                                                        ? 'bg-[#87d7de]/20 text-[#87d7de] border-l-4 border-[#87d7de]'
                                                        : 'text-[#FFFFFF]/70 hover:bg-[#4e6b8c]/20'
                                                }`}
                                            >
                                                {tab.label}
                                            </button>
                                        ))}
                                    </nav>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="flex-1 p-4 md:p-6">
                                {renderTabContent()}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modals */}
                <AccountModal
                    isOpen={showAccountModal}
                    onClose={() => setShowAccountModal(false)}
                    onConfirm={async () => {
                        setShowAccountModal(false);
                        await handleSaveProfile();
                    }}
                    isLoading={isLoading}
                />

                <PhotoUploadModal
                    isOpen={showPhotoModal}
                    onClose={() => {
                        setShowPhotoModal(false);
                        setSelectedPhoto(null);
                        setPhotoPreview(null);
                    }}
                    selectedPhoto={selectedPhoto}
                    photoPreview={photoPreview}
                    isDragOver={isDragOver}
                    fileInputRef={fileInputRef} // Тепер тип RefObject<HTMLInputElement | null>
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onBrowseClick={handleBrowseClick}
                    onFileInputChange={handleFileInputChange}
                    onRemovePhoto={() => {
                        setSelectedPhoto(null);
                        setPhotoPreview(null);
                    }}
                    onUploadPhoto={handleUploadPhoto}
                    isUploading={uploadingPhoto}
                />
            </div>
        </PageLayout>
    );
};

export default SettingsPage;
