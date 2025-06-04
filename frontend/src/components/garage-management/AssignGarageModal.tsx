import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faWarehouse, faUser, faCheck } from '@fortawesome/free-solid-svg-icons';
import { User } from "../../types/user.ts";

interface AssignGarageModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
  selectedUser?: User;
  selectedGarage?: string;
  onAssign: (userId: number, garageNumber: string) => void;
}

const AssignGarageModal: React.FC<AssignGarageModalProps> = ({
                                                               isOpen,
                                                               onClose,
                                                               users,
                                                               selectedUser,
                                                               selectedGarage,
                                                               onAssign
                                                             }) => {
  const { t } = useTranslation();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(selectedUser?.id || null);
  const [selectedGarageNumber, setSelectedGarageNumber] = useState<string>(selectedGarage || '');

  // Сбрасываем состояние при открытии модального окна
  React.useEffect(() => {
    if (isOpen) {
      setSelectedUserId(selectedUser?.id || null);
      setSelectedGarageNumber(selectedGarage || '');
    }
  }, [isOpen, selectedUser, selectedGarage]);

  if (!isOpen) return null;

  const usersWithoutGarage = users.filter(user => user.garageNumber === '-');
  const occupiedGarages = users.filter(user => user.garageNumber !== '-').map(user => user.garageNumber);

  // Создаем список свободных гаражей
  const freeGarages = Array.from({ length: 50 }, (_, index) => {
    const garageNumber = String(index + 1).padStart(3, '0');
    return garageNumber;
  }).filter(garage => !occupiedGarages.includes(garage));

  const handleAssign = () => {
    if (selectedUserId && selectedGarageNumber) {
      onAssign(selectedUserId, selectedGarageNumber);
      // Сбрасываем состояние после назначения
      setSelectedUserId(null);
      setSelectedGarageNumber('');
      onClose();
    }
  };

  return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-[#2a3f5f] rounded-lg border border-[#4e6b8c]/30 w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#4e6b8c]/30">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-[#22d3ee]/20 rounded-lg">
                <FontAwesomeIcon icon={faWarehouse} className="text-[#22d3ee]" />
              </div>
              <h2 className="text-xl font-semibold text-white">
                {t('garageManagement.assignModal.title')}
              </h2>
            </div>
            <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faTimes} className="text-xl" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* User selection */}
            <div>
              <label className="block text-white font-medium mb-3">
                {t('garageManagement.assignModal.selectUser')}
              </label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {usersWithoutGarage.map(user => (
                    <button
                        key={user.id}
                        onClick={() => setSelectedUserId(user.id)}
                        className={`w-full flex items-center gap-4 p-3 rounded-lg border transition-colors ${
                            selectedUserId === user.id
                                ? 'bg-blue-500/20 border-blue-500/40'
                                : 'bg-[#1a2332]/50 border-[#4e6b8c]/20 hover:border-[#4e6b8c]/40'
                        }`}
                    >
                      <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 text-left">
                        <div className="text-white font-medium">{user.name}</div>
                        <div className="text-gray-400 text-sm">{user.email}</div>
                      </div>
                      {selectedUserId === user.id && (
                          <FontAwesomeIcon icon={faCheck} className="text-blue-400" />
                      )}
                    </button>
                ))}
              </div>
            </div>

            {/* Garage selection */}
            <div>
              <label className="block text-white font-medium mb-3">
                {t('garageManagement.assignModal.selectGarage')}
              </label>
              <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 max-h-48 overflow-y-auto p-2">
                {freeGarages.map(garageNumber => (
                    <button
                        key={garageNumber}
                        onClick={() => setSelectedGarageNumber(garageNumber)}
                        className={`w-12 h-12 rounded-lg border-2 transition-all duration-200 flex items-center justify-center text-white text-xs font-medium ${
                            selectedGarageNumber === garageNumber
                                ? 'bg-blue-500/80 border-blue-400/80 scale-105'
                                : 'bg-emerald-500/70 border-emerald-400/60 hover:bg-emerald-400/80'
                        }`}
                    >
                      {garageNumber}
                    </button>
                ))}
              </div>
            </div>

            {/* Selected info */}
            {selectedUserId && selectedGarageNumber && (
                <div className="bg-[#1a2332]/50 rounded-lg p-4 border border-[#4e6b8c]/20">
                  <div className="text-gray-300 text-sm mb-2">{t('garageManagement.assignModal.assignment')}:</div>
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faUser} className="text-blue-400" />
                    <span className="text-white">
                  {usersWithoutGarage.find(u => u.id === selectedUserId)?.name}
                </span>
                    <span className="text-gray-400">→</span>
                    <FontAwesomeIcon icon={faWarehouse} className="text-emerald-400" />
                    <span className="text-white">{t('common.garage')} №{selectedGarageNumber}</span>
                  </div>
                </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                {t('garageManagement.assignModal.cancel')}
              </button>
              <button
                  onClick={handleAssign}
                  disabled={!selectedUserId || !selectedGarageNumber}
                  className="flex-1 px-4 py-3 bg-emerald-600/80 hover:bg-emerald-700/90 disabled:bg-gray-500 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                {t('garageManagement.assignModal.assign')}
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default AssignGarageModal;