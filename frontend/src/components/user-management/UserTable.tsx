import React, { useEffect } from 'react'; 
import { useTranslation } from 'react-i18next';
import { User, UserRole, PaginationProps } from '../../types/user';
import UserTableHeader from "./UserTableHeader";
import UserTableRow from "./UserTableRow";
import Pagination from "./Pagination";

interface UserTableProps extends PaginationProps {
    users: User[];
    onUserClick: (user: User) => void;
    onRoleChange: (userId: number, role: User["role"]) => void;

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
    const { t } = useTranslation();

    useEffect(() => {
        console.log("UserTable received users (current page data):", users.length, "Expected itemsPerPage (limit from Redux):", itemsPerPage);
        console.log("Current Page:", currentPage, "Total Pages:", totalPages);
        console.log("Pagination props - currentPage:", currentPage, "totalPages:", totalPages, "itemsPerPage:", itemsPerPage);
    }, [users, itemsPerPage, currentPage, totalPages]);


    return (
        <div className="bg-[#2a3f5f]/50 backdrop-blur-sm rounded-lg border border-[#4e6b8c]/30 overflow-hidden">
            <UserTableHeader />

            <div>
                {users.length === 0 ? (
                    <div className="p-8 text-center text-white/70">
                        {t('userManagement.table.noUsers')}
                    </div>
                ) : (
                    users.map((user) => (
                        <UserTableRow
                            key={user.userId}
                            user={user}
                            onClick={() => onUserClick(user)}
                            onRoleChange={onRoleChange}
                        />
                    ))
                )}
            </div>

            {/* Pagination component. Ensure it uses currentPage, totalPages, itemsPerPage */}
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
