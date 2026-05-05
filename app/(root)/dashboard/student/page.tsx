// src/app/(root)/dashboard/student/page.tsx
"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import {
  CreditCard,
  BookOpen,
  FileText,
  Building,
  MoreVertical,
} from "lucide-react";
import Link from "next/link";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function StudentDashboardHome() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Welcome Ngozi 👋
        </h1>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          variants={itemVariants}
          className="bg-card p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30 shadow-sm flex flex-col justify-between h-32">
          <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
            Outstanding Payments
          </span>
          <span className="text-3xl font-bold text-foreground self-end">
            ₦300,000
          </span>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between h-32">
          <span className="text-sm font-medium text-muted-foreground">
            Carryovers
          </span>
          <span className="text-3xl font-bold text-foreground self-end">2</span>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between h-32">
          <span className="text-sm font-medium text-muted-foreground">
            Current CGPA
          </span>
          <span className="text-3xl font-bold text-foreground self-end">
            3.89
          </span>
        </motion.div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants} initial="hidden" animate="show">
        <h2 className="text-sm font-bold text-foreground mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/dashboard/student/payments"
            className="flex items-center justify-center gap-2 bg-blue-900 dark:bg-blue-700 text-white p-3.5 rounded-xl font-medium hover:bg-blue-800 transition-colors shadow-sm">
            <CreditCard className="w-4 h-4" /> Pay Fees
          </Link>
          <Link
            href="/dashboard/student/course-reg"
            className="flex items-center justify-center gap-2 bg-blue-900 dark:bg-blue-700 text-white p-3.5 rounded-xl font-medium hover:bg-blue-800 transition-colors shadow-sm">
            <BookOpen className="w-4 h-4" /> Register Courses
          </Link>
          <Link
            href="/dashboard/student/result"
            className="flex items-center justify-center gap-2 bg-blue-900 dark:bg-blue-700 text-white p-3.5 rounded-xl font-medium hover:bg-blue-800 transition-colors shadow-sm">
            <FileText className="w-4 h-4" /> View Results
          </Link>
          <Link
            href="/dashboard/student/hostel"
            className="flex items-center justify-center gap-2 bg-blue-900 dark:bg-blue-700 text-white p-3.5 rounded-xl font-medium hover:bg-blue-800 transition-colors shadow-sm">
            <Building className="w-4 h-4" /> Book Hostel
          </Link>
        </div>
      </motion.div>

      {/* Payment History Snippet */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground">Payment history</h2>
          <Link
            href="/dashboard/student/payments"
            className="text-xs bg-blue-900 dark:bg-blue-700 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-800 transition-colors">
            Generate Invoice
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
              <tr>
                <th className="px-6 py-4 font-medium">Invoice No.</th>
                <th className="px-6 py-4 font-medium">Fee</th>
                <th className="px-6 py-4 font-medium">Semester</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                {
                  id: "GOU250000648867",
                  type: "Tuition Fee",
                  sem: "1st Semester",
                  date: "15th Nov 2025",
                },
                {
                  id: "GOU250000648868",
                  type: "OTHER FEES",
                  sem: "1st Semester",
                  date: "15th Nov 2025",
                },
                {
                  id: "GOU250000648867",
                  type: "PROJECT LEVY",
                  sem: "1st Semester",
                  date: "16th Nov 2025",
                },
                {
                  id: "GOU250000648867",
                  type: "ICT/Online Registration",
                  sem: "1st Semester",
                  date: "15th Nov 2025",
                },
                {
                  id: "GOU250000648867",
                  type: "Parents' forum",
                  sem: "1st Semester",
                  date: "15th Nov 2025",
                },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {item.type}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {item.sem}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 flex justify-center">
                    <button className="text-muted-foreground hover:text-blue-700 transition-colors p-1 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
