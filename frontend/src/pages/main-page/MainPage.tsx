import React, { useState, useMemo } from "react";
import PageLayout from "../../components/layout/PageLayout.tsx";
import UserManagementHeader from "../../components/user-management/UserManagementHeader.tsx";
import UserSearchAndFilters from "../../components/user-management/UserSearchAndFilters.tsx";
import UserTable from "../../components/user-management/UserTable.tsx";
import UserFiltersPanel from "../../components/user-management/UserFiltersPanel.tsx";
import UserDetailsPanel from "../../components/user-management/UserDetailsPanel.tsx";
import { User, UserFilters } from "../../types/user.ts";
import { mockUsers } from "../../data/mockUsers.ts";

const MainPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const [filters, setFilters] = useState<UserFilters>({
    members: true,
    managers: true,
    admins: true,
  });

  // Filter users based on search and role filters
  const filteredUsers = useMemo(() => {
    return mockUsers.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        (filters.members && user.role === "Default member") ||
        (filters.managers && user.role === "Manager") ||
        (filters.admins && user.role === "Admin");

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, filters]);

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  const handleRoleChange = (userId: number, role: User["role"]) => {
    // TODO: Implement role change API call
    console.log(`Changing role for user ${userId} to ${role}`);
  };

  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
  };

  return (
    <PageLayout>
      <div className="h-auto text-white pt-[5vh]">
        {/* Header */}
        <div className="p-4 md:p-8">
          <UserManagementHeader />
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8">
          <div className="bg-[#2a3f5f]/30 backdrop-blur-sm rounded-lg border border-[#4e6b8c]/30 overflow-hidden">
            <div className="p-4 md:p-6">
              <UserSearchAndFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onFilterToggle={handleFilterToggle}
              />

              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <UserTable
                    users={paginatedUsers}
                    onUserClick={handleUserClick}
                    onRoleChange={handleRoleChange}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={setItemsPerPage}
                  />
                </div>

                {showFilters && (
                  <div className="lg:w-72">
                    <UserFiltersPanel
                      filters={filters}
                      onFiltersChange={setFilters}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* User Details Modal */}
        {showUserDetails && selectedUser && (
          <UserDetailsPanel
            user={selectedUser}
            onClose={() => setShowUserDetails(false)}
          />
        )}
      </div>
    </PageLayout>
  );
};

export default MainPage;
