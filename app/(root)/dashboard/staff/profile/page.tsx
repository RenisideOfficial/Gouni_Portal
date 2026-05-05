// src/app/(root)/dashboard/staff/profile/page.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

export default function StaffProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Profile Settings</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card p-6 md:p-10 rounded-2xl border border-border shadow-sm">
        {/* Profile Picture Upload Area */}
        <div className="flex flex-col items-center sm:items-start sm:flex-row gap-6 mb-10 border-b border-border pb-8">
          <div className="relative group cursor-pointer">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-50 dark:border-blue-900/30">
              <img
                src="/images/staff_login_bg.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-center sm:text-left mt-2">
            <h3 className="text-blue-700 dark:text-blue-400 font-semibold cursor-pointer hover:underline">
              Change Profile Picture
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              JPG, GIF or PNG. Max size of 2MB
            </p>
          </div>
        </div>

        {/* Profile Form */}
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            setIsEditing(false);
          }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="Dr. Emeka Obi"
                disabled={!isEditing}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-500 outline-none disabled:opacity-50 disabled:bg-muted transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Staff ID
              </label>
              <input
                type="text"
                defaultValue="GOU/STAFF/045"
                disabled // Staff IDs shouldn't be editable
                className="w-full px-4 py-3 rounded-xl border border-input bg-muted text-muted-foreground outline-none opacity-60 cursor-not-allowed"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="emeka.obi@gouni.edu.ng"
                disabled={!isEditing}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-500 outline-none disabled:opacity-50 disabled:bg-muted transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Department
              </label>
              <input
                type="text"
                defaultValue="Computer Science"
                disabled // Department updates handled by Admin
                className="w-full px-4 py-3 rounded-xl border border-input bg-muted text-muted-foreground outline-none opacity-60 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                defaultValue="+234 803 123 4567"
                disabled={!isEditing}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-500 outline-none disabled:opacity-50 disabled:bg-muted transition-all"
              />
            </div>
          </div>

          <div className="flex justify-end pt-6">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="w-full md:w-auto bg-blue-900 dark:bg-blue-700 text-white px-10 py-3 rounded-xl font-medium hover:bg-blue-800 transition-colors shadow-sm">
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 md:flex-none bg-muted text-foreground px-8 py-3 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 md:flex-none bg-green-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors shadow-sm">
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
