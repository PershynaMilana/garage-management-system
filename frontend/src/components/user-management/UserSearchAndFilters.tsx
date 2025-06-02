import React from "react";
import { Search, Filter } from "lucide-react";

interface UserSearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterToggle: () => void;
}

const UserSearchAndFilters: React.FC<UserSearchAndFiltersProps> = ({
  searchQuery,
  onSearchChange,
  onFilterToggle,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-[#4e6b8c]/50 border border-[#4e6b8c] rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#87d7de] font-[Ubuntu-Regular] text-sm md:text-base"
        />
      </div>
      <button
        onClick={onFilterToggle}
        className="px-6 py-3 bg-[#4e6b8c] hover:bg-[#4e6b8c]/80 text-white rounded-lg flex items-center justify-center gap-2 transition-colors font-[Ubuntu-Regular] w-full sm:w-auto"
      >
        <Filter className="w-5 h-5" />
        FILTERS
      </button>
    </div>
  );
};

export default UserSearchAndFilters;
