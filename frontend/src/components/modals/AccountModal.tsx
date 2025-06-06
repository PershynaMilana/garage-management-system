import React from 'react';
import { useTranslation } from 'react-i18next';

interface AccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading: boolean;
}

const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose, onConfirm, isLoading }) => {
    const { t } = useTranslation();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#2a3f5f] rounded-lg shadow-xl p-6 w-full max-w-sm border border-[#4e6b8c]/30">
                <h3 className="text-xl font-bold text-white mb-4 text-center">{t('settings.confirmChanges')}</h3>
                <p className="text-gray-300 text-center mb-6">
                    {t('settings.confirmChangesMessage')}
                </p>
                <div className="flex justify-around gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2 px-4 rounded-lg bg-[#4e6b8c]/50 text-white hover:bg-[#4e6b8c]/70 transition-colors"
                        disabled={isLoading}
                    >
                        {t('common.cancel')}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-2 px-4 rounded-lg bg-[#87d7de] text-gray-900 hover:bg-[#87d7de]/80 transition-colors"
                        disabled={isLoading}
                    >
                        {isLoading ? t('common.saving') : t('common.confirm')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountModal;
