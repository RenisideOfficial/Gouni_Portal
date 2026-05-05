// src/app/(root)/dashboard/staff/page.tsx
"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { FileSpreadsheet, Users, Download, ArrowRight } from "lucide-react";
import Link from "next/link";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function StaffDashboardHome() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Welcome Dr. Emeka 👋
        </h1>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          variants={itemVariants}
          className="bg-card p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30 shadow-sm flex flex-col justify-between h-32">
          <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
            Assigned Courses
          </span>
          <span className="text-3xl font-bold text-foreground self-end">4</span>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between h-32">
          <span className="text-sm font-medium text-muted-foreground">
            Pending Result Uploads
          </span>
          <span className="text-3xl font-bold text-amber-600 dark:text-amber-400 self-end">
            2
          </span>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between h-32">
          <span className="text-sm font-medium text-muted-foreground">
            Total Students
          </span>
          <span className="text-3xl font-bold text-foreground self-end">
            342
          </span>
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants} initial="hidden" animate="show">
        <h2 className="text-sm font-bold text-foreground mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/dashboard/staff/results"
            className="flex items-center justify-center gap-2 bg-blue-900 dark:bg-blue-700 text-white p-3.5 rounded-xl font-medium hover:bg-blue-800 transition-colors shadow-sm">
            <FileSpreadsheet className="w-4 h-4" /> Upload Results
          </Link>
          <Link
            href="/dashboard/staff/students"
            className="flex items-center justify-center gap-2 bg-blue-900 dark:bg-blue-700 text-white p-3.5 rounded-xl font-medium hover:bg-blue-800 transition-colors shadow-sm">
            <Users className="w-4 h-4" /> View Students
          </Link>
          <Link
            href="/dashboard/staff/salary"
            className="flex items-center justify-center gap-2 bg-blue-900 dark:bg-blue-700 text-white p-3.5 rounded-xl font-medium hover:bg-blue-800 transition-colors shadow-sm">
            <Download className="w-4 h-4" /> Payslip
          </Link>
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground">Recent Activity</h2>
          <Link
            href="/dashboard/staff/results"
            className="text-sm text-blue-700 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-border pb-4">
            <div>
              <p className="font-medium text-foreground">
                CSC 401 Results Published
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                First Semester 2025/2026
              </p>
            </div>
            <span className="text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-full">
              Published
            </span>
          </div>
          <div className="flex justify-between items-center border-b border-border pb-4">
            <div>
              <p className="font-medium text-foreground">CSC 405 Draft Saved</p>
              <p className="text-xs text-muted-foreground mt-1">
                Pending approval before publishing
              </p>
            </div>
            <span className="text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-3 py-1 rounded-full">
              Draft
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
