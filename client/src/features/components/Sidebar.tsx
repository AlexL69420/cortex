import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  HiMenu, 
  HiX, 
  HiHome, 
  HiBookOpen, 
  HiCollection, 
  HiAcademicCap,
  HiChevronRight 
} from "react-icons/hi";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Главная", icon: HiHome },
    { path: "/exercises", label: "Задания", icon: HiBookOpen },
    { path: "/variants", label: "Варианты", icon: HiCollection },
    { path: "/courses", label: "Курсы", icon: HiAcademicCap },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      // При закрытии также сворачиваем расширенное состояние
      setTimeout(() => setIsExpanded(false), 300);
    }
  };

  const handleMouseEnter = () => {
    if (isOpen) {
      setIsExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  return (
    <>
      {/* Кнопка открытия */}
      <button
        onClick={toggleSidebar}
        className="fixed left-7 top-20 z-50 rounded-full bg-blue-600 p-3 text-white shadow-2xl transition-all hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-900 dark:hover:bg-blue-800"
        aria-label="Открыть меню"
      >
        {isOpen ? <HiX className="size-6" /> : <HiMenu className="size-6" />}
      </button>

      {/* Floating Sidebar */}
      <div
        className={`fixed left-6 top-36 z-40 transition-all duration-300${
          isOpen ? "translate-x-0 opacity-100" : "pointer-events-none -translate-x-4 opacity-0"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`rounded-2xl bg-white/95 shadow-2xl ring-1 ring-black/5 backdrop-blur-sm transition-all duration-300 dark:bg-slate-800/95 dark:ring-white/10 ${
            isExpanded ? "w-64" : "w-14"
          }`}
        >
          <nav className="p-2">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`group flex items-center rounded-xl p-3 text-sm font-medium transition-all ${
                        isActive
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-700"
                      } ${isExpanded ? "justify-start" : "justify-center"}`}
                      title={isExpanded ? "" : item.label}
                    >
                      <Icon className="size-5 shrink-0" />
                      {isExpanded && (
                        <>
                          <span className="ml-3">{item.label}</span>
                          <HiChevronRight className="ml-auto size-4 opacity-0 transition-opacity group-hover:opacity-100" />
                        </>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* Overlay для мобильных */}
      {isOpen && (
        <div
          // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
          className="fixed inset-0 z-30 bg-black bg-opacity-20 lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
}