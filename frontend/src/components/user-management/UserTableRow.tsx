import React from 'react';
import { Mail, MapPin, CreditCard } from 'lucide-react';
import { User } from '../../types/user';

interface UserTableRowProps {
  user: User;
  onClick: () => void;
  onRoleChange: (userId: number, role: User['role']) => void;
}

const UserTableRow: React.FC<UserTableRowProps> = ({
  user,
  onClick,
  onRoleChange
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Manager':
        return 'bg-[#87d7de]/20 text-[#87d7de] border-[#87d7de]/30';
      case 'Admin':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'Default member': // Додано для повноти
      default:
        return 'bg-[#4e6b8c]/20 text-white border-[#4e6b8c]/30';
    }
  };

  return (
    <>
      {/* Desktop View */}
      <div
        className="hidden md:grid grid-cols-[1.5fr_2fr_1fr_1fr_1fr] gap-4 p-4 border-b border-[#4e6b8c]/20 hover:bg-[#4e6b8c]/20 cursor-pointer transition-colors"
        onClick={onClick}
      >
        <div className="flex items-center gap-3">
          <img
            src={user.photoUrl || user.avatar || 'https://placehold.co/40x40/4e6b8c/ffffff?text=U'} // Заглушка
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-white font-medium font-[Ubuntu-Regular]">{user.name}</span>
        </div>
        
        <div className="flex items-center text-white/70 font-[Ubuntu-Regular]">{user.email}</div>
        
        {/* ДОДАНО: Колонка для номера гаража в Desktop View */}
        <div className="flex items-center text-white/70 font-[Ubuntu-Regular]">{user.garageNumber || 'N/A'}</div>
        
        <div className="flex items-center">
          <select
            value={user.role}
            onChange={(e) => onRoleChange(user.id, e.target.value as User['role'])}
            onClick={(e) => e.stopPropagation()}
            className={`bg-[#4e6b8c]/50 border rounded-lg px-3 py-1 text-sm font-[Ubuntu-Regular] focus:outline-none focus:border-[#87d7de] ${getRoleBadgeColor(user.role)}`}
          >
            <option value="Default member">Default member</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        
        <div className="flex items-center text-white font-[Ubuntu-Regular]">
          {formatCurrency(user.personalDebt)}
        </div>
      </div>

      {/* Mobile View */}
      <div
        className="md:hidden p-4 border-b border-[#4e6b8c]/20 hover:bg-[#4e6b8c]/20 cursor-pointer transition-colors"
        onClick={onClick}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <img
              src={user.photoUrl || user.avatar || 'https://placehold.co/48x48/4e6b8c/ffffff?text=U'} // Заглушка
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="text-white font-medium font-[Ubuntu-Regular]">{user.name}</h3>
              <div className={`inline-block px-2 py-1 rounded text-xs font-[Ubuntu-Regular] border ${getRoleBadgeColor(user.role)} mt-1`}>
                {user.role}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-[#87d7de]" />
            <span className="text-white/70 font-[Ubuntu-Regular]">{user.email}</span>
          </div>
          
          {/* ДОДАНО: Колонка для номера гаража в Mobile View */}
          {user.garageNumber && ( // Рендеримо, якщо є номер гаража
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-[#87d7de]" />
              <span className="text-white/70 font-[Ubuntu-Regular]">Гараж: {user.garageNumber}</span> {/* Змінено на українську мову */}
            </div>
          )}
          
          <div className="flex items-center gap-2 text-sm">
            <CreditCard className="w-4 h-4 text-[#87d7de]" />
            <span className="text-white font-[Ubuntu-Regular]">{formatCurrency(user.personalDebt)}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserTableRow;
