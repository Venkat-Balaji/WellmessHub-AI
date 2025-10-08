import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Moon, Sun, User, Settings, LogOut } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const Topbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center bg-white dark:bg-gray-800 px-6 py-3 shadow-md transition-all duration-300">
      
      {/* --- LEFT SIDE: Greeting --- */}
      <div>
        <span className="text-gray-700 dark:text-gray-300 font-medium text-lg">
          Welcome back, {user?.name?.split(" ")[0] || "Guest"}!
        </span>
      </div>

      {/* --- RIGHT SIDE: Controls --- */}
      <div className="relative flex items-center gap-4">
        {/* Dark/Light Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Avatar / Profile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="h-9 w-9 flex items-center justify-center rounded-full bg-teal-600 text-white font-bold hover:bg-teal-500 transition overflow-hidden"
          title="Profile Menu"
        >
          {user?.profilePic ? (
            <img
              src={user.profilePic}
              alt="avatar"
              className="h-full w-full object-cover"
            />
          ) : (
            user?.name?.[0]?.toUpperCase() || "U"
          )}
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div
            className="absolute right-0 top-12 w-44 bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-600 z-50 animate-fadeIn"
            onMouseLeave={() => setMenuOpen(false)}
          >
            <button
              onClick={() => {
                navigate("/profile");
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
            >
              <User size={16} /> Profile
            </button>

            <button
              onClick={() => {
                navigate("/settings");
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
            >
              <Settings size={16} /> Settings
            </button>

            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Topbar;
