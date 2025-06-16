import React from "react";
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faUser,
  faEnvelope,
  faPhone,
  faCalendar,
  faDollarSign,
  faWarehouse,
  faUserTimes,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { User } from "../../types/user.ts";

interface GarageDetailsModalProps {
  garageNumber: string;
  user?: User;
  onClose: () => void;
  onAssignUser: (garageNumber: string) => void;
  onRemoveUser: (userId: number) => void;
  onEditUser: (user: User) => void;
}

const GarageDetailsModal: React.FC<GarageDetailsModalProps> = ({
                                                                 garageNumber,
                                                                 user,
                                                                 onClose,
                                                                 onAssignUser,
                                                                 onRemoveUser,
                                                                 onEditUser,
                                                               }) => {
  const { t, i18n } = useTranslation();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("uk-UA", {
      style: "currency",
      currency: "UAH",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(i18n.language === 'uk' ? 'uk-UA' : 'en-US');
  };

  return (
      <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
      >
        <div
            className="bg-[#2a3f5f] rounded-lg border border-[#4e6b8c]/30 w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#4e6b8c]/30">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-[#22d3ee]/20 rounded-lg">
                <FontAwesomeIcon icon={faWarehouse} className="text-[#22d3ee]" />
              </div>
              <h2 className="text-xl font-semibold text-white">
                {t('common.garage')} №{garageNumber}
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
          <div className="p-6">
            {user ? (
                /* Occupied garage */
                <div className="space-y-6">
                  {/* User avatar and basic info */}
                  <div className="flex items-center gap-4">
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-[#4e6b8c]/30"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {user.name}
                      </h3>
                      <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.role === "Admin"
                                  ? "bg-purple-500/20 text-purple-400"
                                  : user.role === "Manager"
                                      ? "bg-blue-500/20 text-blue-400"
                                      : "bg-gray-500/20 text-gray-400"
                          }`}
                      >
                    {t(`userManagement.roles.${user.role.toLowerCase().replace(' ', '')}`)}
                  </span>
                    </div>
                  </div>

                  {/* User details */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-300">
                      <FontAwesomeIcon
                          icon={faEnvelope}
                          className="text-[#22d3ee] w-4"
                      />
                      <span>{user.email}</span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-300">
                      <FontAwesomeIcon
                          icon={faPhone}
                          className="text-[#22d3ee] w-4"
                      />
                      <span>{user.phone}</span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-300">
                      <FontAwesomeIcon
                          icon={faCalendar}
                          className="text-[#22d3ee] w-4"
                      />
                      <span>{t('garageManagement.modal.registration')}: {formatDate(user.registrationDate)}</span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-300">
                      <FontAwesomeIcon
                          icon={faCalendar}
                          className="text-[#22d3ee] w-4"
                      />
                      <span>
                    {t('garageManagement.modal.lastActivity')}: {formatDate(user.lastActivity || "")}
                  </span>
                    </div>

                    {/* Debt information */}
                    <div
                        className={`p-4 rounded-lg border ${
                            user.personalDebt > 0
                                ? "bg-red-500/10 border-red-500/30"
                                : "bg-green-500/10 border-green-500/30"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <FontAwesomeIcon
                            icon={faDollarSign}
                            className={
                              user.personalDebt > 0
                                  ? "text-red-400"
                                  : "text-green-400"
                            }
                        />
                        <div>
                          <div className="text-sm text-gray-400">
                            {t('garageManagement.modal.debt')}
                          </div>
                          <div
                              className={`text-lg font-semibold ${
                                  user.personalDebt > 0
                                      ? "text-red-400"
                                      : "text-green-400"
                              }`}
                          >
                            {formatCurrency(user.personalDebt)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col gap-3">
                    <button
                        onClick={() => onEditUser(user)}
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                      {t('garageManagement.modal.editData')}
                    </button>

                    <button
                        onClick={() => onRemoveUser(user.id)}
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                      <FontAwesomeIcon icon={faUserTimes} />
                      {t('garageManagement.modal.removeFromGarage')}
                    </button>
                  </div>
                </div>
            ) : (
                /* Free garage */
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                    <FontAwesomeIcon
                        icon={faWarehouse}
                        className="text-emerald-400 text-2xl"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {t('garageManagement.modal.garageFree')}
                    </h3>
                    <p className="text-gray-400">
                      {t('garageManagement.modal.garageFreeDescription')}
                    </p>
                  </div>

                  <button
                      onClick={() => onAssignUser(garageNumber)}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600/80 hover:bg-emerald-700/90 text-white rounded-lg transition-colors mx-auto"
                  >
                    <FontAwesomeIcon icon={faUser} />
                    {t('garageManagement.modal.assignUser')}
                  </button>
                </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default GarageDetailsModal;