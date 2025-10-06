import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const presetColors = [
  "#14b8a6", // teal
  "#3b82f6", // blue
  "#8b5cf6", // purple
  "#ef4444", // red
  "#f59e0b", // amber
  "#10b981", // green
];

const Settings: React.FC = () => {
  const { theme, toggleTheme, accent, setAccent, siteName, setSiteName, logo, setLogo } = useTheme();

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setLogo(dataUrl);
        localStorage.setItem("siteLogo", dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogo(null);
    localStorage.removeItem("siteLogo");
  };

  const handleCustomColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setAccent(color);
    localStorage.setItem("accent", color);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
        Settings
      </h1>

      {/* Theme Mode */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Appearance
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-300">Theme:</span>
          <button
            onClick={toggleTheme}
            className="bg-[var(--accent-color)] hover:opacity-90 text-white px-4 py-2 rounded-lg font-medium transition"
          >
            Switch to {theme === "light" ? "Dark" : "Light"}
          </button>
        </div>
      </section>

      {/* Accent Color */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Accent Color
        </h2>

        {/* Preset Colors */}
        <div className="flex flex-wrap gap-3">
          {presetColors.map((color) => (
            <button
              key={color}
              className={`w-10 h-10 rounded-full border-2 ${
                color === accent
                  ? "border-gray-900 dark:border-white scale-110"
                  : "border-transparent"
              } transition-all duration-300`}
              style={{ backgroundColor: color }}
              onClick={() => setAccent(color)}
            />
          ))}

          {/* Custom Color Picker */}
          <label
            htmlFor="customColor"
            className="cursor-pointer relative w-10 h-10 rounded-full border border-gray-400 dark:border-gray-600 flex items-center justify-center hover:opacity-80 transition-all"
          >
            🎨
            <input
              id="customColor"
              type="color"
              onChange={handleCustomColor}
              value={accent}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </label>
        </div>

        {/* Live Accent Preview Bar */}
        <div className="mt-5 h-2 rounded-full w-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: "100%",
              backgroundColor: accent,
              transition: "background-color 0.3s ease",
            }}
          />
        </div>

        <p className="text-sm text-gray-500 mt-3">
          Selected: <span style={{ color: accent }}>{accent}</span>
        </p>
      </section>

      {/* Site Info */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Site Information
        </h2>

        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
            Site Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-[var(--accent-color)] outline-none"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-2">
            Upload Logo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="block w-full text-sm text-gray-600 dark:text-gray-300"
          />

          {logo && (
            <div className="mt-4 flex flex-col items-start space-y-3">
              <div>
                <p className="text-sm text-gray-500 mb-1">Logo Preview:</p>
                <img
                  src={logo}
                  alt="Logo Preview"
                  className="h-16 w-auto rounded-lg shadow border border-gray-200 dark:border-gray-700"
                />
              </div>

              {/* 🧹 Remove Logo Button */}
              <button
                onClick={() => handleRemoveLogo()}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-all duration-200"
              >
                Remove Logo
              </button>
            </div>
          )}
        </div>
      </section>

      <div className="flex justify-end">
        <button
          onClick={() =>
            alert(`✅ Saved: ${siteName} | ${accent} | ${theme} mode`)
          }
          className="bg-[var(--accent-color)] hover:opacity-90 text-white font-medium px-6 py-2 rounded-lg shadow transition"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
