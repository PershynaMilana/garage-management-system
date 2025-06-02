export interface User {
  id: number;
  name: string;
  email: string;
  garageNumber: string;
  role: "Default member" | "Manager" | "Admin";
  personalDebt: number;
  avatar: string;
  phone?: string;
  registrationDate?: string;
  lastActivity?: string;
}

export interface UserFilters {
  members: boolean;
  managers: boolean;
  admins: boolean;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}
