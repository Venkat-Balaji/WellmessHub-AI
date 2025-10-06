import React from "react";
import SearchBar from "./SearchBar";
import ThemeSwitcher from "./ThemeSwitcher";

const Topbar: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <SearchBar />
      <ThemeSwitcher />
    </header>
  );
};

export default Topbar;
