import React from "react";

const UserManagementHeader: React.FC = () => {
  return (
    <div className="mb-4 md:mb-8">
      <h1 className="text-[24pt] md:text-[36pt] font-[IBMPlexMono-Regular] text-left ml-0 md:ml-[12vw] mb-2 md:mb-4 text-white">
        User management section
      </h1>
      <h2 className="text-[16pt] md:text-[20pt] font-[Ubuntu-Regular] text-left ml-0 md:ml-[12vw] text-white/70">
        list of users
      </h2>
    </div>
  );
};

export default UserManagementHeader;
