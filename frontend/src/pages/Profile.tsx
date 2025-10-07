import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  name: string;
  email: string;
  profilePic?: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User>({ name: "", email: "", profilePic: "" });
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // ✅ Fetch user details on mount
  useEffect(() => {
    if (!token) return;
    axios
      .get("http://localhost:5000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error fetching profile:", err));
  }, [token]);

  // ✅ Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () =>
      setUser({ ...user, profilePic: reader.result as string });
    reader.readAsDataURL(file);
  };

  // ✅ Save profile updates
  const handleSave = async () => {
    setLoading(true);
    try {
      if (!token) {
        alert("You are not logged in!");
        return;
      }

      const res = await axios.put(
        "http://localhost:5000/api/profile",
        { ...user, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("✅ Profile updated successfully!");
      setPassword("");
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
    } catch (err: any) {
      console.error("Error updating profile:", err.response?.data || err.message);
      alert(`Error updating profile: ${err.response?.data?.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        My Profile
      </h1>

      <div className="space-y-4">
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <img
            src={
              user.profilePic ||
              "https://cdn-icons-png.flaticon.com/512/847/847969.png"
            }
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-teal-500 shadow mb-3"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="text-gray-700 dark:text-gray-300 text-sm"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
            Name
          </label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-teal-400 outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-teal-400 outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
            New Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-teal-400 outline-none"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full py-2 bg-teal-600 hover:bg-teal-500 text-white font-medium rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
