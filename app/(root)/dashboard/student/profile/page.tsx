"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";

export default function ProfilePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [picError, setPicError] = useState("");

  // Form State (Notice avatar defaults to empty string)
  const [formData, setFormData] = useState({
    name: "",
    regNumber: "",
    email: "",
    level: "",
    phone: "",
    prog: "",
    id: "",
    avatar: "",
  });

  // Load User Data from LocalStorage
  useEffect(() => {
    const loadData = () => {
      const storedUser = localStorage.getItem("gouni_current_user");
      if (storedUser) {
        setFormData({ ...formData, ...JSON.parse(storedUser) });
      }
      setIsLoading(false);
    };
    const timer = setTimeout(loadData, 300);
    return () => clearTimeout(timer);
  }, []);

  // --- NEW: COMPRESSION LOGIC TO PREVENT LOCALSTORAGE CRASH ---
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reject extremely massive files before processing to prevent RAM crash
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
        const MAX_WIDTH = 256; // Perfect avatar size
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

        // Convert the shrunk canvas back to a highly compressed Base64 string
        // Using 'image/webp' with 0.8 quality usually yields a string under 30KB
        const compressedBase64 = canvas.toDataURL("image/webp", 0.8);

        setFormData({ ...formData, avatar: compressedBase64 });
        setIsEditing(true); // Auto-trigger edit mode so they click Save
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);

    try {
      // 1. Update Current Session
      localStorage.setItem("gouni_current_user", JSON.stringify(formData));

      // 2. Sync with Global Users List
      const allUsers = JSON.parse(localStorage.getItem("gouni_users") || "[]");
      const updatedUsersList = allUsers.map((u: any) =>
        u.id === formData.id || u.regNumber === formData.regNumber
          ? { ...u, ...formData }
          : u,
      );
      localStorage.setItem("gouni_users", JSON.stringify(updatedUsersList));

      // 3. UI Feedback
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);

      // Trigger global update
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      // Fallback just in case Quota is somehow still exceeded
      console.error("Storage Error:", error);
      setPicError("Storage full. Could not save profile changes.");
      setTimeout(() => setPicError(""), 5000);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-blue-900 w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 px-4 sm:px-0">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Profile Settings
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your personal information and contact details.
          </p>
        </div>

        <AnimatePresence>
          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center gap-2 text-green-600 font-bold text-sm bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-xl border border-green-100">
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
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center sm:items-start sm:flex-row gap-6 mb-10 border-b border-border pb-8">
          <div
            className="relative group cursor-pointer"
            onClick={() => fileInputRef.current?.click()}>
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-50 dark:border-blue-900/30 bg-muted flex items-center justify-center shadow-sm">
              <img
                src={formData.avatar || "/images/user_image.jpg"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <input
              type="file"
              accept="image/png, image/jpeg, image/webp"
              hidden
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
          </div>

          <div className="text-center sm:text-left mt-2">
            <h3 className="text-blue-700 dark:text-blue-400 font-bold text-lg">
              {formData.name}
            </h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1 mb-3">
              {formData.prog} • {formData.level || "100L"}
            </p>
            <span
              onClick={() => fileInputRef.current?.click()}
              className="text-xs font-bold text-blue-600 hover:underline cursor-pointer bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-lg transition-colors">
              Upload New Photo
            </span>
            <AnimatePresence>
              {picError && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-red-600 mt-4 bg-red-50 px-3 py-1.5 rounded-md border border-red-100">
                  <AlertTriangle size={12} /> {picError}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Profile Form */}
        <form className="space-y-6" onSubmit={handleSave}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1.5 ml-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                disabled={!isEditing}
                className="w-full px-4 py-3.5 rounded-2xl border border-input bg-background text-foreground font-bold focus:ring-2 focus:ring-blue-900 outline-none disabled:opacity-50 disabled:bg-muted transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1.5 ml-1">
                Registration Number
              </label>
              <input
                type="text"
                value={formData.regNumber}
                disabled
                className="w-full px-4 py-3.5 rounded-2xl border border-input bg-muted text-muted-foreground font-mono font-bold outline-none opacity-60 cursor-not-allowed"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1.5 ml-1">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                disabled={!isEditing}
                className="w-full px-4 py-3.5 rounded-2xl border border-input bg-background text-foreground font-bold focus:ring-2 focus:ring-blue-900 outline-none disabled:opacity-50 disabled:bg-muted transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1.5 ml-1">
                Academic Level
              </label>
              <input
                type="text"
                value={formData.level || "100L"}
                disabled
                className="w-full px-4 py-3.5 rounded-2xl border border-input bg-muted text-muted-foreground font-bold outline-none opacity-60 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1.5 ml-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                disabled={!isEditing}
                className="w-full px-4 py-3.5 rounded-2xl border border-input bg-background text-foreground font-bold focus:ring-2 focus:ring-blue-900 outline-none disabled:opacity-50 disabled:bg-muted transition-all"
              />
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-border mt-8">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="w-full md:w-auto bg-blue-900 dark:bg-blue-700 text-white px-10 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-800 transition-all shadow-lg active:scale-95">
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 md:flex-none bg-muted text-foreground px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 md:flex-none bg-green-600 text-white px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-green-700 transition-all shadow-lg active:scale-95">
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
