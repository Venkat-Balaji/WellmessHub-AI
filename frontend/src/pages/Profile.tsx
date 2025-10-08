import React, { useEffect, useState } from "react";
import API from "../api/axios";

interface User {
  name: string;
  email: string;
  profilePic?: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User>({ name: "", email: "", profilePic: "" });
  const [loading, setLoading] = useState(false);

  // ✅ Fetch profile from DB
  useEffect(() => {
    API.get("/profile")
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  // ✅ Update profile (name + pic)
  const handleSave = async () => {
    setLoading(true);
    try {
      const { data } = await API.put("/profile", user);
      setUser(data);
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setUser({ ...user, profilePic: reader.result as string });
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        My Profile
      </h1>

      <div className="space-y-4">
        <div className="flex flex-col items-center">
          <img
            src={
              user.profilePic ||
              "https://cdn-icons-png.flaticon.com/512/847/847969.png"
            }
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-teal-500 shadow mb-3"
          />
          <input type="file" accept="image/*" onChange={handleFileUpload} />
        </div>

        <div>
          <label className="block text-sm mb-1">Name</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border dark:border-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-200 dark:bg-gray-600"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full py-2 bg-teal-600 text-white rounded-lg"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
