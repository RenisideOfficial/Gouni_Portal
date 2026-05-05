// src/app/(root)/dashboard/admin/staff/page.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { Plus, MoreVertical, BookOpen, Wallet } from "lucide-react";

export default function StaffManagementPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Staff Management</h1>
        <button className="flex items-center gap-2 bg-blue-900 dark:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Add Staff
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="flex border-b border-border">
          <button className="px-6 py-4 text-sm font-medium text-blue-700 dark:text-blue-400 border-b-2 border-blue-700 dark:border-blue-400">
            All Staff
          </button>
          <button className="px-6 py-4 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Course Assignments
          </button>
          <button className="px-6 py-4 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Payroll Setup
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
              <tr>
                <th className="px-6 py-4 font-medium">Staff ID</th>
                <th className="px-6 py-4 font-medium">Name & Role</th>
                <th className="px-6 py-4 font-medium">Department</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-center">Manage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                {
                  id: "GOU/STAFF/045",
                  name: "Dr. Emeka Obi",
                  role: "Lecturer",
                  dept: "Computer Science",
                  status: "Active",
                },
                {
                  id: "GOU/STAFF/012",
                  name: "Prof. Sarah Johnson",
                  role: "HOD",
                  dept: "Nursing",
                  status: "Active",
                },
                {
                  id: "GOU/STAFF/088",
                  name: "Mr. Kunle Ade",
                  role: "Lecturer",
                  dept: "Software Engineering",
                  status: "On Leave",
                },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">
                    {item.id}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.role}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {item.dept}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${item.status === "Active" ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button
                      title="Assign Course"
                      className="p-1.5 text-muted-foreground hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">
                      <BookOpen className="w-4 h-4" />
                    </button>
                    <button
                      title="Payment Details"
                      className="p-1.5 text-muted-foreground hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md transition-colors">
                      <Wallet className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors">
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
