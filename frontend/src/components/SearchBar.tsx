import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Search for: ${query}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-teal-400 outline-none"
      />
      <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
    </form>
  );
};

export default SearchBar;
