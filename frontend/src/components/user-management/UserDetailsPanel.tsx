import React, { useState, useEffect } from 'react'; 
import { X, Mail, Phone, Calendar, Activity, MapPin } from 'lucide-react';
import { User, UserRole } from '../../types/user'; 

interface UserDetailsPanelProps {
  user: User;
  onClose: () => void;
  onUpdateRole: (userId: number, newRole: UserRole) => Promise<void>;
}

const UserDetailsPanel: React.FC<UserDetailsPanelProps> = ({ user, onClose, onUpdateRole }) => {
  const [editingRole, setEditingRole] = useState<UserRole>(user.role);

  useEffect(() => {
    setEditingRole(user.role);
  }, [user.role]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      console.error("Invalid date string:", dateString, e);
      return 'Invalid Date';
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Manager':
        return 'bg-[#87d7de]/20 text-[#87d7de] border-[#87d7de]/30';
      case 'Admin':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'Default member':
      default:
        return 'bg-[#4e6b8c]/20 text-white border-[#4e6b8c]/30';
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSaveRole = async () => {
    await onUpdateRole(user.id, editingRole);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-[#2a3f5f]/90 backdrop-blur-sm rounded-lg border border-[#4e6b8c]/30 w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#4e6b8c]/30">
          <h2 className="text-[20pt] font-[Ubuntu-Regular] text-white">User Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#4e6b8c]/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Profile Picture & Name */}
          <div className="flex flex-col items-center">
            <img
              src={user.avatar || user.photoUrl || '/path/to/default-avatar.png'} // Додано fallback для avatar/photoUrl
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-[#4e6b8c]/30"
            />
            <h3 className="text-[18pt] font-[Ubuntu-Regular] text-white mt-3">{user.name}</h3>
            <div className="mt-2">
                <select
                    value={editingRole}
                    onChange={(e) => setEditingRole(e.target.value as UserRole)}
                    className={`px-3 py-1 rounded-lg border text-sm font-[Ubuntu-Regular] focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-[#4e6b8c]/20 text-white ${getRoleBadgeColor(editingRole)}`}
                >
                    <option value="Default member">Default member</option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                </select>
                <button
                    onClick={handleSaveRole}
                    className="ml-2 py-1.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-[Ubuntu-Regular] transition-colors"
                >
                    Save Role
                </button>
            </div>
          </div>

          {/* User Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 py-3 border-b border-[#4e6b8c]/20">
              <Mail className="w-5 h-5 text-[#87d7de]" />
              <div>
                <p className="text-sm text-white/70 font-[Ubuntu-Regular]">Email</p>
                <p className="text-white font-[Ubuntu-Regular]">{user.email}</p>
              </div>
            </div>

            {user.phone && (
              <div className="flex items-center gap-3 py-3 border-b border-[#4e6b8c]/20">
                <Phone className="w-5 h-5 text-[#87d7de]" />
                <div>
                  <p className="text-sm text-white/70 font-[Ubuntu-Regular]">Phone</p>
                  <p className="text-white font-[Ubuntu-Regular]">{user.phone}</p>
                </div>
              </div>
            )}

            {user.garageNumber && ( // Додано умовний рендеринг, оскільки garageNumber опціональний
                <div className="flex items-center gap-3 py-3 border-b border-[#4e6b8c]/20">
                    <MapPin className="w-5 h-5 text-[#87d7de]" />
                    <div>
                        <p className="text-sm text-white/70 font-[Ubuntu-Regular]">Garage Number</p>
                        <p className="text-white font-[Ubuntu-Regular]">{user.garageNumber}</p>
                    </div>
                </div>
            )}

            <div className="flex items-center gap-3 py-3 border-b border-[#4e6b8c]/20">
              <Calendar className="w-5 h-5 text-[#87d7de]" />
              <div>
                <p className="text-sm text-white/70 font-[Ubuntu-Regular]">Registration Date</p>
                <p className="text-white font-[Ubuntu-Regular]">{formatDate(user.registrationDate)}</p>
              </div>
            </div>

            {user.lastActivity && ( // Додано умовний рендеринг
                <div className="flex items-center gap-3 py-3 border-b border-[#4e6b8c]/20">
                    <Activity className="w-5 h-5 text-[#87d7de]" />
                    <div>
                        <p className="text-sm text-white/70 font-[Ubuntu-Regular]">Last Activity</p>
                        <p className="text-white font-[Ubuntu-Regular]">{formatDate(user.lastActivity)}</p>
                    </div>
                </div>
            )}

            <div className="flex items-center gap-3 py-3">
              <div className="w-5 h-5 flex items-center justify-center">
                <span className="text-[#87d7de]">$</span>
              </div>
              <div>
                <p className="text-sm text-white/70 font-[Ubuntu-Regular]">Personal Debt</p>
                <p className={`font-[Ubuntu-Regular] ${user.personalDebt > 0 ? 'text-red-300' : 'text-green-300'}`}>
                  {formatCurrency(user.personalDebt)}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button className="flex-1 py-3 px-4 bg-[#4e6b8c] hover:bg-[#4e6b8c]/80 text-white rounded-lg font-[Ubuntu-Regular] transition-colors">
              Edit User
            </button>
            <button className="flex-1 py-3 px-4 bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-600/30 rounded-lg font-[Ubuntu-Regular] transition-colors">
              Delete User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPanel;
