import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sun, Moon, User, Settings, LogIn, LogOut } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const Topbar: React.FC = () => {
  const { theme, toggleTheme, accent } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Change to your auth logic
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      {/* Left Side - Placeholder or Title */}
      <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Dashboard
      </h1>

      {/* Right Side - Actions */}
      <div className="flex items-center space-x-4 relative">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:opacity-80 transition"
          title="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </button>

        {/* Profile / Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-[var(--accent-color)] text-white font-semibold hover:opacity-90 transition"
            title="Profile"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-50 animate-fadeIn">
              <button
                onClick={() => {
                  navigate("/profile");
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              >
                <User className="w-4 h-4 mr-2 text-[var(--accent-color)]" /> Profile
              </button>
              <button
                onClick={() => {
                  navigate("/settings");
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              >
                <Settings className="w-4 h-4 mr-2 text-[var(--accent-color)]" /> Settings
              </button>
              <hr className="border-gray-200 dark:border-gray-700" />
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    alert("✅ Logged out");
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsLoggedIn(true);
                    navigate("/login");
                    alert("✅ Logged in");
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                >
                  <LogIn className="w-4 h-4 mr-2" /> Login
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
