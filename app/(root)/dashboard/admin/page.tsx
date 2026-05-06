"use client";
import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import {
  Users,
  CreditCard,
  PieChart,
  BookOpen,
  UserCheck,
  TrendingUp,
  Loader2,
} from "lucide-react";
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
  const [stats, setStats] = useState({
    activeStaff: 0,
    totalStudents: 0,
    monthlyRevenue: 0,
    courseRegistrations: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = () => {
      // 1. Get Users Data
      const allUsers = JSON.parse(localStorage.getItem("gouni_users") || "[]");
      const staffCount = allUsers.filter((u: any) => u.role === "staff").length;
      const studentCount = allUsers.filter(
        (u: any) => u.role === "student",
      ).length;

      // 2. Get Financial Data (Sum all successful payments)
      const allPayments = JSON.parse(
        localStorage.getItem("gouni_payments") || "[]",
      );
      const totalRevenue = allPayments
        .filter((p: any) => p.status === "Paid")
        .reduce((sum: number, p: any) => sum + Number(p.amount), 0);

      // 3. Get Course Registration Stats
      const allRegs = JSON.parse(
        localStorage.getItem("gouni_registrations") || "[]",
      );
      const registrationCount = allRegs.length;

      setStats({
        activeStaff: staffCount,
        totalStudents: studentCount,
        monthlyRevenue: totalRevenue,
        courseRegistrations: registrationCount,
      });
      setIsLoading(false);
    };

    const timer = setTimeout(fetchDashboardData, 300);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-900" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          System Overview
        </h1>
        <p className="text-muted-foreground text-sm">
          Real-time portal analytics and management.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Active Staff Card */}
        <motion.div
          variants={itemVariants}
          className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between hover:border-blue-500/50 transition-colors">
          <div className="flex justify-between items-start">
            <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">
              Active Staff
            </span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-3xl font-black text-foreground mt-4">
            {stats.activeStaff}
          </span>
        </motion.div>

        {/* Total Students Card */}
        <motion.div
          variants={itemVariants}
          className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between hover:border-blue-500/50 transition-colors">
          <div className="flex justify-between items-start">
            <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">
              Total Students
            </span>
            <UserCheck className="w-4 h-4 text-green-600" />
          </div>
          <span className="text-3xl font-black text-foreground mt-4">
            {stats.totalStudents.toLocaleString()}
          </span>
        </motion.div>

        {/* Course Regs Card */}
        <motion.div
          variants={itemVariants}
          className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between hover:border-blue-500/50 transition-colors">
          <div className="flex justify-between items-start">
            <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">
              Enrollments
            </span>
            <BookOpen className="w-4 h-4 text-amber-600" />
          </div>
          <span className="text-3xl font-black text-foreground mt-4">
            {stats.courseRegistrations}
          </span>
        </motion.div>

        {/* Total Revenue Card */}
        <motion.div
          variants={itemVariants}
          className="bg-blue-900 text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between relative overflow-hidden">
          <TrendingUp className="absolute -right-2 -bottom-2 w-24 h-24 text-white/10" />
          <div className="flex justify-between items-start relative z-10">
            <span className="text-xs font-black text-white/60 uppercase tracking-widest">
              Total Revenue
            </span>
            <CreditCard className="w-4 h-4 text-white/60" />
          </div>
          <span className="text-2xl font-black relative z-10 mt-4">
            ₦{(stats.monthlyRevenue / 1000000).toFixed(2)}M
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        className="pt-4">
        <h2 className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-6">
          Management Controls
        </h2>
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/dashboard/admin/staff"
            className="group flex flex-col items-center justify-center gap-3 bg-card border border-border p-6 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:border-blue-500/50 transition-all">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-700 dark:text-blue-400 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <span className="font-bold text-sm">Staff Directory</span>
          </Link>

          <Link
            href="/dashboard/admin/finances"
            className="group flex flex-col items-center justify-center gap-3 bg-card border border-border p-6 rounded-2xl hover:bg-green-50 dark:hover:bg-green-900/10 hover:border-green-500/50 transition-all">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl text-green-700 dark:text-green-400 group-hover:scale-110 transition-transform">
              <CreditCard className="w-6 h-6" />
            </div>
            <span className="font-bold text-sm">Fee Management</span>
          </Link>

          <Link
            href="/dashboard/admin/courses"
            className="group flex flex-col items-center justify-center gap-3 bg-card border border-border p-6 rounded-2xl hover:bg-amber-50 dark:hover:bg-amber-900/10 hover:border-amber-500/50 transition-all">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl text-amber-700 dark:text-amber-400 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="font-bold text-sm">Curriculum</span>
          </Link>

          <Link
            href="/dashboard/admin/finances"
            className="group flex flex-col items-center justify-center gap-3 bg-card border border-border p-6 rounded-2xl hover:bg-purple-50 dark:hover:bg-purple-900/10 hover:border-purple-500/50 transition-all">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl text-purple-700 dark:text-purple-400 group-hover:scale-110 transition-transform">
              <PieChart className="w-6 h-6" />
            </div>
            <span className="font-bold text-sm">Audit Reports</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
