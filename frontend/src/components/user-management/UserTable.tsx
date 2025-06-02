import React from "react";
import { User } from "../../types/user";
import UserTableHeader from "./UserTableHeader";
import UserTableRow from "./UserTableRow";
import Pagination from "./Pagination";

interface UserTableProps {
  users: User[];
  onUserClick: (user: User) => void;
  onRoleChange: (userId: number, role: User["role"]) => void;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onUserClick,
  onRoleChange,
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  return (
    <div className="bg-[#2a3f5f]/50 backdrop-blur-sm rounded-lg border border-[#4e6b8c]/30 overflow-hidden">
      <UserTableHeader />

      <div>
        {users.map((user) => (
          <UserTableRow
            key={user.id}
            user={user}
            onClick={() => onUserClick(user)}
            onRoleChange={onRoleChange}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
        onItemsPerPageChange={onItemsPerPageChange}
      />
    </div>
  );
};

export default UserTable;
