import React from 'react';
import { Users, UserCheck, Shield } from 'lucide-react';
import { UserFilters } from '../../types/user';

interface UserFiltersPanelProps {
  filters: UserFilters;
  onFiltersChange: (filters: UserFilters) => void;
}

const UserFiltersPanel: React.FC<UserFiltersPanelProps> = ({
  filters,
  onFiltersChange
}) => {
  const handleFilterChange = (filterKey: keyof UserFilters) => {
    onFiltersChange({
      ...filters,
      [filterKey]: !filters[filterKey]
    });
  };

  return (
    <div className="bg-[#2a3f5f]/50 backdrop-blur-sm rounded-lg border border-[#4e6b8c]/30 p-6">
      <div className="mb-6">
        <h3 className="text-white font-medium mb-4 font-[Ubuntu-Regular] text-[18pt]">User roles</h3>
        <div className="space-y-3">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={filters.members}
              onChange={() => handleFilterChange('members')}
              className="w-4 h-4 text-[#87d7de] bg-[#4e6b8c]/50 border-[#4e6b8c] rounded focus:ring-[#87d7de] focus:ring-2"
            />
            <div className="ml-3 flex items-center gap-2 text-white/70 font-[Ubuntu-Regular]">
              <Users className="w-4 h-4" />
              Default member
            </div>
          </label>

          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={filters.managers}
              onChange={() => handleFilterChange('managers')}
              className="w-4 h-4 text-[#87d7de] bg-[#4e6b8c]/50 border-[#4e6b8c] rounded focus:ring-[#87d7de] focus:ring-2"
            />
            <div className="ml-3 flex items-center gap-2 text-white/70 font-[Ubuntu-Regular]">
              <UserCheck className="w-4 h-4" />
              Manager
            </div>
          </label>

          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={filters.admins}
              onChange={() => handleFilterChange('admins')}
              className="w-4 h-4 text-[#87d7de] bg-[#4e6b8c]/50 border-[#4e6b8c] rounded focus:ring-[#87d7de] focus:ring-2"
            />
            <div className="ml-3 flex items-center gap-2 text-white/70 font-[Ubuntu-Regular]">
              <Shield className="w-4 h-4" />
              Admin
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default UserFiltersPanel;