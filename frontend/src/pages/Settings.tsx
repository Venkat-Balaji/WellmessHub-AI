import React, { useEffect, useState } from "react";
import API from "../api/axios";

interface Settings {
  theme: "light" | "dark";
  color: string;
  siteName: string;
  logoUrl?: string;
}

const presetColors = [
  "#14b8a6", "#3b82f6", "#8b5cf6", "#ef4444", "#f59e0b", "#10b981",
];

export default function Settings() {
  const [settings, setSettings] = useState<Settings>({
    theme: "light",
    color: "#14b8a6",
    siteName: "WellnessHub",
    logoUrl: "",
  });
  const [loading, setLoading] = useState(false);

  // ✅ Load settings from backend
  useEffect(() => {
    API.get("/settings", { withCredentials: true })
      .then((res) => setSettings(res.data))
      .catch((err) => console.error("Error loading settings:", err));
  }, []);

  // ✅ Save settings
  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await API.put("/settings", settings, { withCredentials: true });
      setSettings(res.data);
      alert("✅ Settings saved successfully!");
    } catch (err: any) {
      console.error("Error saving settings:", err.response?.data || err.message);
      alert("❌ Failed to update settings.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle logo upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setSettings({ ...settings, logoUrl: reader.result as string });
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-700 to-teal-900">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl p-8 w-full max-w-xl">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Settings</h1>

        {/* Theme Toggle */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-gray-300 text-sm font-medium">Theme Mode:</span>
          <button
            onClick={() =>
              setSettings({ ...settings, theme: settings.theme === "light" ? "dark" : "light" })
            }
            className="px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-white transition"
          >
            Switch to {settings.theme === "light" ? "Dark" : "Light"}
          </button>
        </div>

        {/* Accent Colors */}
        <div className="mb-6">
          <span className="text-gray-300 text-sm font-medium mb-2 block">Accent Color</span>
          <div className="flex space-x-3">
            {presetColors.map((c) => (
              <button
                key={c}
                onClick={() => setSettings({ ...settings, color: c })}
                className={`w-8 h-8 rounded-full border-2 ${
                  settings.color === c ? "border-white scale-110" : "border-transparent"
                } transition-transform`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          {/* Custom color picker */}
          <div className="mt-3">
            <input
              type="color"
              value={settings.color}
              onChange={(e) => setSettings({ ...settings, color: e.target.value })}
              className="w-12 h-8 rounded-md border border-gray-300 cursor-pointer"
            />
          </div>
        </div>

        {/* Site Name */}
        <div className="mb-6">
          <label className="block text-sm text-gray-300 mb-1">Site Name</label>
          <input
            type="text"
            value={settings.siteName}
            onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-400 outline-none"
          />
        </div>

        {/* Logo Upload */}
        <div className="mb-6">
          <label className="block text-sm text-gray-300 mb-2">Upload Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="text-gray-300 text-sm"
          />
          {settings.logoUrl && (
            <div className="mt-4 flex justify-center">
              <img
                src={settings.logoUrl}
                alt="Logo Preview"
                className="h-16 w-auto rounded-lg border border-white/20 shadow"
              />
            </div>
          )}
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full py-2 mt-2 bg-teal-500 hover:bg-teal-400 text-white rounded-lg font-medium transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
