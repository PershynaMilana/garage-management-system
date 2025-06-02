import React from "react";

const UserTableHeader: React.FC = () => {
  return (
    <div className="hidden md:grid grid-cols-5 gap-4 p-4 bg-[#4e6b8c]/30 border-b border-[#4e6b8c]/30">
      <div className="text-white/70 font-medium font-[Ubuntu-Regular] text-sm md:text-base">
        Customer name
      </div>
      <div className="text-white/70 font-medium font-[Ubuntu-Regular] text-sm md:text-base">
        Email
      </div>
      <div className="text-white/70 font-medium font-[Ubuntu-Regular] text-sm md:text-base">
        Garage number
      </div>
      <div className="text-white/70 font-medium font-[Ubuntu-Regular] text-sm md:text-base">
        Role
      </div>
      <div className="text-white/70 font-medium font-[Ubuntu-Regular] text-sm md:text-base">
        Personal debt
      </div>
    </div>
  );
};

export default UserTableHeader;
