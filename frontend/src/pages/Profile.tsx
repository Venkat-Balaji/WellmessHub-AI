import React, { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { Edit2, Save, X, Upload, Trash2 } from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string | null;
}

const Profile: React.FC = () => {
  const { accent } = useTheme();

  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    phone: "",
    bio: "",
    avatar: null,
  });

  const [editing, setEditing] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("userProfile");
    if (stored) setProfile(JSON.parse(stored));
  }, []);

  // Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
  }, [profile]);

  // Handle file upload
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfile({ ...profile, avatar: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => setProfile({ ...profile, avatar: null });

  const handleSave = () => {
    setEditing(false);
    localStorage.setItem("userProfile", JSON.stringify(profile));
    alert("✅ Profile updated successfully!");
  };

  const handleCancel = () => {
    const stored = localStorage.getItem("userProfile");
    if (stored) setProfile(JSON.parse(stored));
    setEditing(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Profile
      </h1>

      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
          {/* Avatar */}
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[var(--accent-color)] shadow-md">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt="Profile Avatar"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 text-sm">
                No Photo
              </div>
            )}
          </div>

          {/* Upload + Remove */}
          {editing && (
            <div className="flex flex-col mt-4 sm:mt-0 space-y-2">
              <label
                htmlFor="avatar"
                className="flex items-center justify-center px-3 py-2 rounded-lg bg-[var(--accent-color)] text-white font-medium cursor-pointer hover:opacity-90 transition"
              >
                <Upload className="w-4 h-4 mr-2" /> Upload
                <input
                  type="file"
                  id="avatar"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </label>

              {profile.avatar && (
                <button
                  onClick={handleRemoveAvatar}
                  className="flex items-center justify-center px-3 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Remove
                </button>
              )}
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-gray-500 dark:text-gray-400">
              Name
            </label>
            {editing ? (
              <input
                type="text"
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-[var(--accent-color)] outline-none"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            ) : (
              <p className="mt-1 text-gray-800 dark:text-gray-100 font-medium">
                {profile.name || "—"}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-500 dark:text-gray-400">
              Email
            </label>
            {editing ? (
              <input
                type="email"
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-[var(--accent-color)] outline-none"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            ) : (
              <p className="mt-1 text-gray-800 dark:text-gray-100 font-medium">
                {profile.email || "—"}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-500 dark:text-gray-400">
              Phone
            </label>
            {editing ? (
              <input
                type="tel"
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-[var(--accent-color)] outline-none"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />
            ) : (
              <p className="mt-1 text-gray-800 dark:text-gray-100 font-medium">
                {profile.phone || "—"}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-500 dark:text-gray-400">
              Bio
            </label>
            {editing ? (
              <textarea
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-[var(--accent-color)] outline-none"
                rows={3}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              />
            ) : (
              <p className="mt-1 text-gray-700 dark:text-gray-300 italic">
                {profile.bio || "—"}
              </p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end space-x-3">
          {editing ? (
            <>
              <button
                onClick={handleCancel}
                className="flex items-center px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                <X className="w-4 h-4 mr-2" /> Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center px-4 py-2 rounded-lg bg-[var(--accent-color)] text-white font-medium hover:opacity-90 transition"
              >
                <Save className="w-4 h-4 mr-2" /> Save
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center px-4 py-2 rounded-lg bg-[var(--accent-color)] text-white font-medium hover:opacity-90 transition"
            >
              <Edit2 className="w-4 h-4 mr-2" /> Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
