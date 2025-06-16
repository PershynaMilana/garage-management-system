import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsersGear,
  faCog,
  faChartLine,
  faArrowRightFromBracket,
  faWarehouse, // Додано іконку для управління гаражем
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useDispatch } from 'react-redux'; // Імпортуємо useDispatch та useSelector
import { logoutUser } from '../store/authSlice'; // Виправлено: видалено .ts розширення
import { AppDispatch } from '../store/store.ts'; // Виправлено: додано .ts розширення

// Додаємо всі необхідні іконки до бібліотеки FontAwesome
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
  const dispatch = useDispatch<AppDispatch>(); // Отримуємо dispatch

  // Визначення елементів навігації
  const navigationItems = [
    {
      id: "users",
      icon: ["fas", "users-gear"],
      alt: "Users",
      path: "/main-page",
    },
    {
      id: "garage", // Новий елемент для управління гаражем
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
      alt: "Вийти", // Змінено на український переклад
      path: "/logout", // Цей шлях більше не використовується для navigate напряму, а для визначення активності
    },
  ];

  // Обробник для звичайної навігації
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // Обробник для кнопки "Вийти"
  const handleLogout = async () => {
    try {
      // Викликаємо Redux thunk для логауту.
      // .unwrap() дозволяє нам обробляти успіх/помилку асинхронної операції.
      await dispatch(logoutUser()).unwrap();
      // Після успішного логауту (навіть якщо API-виклик не вдався, але токен видалено локально)
      navigate('/login'); // Перенаправляємо на сторінку логіну
    } catch (error) {
      console.error('Logout failed:', error);
      // Якщо виникла помилка під час API-виклику логауту,
      // але токен вже видалено локально, все одно перенаправляємо на логін.
      navigate('/login');
    }
  };

  // Функція для визначення активного елемента навігації
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Desktop adaptation (приховано на мобільних) */}
      <div className="hidden md:flex fixed left-0 top-0 h-full w-16 bg-[#1E2A38] bg-opacity-25 z-50 flex-col items-center py-4 shadow-xl border-r border-gray-700/30">
        <div className="flex flex-col items-center space-y-4 flex-1 justify-center">
          {navigationItems.map((item) => (
            // Умовний рендеринг: для кнопки "Вийти" використовуємо handleLogout
            item.id === 'logout' ? (
              <button
                key={item.id}
                onClick={handleLogout} // Викликаємо handleLogout для кнопки "Вийти"
                className={`group relative w-10 h-10 rounded-lg transition-all duration-200 flex items-center justify-center ${
                  isActive(item.path)
                    ? 'bg-transparent'
                    : 'bg-transparent hover:bg-[#2a2a3e]/50'
                }`}
                title={item.alt}
              >
                <FontAwesomeIcon
                  icon={item.icon as any}
                  style={{
                    color: isActive(item.path) ? '#22d3ee' : '#6b7280',
                    fontSize: '18px',
                    transition: 'color 0.2s ease',
                  }}
                  className="group-hover:!text-gray-300"
                />
                <div className="absolute left-16 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  {item.alt}
                  <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                </div>
              </button>
            ) : (
              // Для інших навігаційних елементів залишаємо handleNavigation
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`group relative w-10 h-10 rounded-lg transition-all duration-200 flex items-center justify-center ${
                  isActive(item.path)
                    ? 'bg-transparent'
                    : 'bg-transparent hover:bg-[#2a2a3e]/50'
                }`}
                title={item.alt}
              >
                <FontAwesomeIcon
                  icon={item.icon as any}
                  style={{
                    color: isActive(item.path) ? '#22d3ee' : '#6b7280',
                    fontSize: '18px',
                    transition: 'color 0.2s ease',
                  }}
                  className="group-hover:!text-gray-300"
                />
                <div className="absolute left-16 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  {item.alt}
                  <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                </div>
              </button>
            )
          ))}
        </div>
      </div>

      {/* Mobile adaptation (приховано на десктопах) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#1E2A38] bg-opacity-25 z-50 flex items-center justify-between px-4 shadow-xl border-b border-gray-700/30">
        <div className="flex items-center space-x-3">
          {navigationItems.map((item) => (
            // Умовний рендеринг для кнопки "Вийти"
            item.id === 'logout' ? (
              <button
                key={item.id}
                onClick={handleLogout} // Викликаємо handleLogout для кнопки "Вийти"
                className={`relative w-8 h-8 rounded-lg transition-all duration-200 flex items-center justify-center ${
                  isActive(item.path)
                    ? 'bg-transparent'
                    : 'bg-transparent hover:bg-[#2a2a3e]/50'
                }`}
                title={item.alt}
              >
                <FontAwesomeIcon
                  icon={item.icon as any}
                  style={{
                    color: isActive(item.path) ? '#22d3ee' : '#6b7280',
                    fontSize: '14px',
                    transition: 'color 0.2s ease',
                  }}
                />
              </button>
            ) : (
              // Для інших навігаційних елементів залишаємо handleNavigation
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`relative w-8 h-8 rounded-lg transition-all duration-200 flex items-center justify-center ${
                  isActive(item.path)
                    ? 'bg-transparent'
                    : 'bg-transparent hover:bg-[#2a2a3e]/50'
                }`}
                title={item.alt}
              >
                <FontAwesomeIcon
                  icon={item.icon as any}
                  style={{
                    color: isActive(item.path) ? '#22d3ee' : '#6b7280',
                    fontSize: '14px',
                    transition: 'color 0.2s ease',
                  }}
                />
              </button>
            )
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
