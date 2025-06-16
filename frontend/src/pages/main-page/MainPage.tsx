import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store'; // Переконайтеся, що шлях правильний
import {
    fetchUsers,
    setSearch,
    setRoleFilter,
    setCurrentPage,
    setLimit,
    updateUserRoleAsync,
    setSelectedUserId,
} from '../../store/userSlice';
import PageLayout from "../../components/layout/PageLayout.tsx";
import UserManagementHeader from "../../components/user-management/UserManagementHeader.tsx";
import UserSearchAndFilters from "../../components/user-management/UserSearchAndFilters.tsx";
import UserTable from "../../components/user-management/UserTable.tsx";
import UserFiltersPanel from "../../components/user-management/UserFiltersPanel.tsx";
import UserDetailsPanel from "../../components/user-management/UserDetailsPanel.tsx";
import { User, UserFilters, UserRole } from "../../types/user.ts";

const MainPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    const {
        users,
        currentPage,
        totalPages,
        limit,
        search, // Redux search state
        roleFilter,
        loading,
        error,
        selectedUserId,
    } = useSelector((state: RootState) => state.users);

    // Ми будемо використовувати localSearchQuery для керування значенням input поля
    // і оновлювати Redux 'search' через debouncing.
    const [localSearchQuery, setLocalSearchQuery] = useState(search);

    const [localFilters, setLocalFilters] = useState<UserFilters>({
        members: true,
        managers: true,
        admins: true,
    });
    const [showFilters, setShowFilters] = useState(false);

    // Синхронізуємо localSearchQuery зі станом Redux, якщо він змінюється ззовні (наприклад, скидання)
    useEffect(() => {
        setLocalSearchQuery(search);
    }, [search]);

    // Оновлюємо localFilters відповідно до roleFilter з Redux
    useEffect(() => {
        setLocalFilters({
            members: roleFilter === 'Default member',
            managers: roleFilter === 'Manager',
            admins: roleFilter === 'Admin',
        });
    }, [roleFilter]);


    // Метод для формування параметрів запиту до бекенду
    const getQueryParams = useCallback(() => {
        let backendRoleFilter: UserRole | undefined = undefined;

        const selectedRoles = [
            localFilters.admins ? 'Admin' : undefined,
            localFilters.managers ? 'Manager' : undefined,
            localFilters.members ? 'Default member' : undefined,
        ].filter(Boolean);

        if (selectedRoles.length === 1) {
            backendRoleFilter = selectedRoles[0] as UserRole;
        } else {
            backendRoleFilter = undefined;
        }

        // Тут використовуємо Redux 'search', оскільки він оновлюється заdebounced
        return {
            page: currentPage,
            limit: limit,
            search: search,
            role: backendRoleFilter,
        };
    }, [currentPage, limit, search, localFilters.admins, localFilters.managers, localFilters.members]);

    // ==== НОВА ЛОГІКА ДЛЯ DEBOUNCING ТА СКИДАННЯ СТОРІНКИ ====
    useEffect(() => {
        const handler = setTimeout(() => {
            // Викликаємо setSearch ТІЛЬКИ ПІСЛЯ debouncing.
            // Це запускає основний useEffect з fetchUsers.
            if (localSearchQuery !== search) { // Тільки якщо локальний запит відрізняється від Redux
                dispatch(setSearch(localSearchQuery));
                // І скидаємо сторінку на 1, оскільки пошук змінився.
                dispatch(setCurrentPage(1));
            }
        }, 1000); // Затримка 300 мс

        return () => {
            clearTimeout(handler);
        };
    }, [localSearchQuery, dispatch, search]); // 'search' як залежність для перевірки 'if (localSearchQuery !== search)'

    // Цей useEffect тепер відповідає ВИКЛЮЧНО за fetchUsers, коли змінюються параметри, що викликають запит
    useEffect(() => {
        // Ми викликаємо fetchUsers тільки тоді, коли Redux `search` змінюється (після debounce)
        // Або коли змінюються `currentPage`, `limit` чи `roleFilter` (через `getQueryParams`)
        const params = getQueryParams();
        dispatch(fetchUsers(params));
    }, [dispatch, getQueryParams]); // Залежності, які викликають оновлення даних

    // Обробник зміни локального стану поля пошуку - НЕ диспатчимо setSearch тут
    const handleSearchChange = (value: string) => {
        setLocalSearchQuery(value); // Оновлюємо локальний стан негайно, щоб input працював плавно
        // НЕ ДИСПАТЧИМО dispatch(setSearch(value)); ТУТ! Це робить useEffect після debounce.
    };
    // ===============================================================


    const handleFilterToggle = () => {
        setShowFilters(prev => !prev);
    };

    const handleFiltersChange = (newFilters: UserFilters) => {
        setLocalFilters(newFilters);

        const selectedRoles = [
            newFilters.admins ? 'Admin' : undefined,
            newFilters.managers ? 'Manager' : undefined,
            newFilters.members ? 'Default member' : undefined,
        ].filter(Boolean);

        if (selectedRoles.length === 1) {
            dispatch(setRoleFilter(selectedRoles[0] as UserRole));
        } else {
            dispatch(setRoleFilter(undefined));
        }
        dispatch(setCurrentPage(1)); // Скидаємо сторінку при зміні фільтра ролі
    };

    const handleUserClick = (user: User) => {
        dispatch(setSelectedUserId(user.id));
    };

    const handleCloseUserDetails = () => {
        dispatch(setSelectedUserId(null));
    };

    const handleUpdateUserRole = async (userId: number, newRole: UserRole) => {
        await dispatch(updateUserRoleAsync({ userId, newRole }));
        dispatch(setSelectedUserId(null));
    };

    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    const handleItemsPerPageChange = (items: number) => {
        dispatch(setLimit(items));
    };

    const selectedUser = useMemo(() => {
        return users.find(u => u.id === selectedUserId) || null;
    }, [users, selectedUserId]);

    if (loading) {
        return (
            <PageLayout>
                <div className="h-screen flex items-center justify-center text-white text-xl">
                    Завантаження користувачів...
                </div>
            </PageLayout>
        );
    }

    if (error) {
        return (
            <PageLayout>
                <div className="h-screen flex items-center justify-center text-red-500 text-xl">
                    Помилка завантаження: {error}
                </div>
            </PageLayout>
        );
    }

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
                                searchQuery={localSearchQuery} // Передаємо локальний стан пошуку
                                onSearchChange={handleSearchChange} // Обробляємо локальний стан
                                onFilterToggle={handleFilterToggle}
                            />

                            <div className="flex flex-col lg:flex-row gap-6">
                                <div className="flex-1">
                                    <UserTable
                                        users={users}
                                        onUserClick={handleUserClick}
                                        onRoleChange={handleUpdateUserRole}
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        itemsPerPage={limit}
                                        onPageChange={handlePageChange}
                                        onItemsPerPageChange={handleItemsPerPageChange}
                                    />
                                </div>

                                {showFilters && (
                                    <div className="lg:w-72">
                                        <UserFiltersPanel
                                            filters={localFilters}
                                            onFiltersChange={handleFiltersChange}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Details Modal */}
                {selectedUserId !== null && selectedUser && (
                    <UserDetailsPanel
                        user={selectedUser}
                        onClose={handleCloseUserDetails}
                        onUpdateRole={handleUpdateUserRole}
                    />
                )}
            </div>
        </PageLayout>
    );
};

export default MainPage;
