// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUsersGear, faCog, faChartLine, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
// import { library } from "@fortawesome/fontawesome-svg-core";

// library.add(faUsersGear, faChartLine, faCog, faArrowRightFromBracket);

// const Header: React.FC = () => {
//     const navigate = useNavigate();
//     const location = useLocation();

//     const navigationItems = [
//         {
//             id: 'users',
//             icon: ['fas', 'users-gear'],
//             alt: 'Users',
//             path: '/main-page'
//         },
//         {
//             id: 'chart',
//             icon: ['fas', 'chart-line'],
//             alt: 'Chart',
//             path: '/statistics'
//         },
//         {
//             id: 'settings',
//             icon: ['fas', 'cog'],
//             alt: 'Settings',
//             path: '/settings'
//         },
//         {
//             id: 'logout',
//             icon: ['fas', 'arrow-right-from-bracket'],
//             alt: 'Logout',
//             path: '/logout'
//         }
//     ];

//     const handleNavigation = (path: string) => {
//         navigate(path);
//     };

//     const isActive = (path: string) => {
//         return location.pathname === path;
//     };

//     return (
//         <>
//             {/* Desktop adaptation */}
//             <div className="hidden md:flex fixed left-0 top-0 h-full w-16 bg-[#1E2A38] bg-opacity-25 z-50 flex-col items-center py-4 shadow-xl border-r border-gray-700/30">
//                 <div className="flex flex-col items-center space-y-4 flex-1 justify-center">
//                     {navigationItems.map((item) => (
//                         <button
//                             key={item.id}
//                             onClick={() => handleNavigation(item.path)}
//                             className={`group relative w-10 h-10 rounded-lg transition-all duration-200 flex items-center justify-center ${
//                                 isActive(item.path)
//                                     ? 'bg-transparent'
//                                     : 'bg-transparent hover:bg-[#2a2a3e]/50'
//                             }`}
//                             title={item.alt}
//                         >
//                             <FontAwesomeIcon
//                                 icon={item.icon as any}
//                                 style={{
//                                     color: isActive(item.path) ? '#22d3ee' : '#6b7280',
//                                     fontSize: '18px',
//                                     transition: 'color 0.2s ease'
//                                 }}
//                                 className="group-hover:!text-gray-300"
//                             />

//                             <div className="absolute left-16 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
//                                 {item.alt}
//                                 <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
//                             </div>
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             {/* Mobile adaptation */}
//             <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#1E2A38] bg-opacity-25 z-50 flex items-center justify-between px-4 shadow-xl border-b border-gray-700/30">
//                 <div className="flex items-center space-x-3">
//                     {navigationItems.map((item) => (
//                         <button
//                             key={item.id}
//                             onClick={() => handleNavigation(item.path)}
//                             className={`relative w-8 h-8 rounded-lg transition-all duration-200 flex items-center justify-center ${
//                                 isActive(item.path)
//                                     ? 'bg-transparent'
//                                     : 'bg-transparent hover:bg-[#2a2a3e]/50'
//                             }`}
//                             title={item.alt}
//                         >
//                             <FontAwesomeIcon
//                                 icon={item.icon as any}
//                                 style={{
//                                     color: isActive(item.path) ? '#22d3ee' : '#6b7280',
//                                     fontSize: '14px',
//                                     transition: 'color 0.2s ease'
//                                 }}
//                             />
//                         </button>
//                     ))}
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Header;

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsersGear,
  faCog,
  faChartLine,
  faArrowRightFromBracket,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(
  faUsersGear,
  faChartLine,
  faCog,
  faArrowRightFromBracket,
  faWarehouse
);

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      id: "users",
      icon: ["fas", "users-gear"],
      alt: "Users",
      path: "/main-page",
    },
    {
      id: "garage",
      icon: ["fas", "warehouse"],
      alt: "Garage Management",
      path: "/garage-management",
    },
    {
      id: "chart",
      icon: ["fas", "chart-line"],
      alt: "Chart",
      path: "/statistics",
    },
    {
      id: "settings",
      icon: ["fas", "cog"],
      alt: "Settings",
      path: "/settings",
    },
    {
      id: "logout",
      icon: ["fas", "arrow-right-from-bracket"],
      alt: "Logout",
      path: "/logout",
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Desktop adaptation */}
      <div className="hidden md:flex fixed left-0 top-0 h-full w-16 bg-[#1E2A38] bg-opacity-25 z-50 flex-col items-center py-4 shadow-xl border-r border-gray-700/30">
        <div className="flex flex-col items-center space-y-4 flex-1 justify-center">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`group relative w-10 h-10 rounded-lg transition-all duration-200 flex items-center justify-center ${
                isActive(item.path)
                  ? "bg-transparent"
                  : "bg-transparent hover:bg-[#2a2a3e]/50"
              }`}
              title={item.alt}
            >
              <FontAwesomeIcon
                icon={item.icon as any}
                style={{
                  color: isActive(item.path) ? "#22d3ee" : "#6b7280",
                  fontSize: "18px",
                  transition: "color 0.2s ease",
                }}
                className="group-hover:!text-gray-300"
              />

              <div className="absolute left-16 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                {item.alt}
                <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile adaptation */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#1E2A38] bg-opacity-25 z-50 flex items-center justify-between px-4 shadow-xl border-b border-gray-700/30">
        <div className="flex items-center space-x-3">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`relative w-8 h-8 rounded-lg transition-all duration-200 flex items-center justify-center ${
                isActive(item.path)
                  ? "bg-transparent"
                  : "bg-transparent hover:bg-[#2a2a3e]/50"
              }`}
              title={item.alt}
            >
              <FontAwesomeIcon
                icon={item.icon as any}
                style={{
                  color: isActive(item.path) ? "#22d3ee" : "#6b7280",
                  fontSize: "14px",
                  transition: "color 0.2s ease",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
