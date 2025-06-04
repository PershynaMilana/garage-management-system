import React from "react";
import { useTranslation } from 'react-i18next';
import { User } from "../../types/user.ts";

interface GarageGridProps {
  users: User[];
  onGarageClick: (garageNumber: string, user?: User) => void;
}

const GarageGrid: React.FC<GarageGridProps> = ({ users, onGarageClick }) => {
  const { t } = useTranslation();

  // Создаем массив гаражей от 001 до 050
  const garageSlots = Array.from({ length: 50 }, (_, index) => {
    const garageNumber = String(index + 1).padStart(3, "0");
    const user = users.find((u) => u.garageNumber === garageNumber);
    return { garageNumber, user };
  });

  const getGarageStatus = (user?: User) => {
    if (!user) return "free";
    if (user.personalDebt > 0) return "debt";
    return "occupied";
  };

  const getGarageColor = (status: string) => {
    switch (status) {
      case "free":
        return "bg-emerald-500/70 hover:bg-emerald-400/80 border-emerald-400/60";
      case "occupied":
        return "bg-blue-500/70 hover:bg-blue-400/80 border-blue-400/60";
      case "debt":
        return "bg-red-500/70 hover:bg-red-400/80 border-red-400/60";
      default:
        return "bg-gray-500/70 hover:bg-gray-400/80 border-gray-400/60";
    }
  };

  return (
      <div className="bg-[#2a3f5f]/30 backdrop-blur-sm rounded-lg border border-[#4e6b8c]/30 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            {t('garageManagement.grid.title')}
          </h2>

          {/* Легенда */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-500/70 rounded border border-emerald-400/60"></div>
              <span className="text-gray-300 text-sm">{t('garageManagement.grid.legend.free')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500/70 rounded border border-blue-400/60"></div>
              <span className="text-gray-300 text-sm">{t('garageManagement.grid.legend.occupied')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500/70 rounded border border-red-400/60"></div>
              <span className="text-gray-300 text-sm">{t('garageManagement.grid.legend.debt')}</span>
            </div>
          </div>
        </div>

        {/* Сетка гаражей */}
        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-15 gap-2">
          {garageSlots.map(({ garageNumber, user }) => {
            const status = getGarageStatus(user);
            return (
                <button
                    key={garageNumber}
                    onClick={() => onGarageClick(garageNumber, user)}
                    className={`
                relative w-12 h-12 rounded-lg border-2 transition-all duration-200 
                flex flex-col items-center justify-center text-white text-xs font-medium
                hover:scale-105 hover:shadow-lg
                ${getGarageColor(status)}
              `}
                    title={`${t('common.garage')} ${garageNumber}${
                        user ? ` - ${user.name}` : ` - ${t('garageManagement.grid.legend.free')}`
                    }`}
                >
                  <span className="text-[10px] leading-tight">{garageNumber}</span>
                  {user && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                      </div>
                  )}
                </button>
            );
          })}
        </div>

        {/* Статистика */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-lg p-4">
            <div className="text-emerald-400 text-sm font-medium">
              {t('garageManagement.grid.stats.free')}
            </div>
            <div className="text-white text-2xl font-bold">
              {garageSlots.filter(({ user }) => !user).length}
            </div>
          </div>
          <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
            <div className="text-blue-400 text-sm font-medium">
              {t('garageManagement.grid.stats.occupied')}
            </div>
            <div className="text-white text-2xl font-bold">
              {
                garageSlots.filter(({ user }) => user && user.personalDebt === 0)
                    .length
              }
            </div>
          </div>
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
            <div className="text-red-400 text-sm font-medium">
              {t('garageManagement.grid.stats.withDebts')}
            </div>
            <div className="text-white text-2xl font-bold">
              {
                garageSlots.filter(({ user }) => user && user.personalDebt > 0)
                    .length
              }
            </div>
          </div>
        </div>
      </div>
  );
};

export default GarageGrid;