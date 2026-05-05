// src/app/(root)/dashboard/admin/page.tsx
"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { UserPlus, Users, CreditCard, PieChart } from "lucide-react";
import Link from "next/link";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AdminDashboardHome() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Admin Overview
        </h1>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          variants={itemVariants}
          className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between h-32">
          <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
            Pending Admissions
          </span>
          <span className="text-3xl font-bold text-foreground self-end">
            128
          </span>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between h-32">
          <span className="text-sm font-medium text-muted-foreground">
            Active Staff
          </span>
          <span className="text-3xl font-bold text-foreground self-end">
            214
          </span>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between h-32">
          <span className="text-sm font-medium text-muted-foreground">
            Total Students
          </span>
          <span className="text-3xl font-bold text-foreground self-end">
            4,892
          </span>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="bg-card p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30 shadow-sm flex flex-col justify-between h-32">
          <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
            Monthly Revenue
          </span>
          <span className="text-3xl font-bold text-foreground self-end">
            ₦42.5M
          </span>
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants} initial="hidden" animate="show">
        <h2 className="text-sm font-bold text-foreground mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/dashboard/admin/admissions"
            className="flex items-center justify-center gap-2 bg-blue-900 dark:bg-blue-700 text-white p-3.5 rounded-xl font-medium hover:bg-blue-800 transition-colors shadow-sm">
            <UserPlus className="w-4 h-4" /> Approve Adm.
          </Link>
          <Link
            href="/dashboard/admin/staff"
            className="flex items-center justify-center gap-2 bg-blue-900 dark:bg-blue-700 text-white p-3.5 rounded-xl font-medium hover:bg-blue-800 transition-colors shadow-sm">
            <Users className="w-4 h-4" /> Add Staff
          </Link>
          <Link
            href="/dashboard/admin/finances"
            className="flex items-center justify-center gap-2 bg-blue-900 dark:bg-blue-700 text-white p-3.5 rounded-xl font-medium hover:bg-blue-800 transition-colors shadow-sm">
            <CreditCard className="w-4 h-4" /> Set Fees
          </Link>
          <Link
            href="/dashboard/admin/finances"
            className="flex items-center justify-center gap-2 bg-blue-900 dark:bg-blue-700 text-white p-3.5 rounded-xl font-medium hover:bg-blue-800 transition-colors shadow-sm">
            <PieChart className="w-4 h-4" /> Reports
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
