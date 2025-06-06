// frontend/src/types/user.ts

// Тип для ролі користувача, який відповідає бекенду
export type UserRole = 'Default member' | 'Manager' | 'Admin';

// Інтерфейс для основного об'єкта користувача
// Об'єднано ваші існуючі поля з тими, що повертає бекенд
export interface User {
    userId: number; // Використовуємо userId, як на бекенді
    id?: number; // Можливо, id є просто псевдонімом або використовується локально
    name: string;
    email: string;
    phone?: string;
    registrationDate: string; // Формат дати, як з бекенду
    userStatus: string; // Нове поле з бекенду
    photoUrl?: string; // З бекенду (відповідає вашому 'avatar')
    avatar?: string; // Ваше існуюче поле, якщо воно відрізняється від photoUrl
    role: UserRole;
    personalDebt: number;
    garageNumber?: string; // Ваше існуюче поле
    lastActivity?: string; // Ваше існуюче поле

    // Додаткові поля, які можуть бути отримані при запиті одного користувача (getUserById)
    membershipId?: string;
    notificationSettings?: string;
    garageUnitId?: number;
    garageLocation?: string;
    garageSize?: string;
    garageStatus?: string;
    garageAccessSettings?: string;
}

// Інтерфейс для параметрів запиту користувачів (фільтри, пошук, пагінація)
// Це буде відправлятися на бекенд
export interface UserQueryParams {
    search?: string; // Для пошуку за ім'ям або email
    role?: UserRole; // Для фільтрації за однією роллю
    // Ваші UserFilters можуть бути перетворені в один параметр 'role' для бекенду
    // Або ми можемо передавати їх окремо, якщо бекенд це підтримує
    // Наприклад, 'members' і 'managers' можуть стати role: 'Default member' | 'Manager'
    // Якщо бекенд очікує лише одну роль, то UserFilters краще обробити на фронті.
    // Якщо ж бекенд може фільтрувати за кількома ролями одночасно, то тут потрібно масив:
    // roles?: UserRole[];
    page?: number;
    limit?: number; // Кількість елементів на сторінці
}

// Інтерфейс для відповіді від бекенду при отриманні списку користувачів
export interface UserListResponse {
    users: User[];
    totalUsers: number;
    currentPage: number;
    totalPages: number;
}

// Ваш існуючий інтерфейс для фільтрів, який може використовуватися на фронтенді
// для відображення чекбоксів тощо.
// Цей інтерфейс, ймовірно, буде перетворений на UserQueryParams перед відправкою на бекенд.
export interface UserFilters {
    members: boolean;
    managers: boolean;
    admins: boolean;
    // Можливо, тут потрібен search та інші фільтри, якщо вони використовуються на фронті
    search?: string;
}


// Ваш існуючий інтерфейс для пагінації (просто для пропсів компонента Pagination)
export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (items: number) => void;
}