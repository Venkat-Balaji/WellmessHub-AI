import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import {
  HomeIcon,
  UsersIcon,
  FileTextIcon,
  BarChartIcon,
  CalendarIcon,
  MessageSquareIcon,
  BellIcon,
  HistoryIcon,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: HomeIcon },
  { to: "/clients", label: "Clients", icon: UsersIcon },
  { to: "/reports", label: "Reports", icon: FileTextIcon },
  { to: "/programs", label: "Programs", icon: BarChartIcon },
  { to: "/appointments", label: "Appointments", icon: CalendarIcon },
  { to: "/forums", label: "Forums", icon: MessageSquareIcon },
  { to: "/notifications", label: "Notifications", icon: BellIcon },
  { to: "/history", label: "History", icon: HistoryIcon },
];

const Sidebar: React.FC = () => {
  const { siteName, logo, accent } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={`${
        isExpanded ? "w-64" : "w-20"
      } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-xl h-screen flex flex-col transition-all duration-300 ease-in-out overflow-hidden`}
    >
      {/* Logo / Title */}
      <div className="flex items-center justify-center p-4 border-b border-gray-200 dark:border-gray-700">
        {logo ? (
          <img
            src={logo}
            alt="Logo"
            className={`${
              isExpanded ? "h-10 w-auto" : "h-8 w-8"
            } object-contain transition-all duration-300`}
          />
        ) : (
          <span
            className={`font-bold text-[var(--accent-color)] transition-all duration-300 ${
              isExpanded ? "text-xl" : "text-lg"
            }`}
          >
            {isExpanded ? siteName : siteName.charAt(0)}
          </span>
        )}
      </div>

      {/* Nav Links */}
      <nav className="flex-1 mt-4">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `group flex items-center gap-4 px-4 py-3 rounded-lg mx-2 my-1 transition-all duration-300 ${
                isActive
                  ? "bg-[var(--accent-color)]/10 text-[var(--accent-color)]"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <Icon
              className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
                isExpanded ? "" : "mx-auto"
              }`}
            />
            <span
              className={`whitespace-nowrap overflow-hidden transition-all duration-200 ${
                isExpanded
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-5"
              }`}
            >
              {label}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* Footer Accent Bar */}
      <div
        className="mt-auto h-1 rounded-t-lg transition-all duration-300"
        style={{ backgroundColor: accent }}
      ></div>
    </aside>
  );
};

export default Sidebar;
