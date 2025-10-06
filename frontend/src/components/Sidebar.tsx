import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import {
  HomeIcon,
  UsersIcon,
  FileTextIcon,
  SettingsIcon,
  BellIcon,
  CalendarIcon,
  BarChartIcon,
  MessageSquareIcon,
  HistoryIcon,
} from "lucide-react";

const navItems = [
  { to: "/", label: "Dashboard", icon: HomeIcon },
  { to: "/clients", label: "Clients", icon: UsersIcon },
  { to: "/reports", label: "Reports", icon: FileTextIcon },
  { to: "/programs", label: "Programs", icon: BarChartIcon },
  { to: "/appointments", label: "Appointments", icon: CalendarIcon },
  { to: "/forums", label: "Forums", icon: MessageSquareIcon },
  { to: "/notifications", label: "Notifications", icon: BellIcon },
  { to: "/history", label: "History", icon: HistoryIcon },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
];

const Sidebar: React.FC = () => {
  const { siteName, logo } = useTheme();

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-5 text-center border-b border-gray-200 dark:border-gray-700">
        {logo ? (
          <img
            src={logo}
            alt="Logo"
            className="h-12 mx-auto object-contain rounded"
          />
        ) : (
          <span className="text-2xl font-bold text-[var(--accent-color)]">
            {siteName}
          </span>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `flex items-center px-5 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[var(--accent-color)]/10 text-[var(--accent-color)]"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <Icon className="w-5 h-5 mr-3" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
