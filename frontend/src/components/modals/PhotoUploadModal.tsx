import React from 'react';
import { useTranslation } from 'react-i18next';

interface PhotoUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedPhoto: File | null;
    photoPreview: string | null;
    isDragOver: boolean;
    fileInputRef: React.RefObject<HTMLInputElement | null>; 
    onDragOver: (e: React.DragEvent) => void;
    onDragLeave: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent) => void;
    onBrowseClick: () => void;
    onFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemovePhoto: () => void;
    onUploadPhoto: () => void;
    isUploading: boolean;
}

const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({
    isOpen,
    onClose,
    selectedPhoto,
    photoPreview,
    isDragOver,
    fileInputRef,
    onDragOver,
    onDragLeave,
    onDrop,
    onBrowseClick,
    onFileInputChange,
    onRemovePhoto,
    onUploadPhoto,
    isUploading
}) => {
    const { t } = useTranslation();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#2a3f5f] rounded-lg shadow-xl p-6 w-full max-w-md border border-[#4e6b8c]/30">
                <h3 className="text-xl font-bold text-white mb-4 text-center">{t('settings.uploadPhoto')}</h3>

                <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors mb-4 ${
                        isDragOver ? 'border-[#87d7de] bg-[#4e6b8c]/20' : 'border-[#4e6b8c] bg-[#4e6b8c]/10'
                    }`}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                >
                    {photoPreview ? (
                        <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-[#87d7de]">
                            <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                            <button
                                onClick={onRemovePhoto}
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center -mt-2 -mr-2 text-sm"
                            >
                                X
                            </button>
                        </div>
                    ) : (
                        <div className="mb-4 text-gray-400">
                            <p>{t('settings.dragAndDrop')}</p>
                            <p className="my-2">{t('common.or')}</p>
                        </div>
                    )}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={onFileInputChange}
                        className="hidden"
                        accept="image/*"
                    />
                    <button
                        onClick={onBrowseClick}
                        className="bg-[#87d7de] text-gray-900 py-2 px-4 rounded-lg hover:bg-[#87d7de]/80 transition-colors"
                        disabled={isUploading}
                    >
                        {t('settings.browseFiles')}
                    </button>
                </div>

                {selectedPhoto && (
                    <p className="text-gray-300 text-center mb-4">
                        {t('settings.selectedFile')}: {selectedPhoto.name}
                    </p>
                )}

                <div className="flex justify-around gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2 px-4 rounded-lg bg-[#4e6b8c]/50 text-white hover:bg-[#4e6b8c]/70 transition-colors"
                        disabled={isUploading}
                    >
                        {t('common.cancel')}
                    </button>
                    <button
                        onClick={onUploadPhoto}
                        className="flex-1 py-2 px-4 rounded-lg bg-[#87d7de] text-gray-900 hover:bg-[#87d7de]/80 transition-colors"
                        disabled={!selectedPhoto || isUploading}
                    >
                        {isUploading ? t('common.uploading') : t('settings.upload')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PhotoUploadModal;
