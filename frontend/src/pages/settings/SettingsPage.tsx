import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageLayout from '../../components/PageLayout';
import Footer from "../../components/Footer.tsx";

interface SettingsPageProps {}

const SettingsPage: React.FC<SettingsPageProps> = () => {
    const { i18n } = useTranslation();

    // State для настроек
    const [activeTab, setActiveTab] = useState<'general' | 'account' | 'theme'>('general');
    const [theme, setTheme] = useState('dark');
    const [background, setBackground] = useState('default');
    const [fontSize, setFontSize] = useState('24');
    const [timeFormat, setTimeFormat] = useState('12h');
    const [language, setLanguage] = useState(i18n.language);
    const [notifications, setNotifications] = useState(true);

    // State для модальных окон
    const [showAccountModal, setShowAccountModal] = useState(false);
    const [showPhotoModal, setShowPhotoModal] = useState(false);

    // State для форм
    const [profileData, setProfileData] = useState({
        name: 'Name',
        newName: '',
        password: '********',
        newPassword: '',
        email: 'email@gmail.com',
        newEmail: ''
    });

    const handleLanguageChange = (newLang: string) => {
        setLanguage(newLang);
        i18n.changeLanguage(newLang);
    };

    return (
        <PageLayout>
            <div className="min-h-screen text-white">
                {/* Header */}
                <div className="p-8">
                    <h1 className="text-[36pt] font-[IBMPlexMono-Regular] text-center mb-8">Settings</h1>
                </div>

                {/* Main Content */}
                <div className="flex max-w-7xl mx-auto px-8 gap-8">
                    {/* Sidebar */}
                    <div className="w-64 flex-shrink-0">
                        <div className="bg-[#2a3f5f]/30 backdrop-blur-sm rounded-lg border border-[#4e6b8c]/30">
                            <div className="p-4">
                                <h2 className="text-[24pt] font-[IBMPlexMono-Regular] mb-4">Settings</h2>
                                <nav className="space-y-2">
                                    <button
                                        onClick={() => setActiveTab('general')}
                                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                                            activeTab === 'general'
                                                ? 'bg-[#87d7de]/20 text-[#87d7de] border-l-4 border-[#87d7de]'
                                                : 'text-[#FFFFFF]/70 hover:bg-[#4e6b8c]/20'
                                        }`}
                                    >
                                        General
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('account')}
                                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                                            activeTab === 'account'
                                                ? 'bg-[#87d7de]/20 text-[#87d7de] border-l-4 border-[#87d7de]'
                                                : 'text-[#FFFFFF]/70 hover:bg-[#4e6b8c]/20'
                                        }`}
                                    >
                                        Account
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('theme')}
                                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                                            activeTab === 'theme'
                                                ? 'bg-[#87d7de]/20 text-[#87d7de] border-l-4 border-[#87d7de]'
                                                : 'text-[#FFFFFF]/70 hover:bg-[#4e6b8c]/20'
                                        }`}
                                    >
                                        Theme
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1">
                        <div className="bg-[#2a3f5f]/30 backdrop-blur-sm rounded-lg border border-[#4e6b8c]/30">
                            <div className="border-b border-[#4e6b8c]/30 p-4">
                                <h3 className="text-[20pt] font-[IBMPlexMono-Regular]">Settings</h3>
                            </div>

                            <div className="p-6">
                                {/* General Tab */}
                                {activeTab === 'general' && (
                                    <div className="space-y-6">
                                        {/* Notifications */}
                                        <div className="flex justify-between items-center py-4 border-b border-[#4e6b8c]/20">
                                            <span className="text-[16pt] font-[Ubuntu-Regular]">Notifications/email</span>
                                            <button
                                                onClick={() => setNotifications(!notifications)}
                                                className={`relative w-12 h-6 rounded-full transition-colors ${
                                                    notifications ? 'bg-[#87d7de]' : 'bg-[#4e6b8c]'
                                                }`}
                                            >
                                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                                    notifications ? 'translate-x-7' : 'translate-x-1'
                                                }`} />
                                            </button>
                                        </div>

                                        {/* Time Format */}
                                        <div className="flex justify-between items-center py-4 border-b border-[#4e6b8c]/20">
                                            <span className="text-[16pt] font-[Ubuntu-Regular]">Time format</span>
                                            <select
                                                value={timeFormat}
                                                onChange={(e) => setTimeFormat(e.target.value)}
                                                className="bg-[#4e6b8c]/50 border border-[#4e6b8c] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#87d7de]"
                                            >
                                                <option value="12h">12h</option>
                                                <option value="24h">24h</option>
                                            </select>
                                        </div>

                                        {/* Language */}
                                        <div className="flex justify-between items-center py-4">
                                            <span className="text-[16pt] font-[Ubuntu-Regular]">Language</span>
                                            <select
                                                value={language}
                                                onChange={(e) => handleLanguageChange(e.target.value)}
                                                className="bg-[#4e6b8c]/50 border border-[#4e6b8c] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#87d7de]"
                                            >
                                                <option value="en">English 🇬🇧</option>
                                                <option value="uk">Ukraine 🇺🇦</option>
                                            </select>
                                        </div>
                                    </div>
                                )}

                                {/* Account Tab */}
                                {activeTab === 'account' && (
                                    <div className="space-y-6">
                                        {/* Profile Picture */}
                                        <div className="flex justify-between items-center py-4 border-b border-[#4e6b8c]/20">
                                            <span className="text-[16pt] font-[Ubuntu-Regular]">Profile Picture</span>
                                            <button
                                                onClick={() => setShowPhotoModal(true)}
                                                className="w-12 h-12 bg-[#4e6b8c]/50 rounded-full border border-[#4e6b8c] flex items-center justify-center hover:bg-[#87d7de]/20 transition-colors"
                                            >
                                                👤
                                            </button>
                                        </div>

                                        {/* Name */}
                                        <div className="flex justify-between items-center py-4 border-b border-[#4e6b8c]/20">
                                            <span className="text-[16pt] font-[Ubuntu-Regular]">Name</span>
                                            <input
                                                type="text"
                                                value={profileData.name}
                                                readOnly
                                                className="bg-[#4e6b8c]/50 border border-[#4e6b8c] rounded-lg px-4 py-2 text-white"
                                            />
                                        </div>

                                        {/* New Name */}
                                        <div className="flex justify-between items-center py-4 border-b border-[#4e6b8c]/20">
                                            <span className="text-[16pt] font-[Ubuntu-Regular]">New name</span>
                                            <input
                                                type="text"
                                                value={profileData.newName}
                                                onChange={(e) => setProfileData({...profileData, newName: e.target.value})}
                                                placeholder="Enter new name"
                                                className="bg-[#4e6b8c]/50 border border-[#4e6b8c] rounded-lg px-4 py-2 text-white placeholder-[#FFFFFF]/50 focus:outline-none focus:border-[#87d7de]"
                                            />
                                        </div>

                                        {/* Password */}
                                        <div className="flex justify-between items-center py-4 border-b border-[#4e6b8c]/20">
                                            <span className="text-[16pt] font-[Ubuntu-Regular]">Password</span>
                                            <input
                                                type="password"
                                                value={profileData.password}
                                                readOnly
                                                className="bg-[#4e6b8c]/50 border border-[#4e6b8c] rounded-lg px-4 py-2 text-white"
                                            />
                                        </div>

                                        {/* New Password */}
                                        <div className="flex justify-between items-center py-4 border-b border-[#4e6b8c]/20">
                                            <span className="text-[16pt] font-[Ubuntu-Regular]">New password</span>
                                            <input
                                                type="password"
                                                value={profileData.newPassword}
                                                onChange={(e) => setProfileData({...profileData, newPassword: e.target.value})}
                                                placeholder="Enter new password"
                                                className="bg-[#4e6b8c]/50 border border-[#4e6b8c] rounded-lg px-4 py-2 text-white placeholder-[#FFFFFF]/50 focus:outline-none focus:border-[#87d7de]"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div className="flex justify-between items-center py-4 border-b border-[#4e6b8c]/20">
                                            <span className="text-[16pt] font-[Ubuntu-Regular]">Email</span>
                                            <input
                                                type="email"
                                                value={profileData.email}
                                                readOnly
                                                className="bg-[#4e6b8c]/50 border border-[#4e6b8c] rounded-lg px-4 py-2 text-white"
                                            />
                                        </div>

                                        {/* Change Email */}
                                        <div className="flex justify-between items-center py-4">
                                            <span className="text-[16pt] font-[Ubuntu-Regular]">Change email</span>
                                            <input
                                                type="email"
                                                value={profileData.newEmail}
                                                onChange={(e) => setProfileData({...profileData, newEmail: e.target.value})}
                                                placeholder="Enter new email"
                                                className="bg-[#4e6b8c]/50 border border-[#4e6b8c] rounded-lg px-4 py-2 text-white placeholder-[#FFFFFF]/50 focus:outline-none focus:border-[#87d7de]"
                                            />
                                        </div>

                                        <button
                                            onClick={() => setShowAccountModal(true)}
                                            className="w-full bg-[#87d7de] text-[#0c0c18] py-3 px-6 rounded-lg font-[Ubuntu-Regular] text-[12pt] font-medium hover:bg-[#87d7de]/80 transition-colors"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                )}

                                {/* Theme Tab */}
                                {activeTab === 'theme' && (
                                    <div className="space-y-6">
                                        {/* Theme */}
                                        <div className="flex justify-between items-center py-4 border-b border-[#4e6b8c]/20">
                                            <span className="text-[16pt] font-[Ubuntu-Regular]">Theme</span>
                                            <select
                                                value={theme}
                                                onChange={(e) => setTheme(e.target.value)}
                                                className="bg-[#4e6b8c]/50 border border-[#4e6b8c] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#87d7de]"
                                            >
                                                <option value="dark">dark</option>
                                                <option value="light">light</option>
                                                <option value="default">default</option>
                                            </select>
                                        </div>

                                        {/* Background */}
                                        <div className="flex justify-between items-center py-4 border-b border-[#4e6b8c]/20">
                                            <span className="text-[16pt] font-[Ubuntu-Regular]">Background</span>
                                            <select
                                                value={background}
                                                onChange={(e) => setBackground(e.target.value)}
                                                className="bg-[#4e6b8c]/50 border border-[#4e6b8c] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#87d7de]"
                                            >
                                                <option value="default">default</option>
                                                <option value="custom">custom</option>
                                            </select>
                                        </div>

                                        {/* Font Size */}
                                        <div className="flex justify-between items-center py-4">
                                            <span className="text-[16pt] font-[Ubuntu-Regular]">Font</span>
                                            <select
                                                value={fontSize}
                                                onChange={(e) => setFontSize(e.target.value)}
                                                className="bg-[#4e6b8c]/50 border border-[#4e6b8c] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#87d7de]"
                                            >
                                                <option value="12">12</option>
                                                <option value="16">16</option>
                                                <option value="20">20</option>
                                                <option value="24">24</option>
                                            </select>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Account Confirmation Modal */}
                {showAccountModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-[#2a3f5f] border border-[#4e6b8c] rounded-lg p-6 max-w-md w-full mx-4">
                            <h3 className="text-[18pt] font-[Ubuntu-Regular] mb-4 text-center">
                                Change name/email/password?
                            </h3>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setShowAccountModal(false)}
                                    className="flex-1 bg-[#4e6b8c] text-white py-3 px-6 rounded-lg font-[Ubuntu-Regular] hover:bg-[#4e6b8c]/80 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        // Handle save logic here
                                        setShowAccountModal(false);
                                    }}
                                    className="flex-1 bg-[#6b5b95] text-white py-3 px-6 rounded-lg font-[Ubuntu-Regular] hover:bg-[#6b5b95]/80 transition-colors"
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Photo Upload Modal */}
                {showPhotoModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-[#2a3f5f] border border-[#87d7de] rounded-lg p-6 max-w-md w-full mx-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-[18pt] font-[Ubuntu-Regular] text-[#87d7de]">Photo</h3>
                                <button
                                    onClick={() => setShowPhotoModal(false)}
                                    className="text-[#87d7de] hover:text-white"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="mb-4">
                                <h4 className="text-[16pt] font-[Ubuntu-Regular] mb-2">Choose photo</h4>
                                <div
                                    className="border-2 border-dashed border-[#6b5b95] rounded-lg p-8 text-center cursor-pointer hover:border-[#87d7de] transition-colors"
                                    onClick={() => {
                                        // Handle file upload
                                    }}
                                >
                                    <div className="bg-[#6b5b95] text-white py-4 px-6 rounded-lg inline-block font-[Ubuntu-Regular]">
                                        Browse
                                    </div>
                                </div>
                            </div>
                            <div className="text-center text-[#87d7de] text-sm">
                                868 x 630
                            </div>
                        </div>
                    </div>
                )}

                <Footer />
            </div>
        </PageLayout>
    );
};

export default SettingsPage;