import React, { useState } from "react";
import PageLayout from "../../components/layout/PageLayout.tsx";
import GarageManagementHeader from "../../components/garage-management/GarageManagementHeader.tsx";
import GarageGrid from "../../components/garage-management/GarageGrid.tsx";
import GarageDetailsModal from "../../components/garage-management/GarageDetailsModal.tsx";
import UsersWithoutGarage from "../../components/garage-management/UsersWithoutGarage.tsx";
import AssignGarageModal from "../../components/garage-management/AssignGarageModal.tsx";
import RegisterUserModal from "../../components/garage-management/RegisterUserModal.tsx";
import { User } from "../../types/user.ts";
import { mockUsers } from "../../data/mockUsers.ts";

const GarageManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [selectedGarage, setSelectedGarage] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showGarageModal, setShowGarageModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [assignModalState, setAssignModalState] = useState<{
    user?: User;
    garage?: string;
  }>({});

  const handleGarageClick = (garageNumber: string, user?: User) => {
    setSelectedGarage(garageNumber);
    setSelectedUser(user || null);
    setShowGarageModal(true);
  };

  const handleCloseGarageModal = () => {
    setShowGarageModal(false);
    setSelectedGarage(null);
    setSelectedUser(null);
  };

  const handleAssignUserToGarage = (garageNumber: string) => {
    setAssignModalState({ garage: garageNumber });
    setShowGarageModal(false);
    setShowAssignModal(true);
  };

  const handleAssignGarageToUser = (user: User) => {
    setAssignModalState({ user });
    setShowAssignModal(true);
  };

  const handleRemoveUserFromGarage = (userId: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, garageNumber: "-" } : user
      )
    );
    setShowGarageModal(false);
    // TODO: Implement API call
    console.log(`Видалення користувача ${userId} з гаражу`);
  };

  const handleEditUser = (user: User) => {
    // TODO: Implement edit user functionality
    console.log("Редагування користувача:", user);
    setShowGarageModal(false);
  };

  const handleAssignGarage = (userId: number, garageNumber: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, garageNumber } : user
      )
    );
    setShowAssignModal(false);
    // Полностью очищаем состояние модального окна
    setAssignModalState({});
    // TODO: Implement API call
    console.log(`Призначення гаражу ${garageNumber} користувачу ${userId}`);
  };

  const handleRegisterNewUser = () => {
    setShowRegisterModal(true);
  };

  const handleRegisterUser = (userData: Partial<User>) => {
    const newUser: User = {
      id: Math.max(...users.map((u) => u.id)) + 1,
      name: userData.name!,
      email: userData.email!,
      phone: userData.phone!,
      role: userData.role!,
      garageNumber: "-",
      personalDebt: 0,
      avatar: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face`,
      registrationDate: new Date().toISOString().split("T")[0],
      lastActivity: new Date().toISOString().split("T")[0],
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);
    // TODO: Implement API call
    console.log("Реєстрація нового користувача:", newUser);
  };

  return (
    <PageLayout>
      <div className="h-auto text-white pt-[5vh]">
        {/* Header */}
        <div className="p-4 md:p-8">
          <GarageManagementHeader />
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8 space-y-8">
          {/* Garage Grid */}
          <GarageGrid users={users} onGarageClick={handleGarageClick} />

          {/* Users without garage */}
          <UsersWithoutGarage
            users={users}
            onAssignGarage={handleAssignGarageToUser}
            onRegisterNewUser={handleRegisterNewUser}
          />
        </div>

        {/* Modals */}
        {showGarageModal && selectedGarage && (
          <GarageDetailsModal
            garageNumber={selectedGarage}
            user={selectedUser || undefined}
            onClose={handleCloseGarageModal}
            onAssignUser={handleAssignUserToGarage}
            onRemoveUser={handleRemoveUserFromGarage}
            onEditUser={handleEditUser}
          />
        )}

        <AssignGarageModal
          isOpen={showAssignModal}
          onClose={() => {
            setShowAssignModal(false);
            // Полностью очищаем состояние при закрытии
            setAssignModalState({});
          }}
          users={users}
          selectedUser={assignModalState.user}
          selectedGarage={assignModalState.garage}
          onAssign={handleAssignGarage}
        />

        <RegisterUserModal
          isOpen={showRegisterModal}
          onClose={() => setShowRegisterModal(false)}
          onRegister={handleRegisterUser}
        />
      </div>
    </PageLayout>
  );
};

export default GarageManagementPage;
