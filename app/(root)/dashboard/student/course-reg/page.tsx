// src/app/(root)/dashboard/student/course-reg/page.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";

export default function CourseRegistrationPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">
          Course Registration
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Select the right semester to register
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="w-full md:flex-1">
            <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
              Session
            </label>
            <select className="w-full bg-background border border-input text-foreground px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-900/50 dark:focus:ring-blue-500/50 transition-all">
              <option>2025/2026 Session</option>
              <option>2024/2025 Session</option>
            </select>
          </div>

          <div className="w-full md:flex-1">
            <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
              Semester
            </label>
            <select className="w-full bg-background border border-input text-foreground px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-900/50 dark:focus:ring-blue-500/50 transition-all">
              <option>1st Semester</option>
              <option>2nd Semester</option>
            </select>
          </div>

          <button className="w-full md:w-auto bg-blue-900 dark:bg-blue-700 text-white px-10 py-3 rounded-xl font-medium hover:bg-blue-800 transition-colors shadow-sm whitespace-nowrap">
            Register Courses
          </button>
        </div>
      </motion.div>
    </div>
  );
}
