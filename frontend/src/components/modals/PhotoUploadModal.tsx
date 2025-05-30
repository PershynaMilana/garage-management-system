import React from 'react';

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
    isUploading?: boolean;
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
                                                               isUploading = false
                                                           }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-[#2a3f5f] border border-[#87d7de] rounded-lg p-4 md:p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[16pt] md:text-[18pt] font-[Ubuntu-Regular] text-[#87d7de]">Photo</h3>
                    <button
                        onClick={onClose}
                        className="text-[#87d7de] hover:text-white text-xl"
                    >
                        ✕
                    </button>
                </div>

                <div className="mb-4">
                    <h4 className="text-[14pt] md:text-[16pt] font-[Ubuntu-Regular] mb-4">Choose photo</h4>

                    {/* Drag and Drop Area */}
                    <div
                        className={`border-2 border-dashed rounded-lg p-6 md:p-8 text-center cursor-pointer transition-all ${
                            isDragOver
                                ? 'border-[#87d7de] bg-[#87d7de]/10'
                                : 'border-[#6b5b95] hover:border-[#87d7de]'
                        }`}
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                        onClick={onBrowseClick}
                    >
                        {photoPreview ? (
                            <div className="space-y-4">
                                <img
                                    src={photoPreview}
                                    alt="Preview"
                                    className="w-24 h-24 md:w-32 md:h-32 object-cover mx-auto rounded-lg border border-[#87d7de]"
                                />
                                <p className="text-[#87d7de] text-xs md:text-sm break-all">
                                    {selectedPhoto?.name}
                                </p>
                                <div className="bg-[#6b5b95] text-white py-2 px-4 rounded-lg inline-block font-[Ubuntu-Regular] text-xs md:text-sm">
                                    📷 Change Photo
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="text-3xl md:text-4xl mb-2">📷</div>
                                <div className="bg-[#6b5b95] text-white py-3 md:py-4 px-4 md:px-6 rounded-lg inline-block font-[Ubuntu-Regular] text-sm md:text-base">
                                    Browse
                                </div>
                                <p className="text-[#FFFFFF]/70 text-xs md:text-sm mt-2">
                                    or drag and drop a photo here
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Hidden file input */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={onFileInputChange}
                        className="hidden"
                    />
                </div>

                <div className="text-center text-[#87d7de] text-xs md:text-sm mb-4">
                    Recommended size: 868 x 630
                </div>

                {/* Action Buttons */}
                {selectedPhoto && (
                    <div className="flex gap-4">
                        <button
                            onClick={onRemovePhoto}
                            disabled={isUploading}
                            className="flex-1 bg-[#4e6b8c] text-white py-2 px-3 md:px-4 rounded-lg font-[Ubuntu-Regular] hover:bg-[#4e6b8c]/80 transition-colors text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Remove
                        </button>
                        <button
                            onClick={onUploadPhoto}
                            disabled={isUploading}
                            className="flex-1 bg-[#87d7de] text-[#0c0c18] py-2 px-3 md:px-4 rounded-lg font-[Ubuntu-Regular] hover:bg-[#87d7de]/80 transition-colors text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isUploading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PhotoUploadModal;