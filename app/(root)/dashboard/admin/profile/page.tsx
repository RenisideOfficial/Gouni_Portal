"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";

// Inline interface for strict typing
interface AdminProfile {
  name: string;
  id: string;
  email: string;
  phone: string;
  roleLevel: string;
  avatar: string; // Dynamic avatar field
}

export default function AdminProfilePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [picError, setPicError] = useState("");

  // Profile State initialized with the strict interface
  const [profile, setProfile] = useState<AdminProfile>({
    name: "",
    id: "",
    email: "",
    phone: "",
    roleLevel: "Super Administrator",
    avatar: "", // Initial empty string
  });

  // Load Admin Data from LocalStorage
  useEffect(() => {
    const loadProfile = () => {
      const storedUser = localStorage.getItem("gouni_current_user");
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          // Merge with defaults just in case some fields are missing
          setProfile({
            name: user.name || "System Admin",
            id: user.id || user.adminId || "GOU/ADMIN/001",
            email: user.email || "admin@gouni.edu.ng",
            phone: user.phone || "+234 800 000 0000",
            roleLevel: user.roleLevel || "Super Administrator",
            avatar: user.avatar || "", // Pull dynamic avatar
          });
        } catch (error) {
          console.error("Failed to parse admin data", error);
        }
      }
      setIsLoading(false);
    };

    const timer = setTimeout(loadProfile, 300);
    return () => clearTimeout(timer);
  }, []);

  // --- IMAGE COMPRESSION LOGIC (Strictly Client-Side) ---
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Type check
    if (!file.type.startsWith("image/")) {
      setPicError("Please select a valid image file (PNG, JPG, WEBP).");
      setTimeout(() => setPicError(""), 5000);
      return;
    }

    // Reject extremely large files before processing to save RAM
    if (file.size > 5 * 1024 * 1024) {
      setPicError("File too large. Please select an image under 5MB.");
      setTimeout(() => setPicError(""), 5000);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Create an invisible canvas
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 256; // Standard avatar resolution
        const MAX_HEIGHT = 256;

        let width = img.width;
        let height = img.height;

        // Maintain aspect ratio while shrinking
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        // Convert shrunk canvas to a highly compressed Base64 WebP string
        // Quality 0.8 keeps it sharp but usually stays under 30KB
        const compressedBase64 = canvas.toDataURL("image/webp", 0.8);

        // Strict final check before state update for QuotaExceeded safety
        if (compressedBase64.length > 2 * 1024 * 1024) {
          setPicError(
            "Image is still too large after compression. Try a simpler image.",
          );
          setTimeout(() => setPicError(""), 5000);
          return;
        }

        setProfile({ ...profile, avatar: compressedBase64 });
        setIsEditing(true); // Auto-trigger edit mode so user saves changes
        setPicError(""); // Clear any errors
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setPicError("");

    try {
      // 1. Update Current Session
      const currentUser = JSON.parse(
        localStorage.getItem("gouni_current_user") || "{}",
      );
      const updatedUser = {
        ...currentUser,
        ...profile, // Sync all editable fields including dynamic avatar
      };
      localStorage.setItem("gouni_current_user", JSON.stringify(updatedUser));

      // 2. Sync with Global Users List
      const allUsers = JSON.parse(localStorage.getItem("gouni_users") || "[]");
      const updatedUsersList = allUsers.map((u: any) =>
        u.id === updatedUser.id || u.adminId === updatedUser.id
          ? updatedUser
          : u,
      );
      localStorage.setItem("gouni_users", JSON.stringify(updatedUsersList));

      // 3. UI Feedback & Global Sync
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);

      // Trigger standard 'storage' event for Topbar/Sidebar instant updates
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.error("Failed to save profile changes:", error);
      // Fallback for LocalStorage full
      setPicError(
        "Storage full. Could not save changes, try removing previous data.",
      );
      setIsEditing(true); // keep edit mode
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-blue-900 w-8 h-8" />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 px-4 sm:px-0">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Admin Profile</h1>
        <AnimatePresence>
          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center gap-2 text-green-600 font-bold text-sm bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-lg border border-green-100 dark:border-green-900/30">
              <CheckCircle2 size={16} /> Changes Saved
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card p-6 md:p-10 rounded-[2.5rem] border border-border shadow-sm">
        {/* Dynamic Avatar Section */}
        <div className="flex flex-col items-center sm:items-start sm:flex-row gap-6 mb-10 border-b border-border pb-8 relative">
          <div
            className="relative group cursor-pointer"
            onClick={() => fileInputRef.current?.click()}>
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-50 dark:border-blue-900/30 bg-muted flex items-center justify-center shadow-sm">
              <img
                src={profile.avatar || "/images/admin_login_bg.jpg"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Camera className="w-6 h-6 text-white" />
            </div>
            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/png,image/jpeg,image/gif,image/webp"
              onChange={handleImageUpload}
              hidden
            />
          </div>
          <div className="text-center sm:text-left mt-2">
            <h3
              className="text-blue-700 dark:text-blue-400 font-bold cursor-pointer hover:underline"
              onClick={() => fileInputRef.current?.click()}>
              Change Avatar
            </h3>
            <p className="text-[10px] font-black text-muted-foreground mt-1 uppercase tracking-widest">
              Restricted to {profile.roleLevel}
            </p>
            {/* Pic Error Display */}
            <AnimatePresence>
              {picError && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="mt-3 text-[11px] font-bold text-red-600 bg-red-50 dark:bg-red-900/10 px-3 py-1.5 rounded-lg border border-red-100 dark:border-red-900/30 flex items-center gap-1.5">
                  <AlertTriangle size={14} /> {picError}
                </motion.div>
              )}
            </AnimatePresence>
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
                  onClick={() => {
                    setIsEditing(false);
                    setPicError("");
                  }}
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
