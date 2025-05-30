import React from 'react';

interface AccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading?: boolean;
}

const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose, onConfirm, isLoading = false }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-[#2a3f5f] border border-[#4e6b8c] rounded-lg p-6 max-w-md w-full">
                <h3 className="text-[16pt] md:text-[18pt] font-[Ubuntu-Regular] mb-4 text-center">
                    Change name/email/password?
                </h3>
                <div className="flex gap-4">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 bg-[#4e6b8c] text-white py-3 px-4 md:px-6 rounded-lg font-[Ubuntu-Regular] hover:bg-[#4e6b8c]/80 transition-colors text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="flex-1 bg-[#4e6b8c] text-white py-3 px-4 md:px-6 rounded-lg font-[Ubuntu-Regular] hover:bg-[#4e6b8c]/80 transition-colors text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Saving...' : 'OK'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountModal;