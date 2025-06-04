import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faPlus, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { User } from "../../types/user.ts";

interface UsersWithoutGarageProps {
  users: User[];
  onAssignGarage: (user: User) => void;
  onRegisterNewUser: () => void;
}

const UsersWithoutGarage: React.FC<UsersWithoutGarageProps> = ({
                                                                 users,
                                                                 onAssignGarage,
                                                                 onRegisterNewUser
                                                               }) => {
  const { t } = useTranslation();
  const usersWithoutGarage = users.filter(user => user.garageNumber === '-');

  return (
      <div className="bg-[#2a3f5f]/30 backdrop-blur-sm rounded-lg border border-[#4e6b8c]/30 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            {t('garageManagement.usersWithoutGarage.title')}
          </h2>
          <button
              onClick={onRegisterNewUser}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600/80 hover:bg-emerald-700/90 text-white rounded-lg transition-colors"
          >
            <FontAwesomeIcon icon={faUserPlus} />
            {t('garageManagement.usersWithoutGarage.registerNew')}
          </button>
        </div>

        {usersWithoutGarage.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faUser} className="text-gray-400 text-xl" />
              </div>
              <p className="text-gray-400">
                {t('garageManagement.usersWithoutGarage.allUsersHaveGarages')}
              </p>
            </div>
        ) : (
            <div className="space-y-4">
              {usersWithoutGarage.map(user => (
                  <div
                      key={user.id}
                      className="flex items-center justify-between p-4 bg-[#1a2332]/50 rounded-lg border border-[#4e6b8c]/20 hover:border-[#4e6b8c]/40 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-[#4e6b8c]/30"
                      />
                      <div>
                        <h3 className="text-white font-medium">{user.name}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1 text-sm text-gray-400">
                            <FontAwesomeIcon icon={faEnvelope} className="text-xs" />
                            <span>{user.email}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-400">
                            <FontAwesomeIcon icon={faPhone} className="text-xs" />
                            <span>{user.phone}</span>
                          </div>
                        </div>
                        <span className={`inline-block px-2 py-1 mt-2 rounded-full text-xs font-medium ${
                            user.role === 'Admin'
                                ? 'bg-purple-500/20 text-purple-400'
                                : user.role === 'Manager'
                                    ? 'bg-blue-500/20 text-blue-400'
                                    : 'bg-gray-500/20 text-gray-400'
                        }`}>
                    {t(`userManagement.roles.${user.role.toLowerCase().replace(' ', '')}`)}
                  </span>
                      </div>
                    </div>

                    <button
                        onClick={() => onAssignGarage(user)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                      {t('garageManagement.usersWithoutGarage.assignGarage')}
                    </button>
                  </div>
              ))}
            </div>
        )}
      </div>
  );
};

export default UsersWithoutGarage;