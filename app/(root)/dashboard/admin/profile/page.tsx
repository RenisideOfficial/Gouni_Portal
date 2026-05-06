"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera, Loader2, CheckCircle2 } from "lucide-react";

export default function AdminProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Profile State
  const [profile, setProfile] = useState({
    name: "",
    id: "",
    email: "",
    phone: "",
    roleLevel: "Super Administrator",
  });

  // Load Admin Data from LocalStorage
  useEffect(() => {
    const loadProfile = () => {
      const storedUser = localStorage.getItem("gouni_current_user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setProfile({
          name: user.name || "System Admin",
          id: user.id || user.adminId || "GOU/ADMIN/001",
          email: user.email || "admin@gouni.edu.ng",
          phone: user.phone || "+234 800 000 0000",
          roleLevel: user.roleLevel || "Super Administrator",
        });
      }
      setIsLoading(false);
    };

    const timer = setTimeout(loadProfile, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);

    // 1. Update Current Session
    const currentUser = JSON.parse(
      localStorage.getItem("gouni_current_user") || "{}",
    );
    const updatedUser = {
      ...currentUser,
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
    };
    localStorage.setItem("gouni_current_user", JSON.stringify(updatedUser));

    // 2. Sync with Master Users List (so it persists after logout/login)
    const allUsers = JSON.parse(localStorage.getItem("gouni_users") || "[]");
    const updatedUsersList = allUsers.map((u: any) =>
      u.id === updatedUser.id || u.adminId === updatedUser.id ? updatedUser : u,
    );
    localStorage.setItem("gouni_users", JSON.stringify(updatedUsersList));

    // 3. UI Feedback
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);

    // Refresh page to trigger Topbar/Sidebar updates
    window.dispatchEvent(new Event("storage"));
  };

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-blue-900" />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Admin Profile</h1>
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-green-600 font-bold text-sm bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-lg border border-green-100 dark:border-green-900/30">
            <CheckCircle2 size={16} /> Changes Saved
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card p-6 md:p-10 rounded-2xl border border-border shadow-sm">
        {/* Avatar Section */}
        <div className="flex flex-col items-center sm:items-start sm:flex-row gap-6 mb-10 border-b border-border pb-8">
          <div className="relative group cursor-pointer">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-50 dark:border-blue-900/30">
              <img
                src="/images/admin_login_bg.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-center sm:text-left mt-2">
            <h3 className="text-blue-700 dark:text-blue-400 font-bold cursor-pointer hover:underline">
              Change Avatar
            </h3>
            <p className="text-[10px] font-black text-muted-foreground mt-1 uppercase tracking-widest">
              Restricted to {profile.roleLevel}
            </p>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSave}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-black uppercase text-muted-foreground mb-1.5 ml-1">
                Full Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                disabled={!isEditing}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground font-bold focus:ring-2 focus:ring-blue-900 outline-none disabled:opacity-50 disabled:bg-muted transition-all"
              />
            </div>

            {/* Admin ID (Read Only) */}
            <div>
              <label className="block text-xs font-black uppercase text-muted-foreground mb-1.5 ml-1">
                Admin ID
              </label>
              <input
                type="text"
                value={profile.id}
                disabled
                className="w-full px-4 py-3 rounded-xl border border-input bg-muted text-muted-foreground font-mono outline-none opacity-60 cursor-not-allowed"
              />
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <label className="block text-xs font-black uppercase text-muted-foreground mb-1.5 ml-1">
                Administrative Email
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                disabled={!isEditing}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground font-bold focus:ring-2 focus:ring-blue-900 outline-none disabled:opacity-50 disabled:bg-muted transition-all"
              />
            </div>

            {/* Role Level (Read Only) */}
            <div>
              <label className="block text-xs font-black uppercase text-muted-foreground mb-1.5 ml-1">
                Role Level
              </label>
              <input
                type="text"
                value={profile.roleLevel}
                disabled
                className="w-full px-4 py-3 rounded-xl border border-input bg-muted text-muted-foreground font-bold outline-none opacity-60 cursor-not-allowed"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-black uppercase text-muted-foreground mb-1.5 ml-1">
                Contact Number
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
                disabled={!isEditing}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground font-bold focus:ring-2 focus:ring-blue-900 outline-none disabled:opacity-50 disabled:bg-muted transition-all"
              />
            </div>
          </div>

          <div className="flex justify-end pt-6">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="w-full md:w-auto bg-blue-900 dark:bg-blue-700 text-white px-10 py-3.5 rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg active:scale-95">
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 md:flex-none bg-muted text-foreground px-8 py-3.5 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 md:flex-none bg-green-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg active:scale-95">
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
}
