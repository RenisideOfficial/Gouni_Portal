// src/app/(root)/dashboard/admin/students/page.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  MoreVertical,
  ShieldAlert,
  Edit,
  UserCheck,
  UserX,
} from "lucide-react";

export default function AdminStudentsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">
          Student Management
        </h1>
        <div className="flex bg-background border border-input px-4 py-2 rounded-lg text-sm focus-within:border-blue-500 transition-colors w-64">
          <Search className="w-4 h-4 text-muted-foreground mr-2 mt-0.5" />
          <input
            type="text"
            placeholder="Search by name or Reg No..."
            className="bg-transparent outline-none w-full"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground">
            Enrolled Students
          </h2>
          <div className="flex gap-2">
            <select className="bg-background border border-input text-foreground px-3 py-1.5 rounded-md text-sm outline-none focus:border-blue-500 transition-colors">
              <option>All Levels</option>
              <option>100 Level</option>
              <option>400 Level</option>
            </select>
            <select className="bg-background border border-input text-foreground px-3 py-1.5 rounded-md text-sm outline-none focus:border-blue-500 transition-colors">
              <option>All Status</option>
              <option>Active</option>
              <option>Suspended</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
              <tr>
                <th className="px-6 py-4 font-medium">Reg Number</th>
                <th className="px-6 py-4 font-medium">Full Name</th>
                <th className="px-6 py-4 font-medium">Program & Level</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-center">Manage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                {
                  reg: "GOU/U22/CSC/858",
                  name: "Ngozi Chukwumaobim",
                  prog: "Computer Science",
                  level: "400L",
                  status: "Active",
                },
                {
                  reg: "GOU/U23/NUR/112",
                  name: "David Adeleke",
                  prog: "Nursing",
                  level: "300L",
                  status: "Active",
                },
                {
                  reg: "GOU/U24/ENG/045",
                  name: "Samuel Nnana",
                  prog: "Software Eng.",
                  level: "200L",
                  status: "Suspended",
                },
                {
                  reg: "GOU/U21/LAW/004",
                  name: "Fatima Yusuf",
                  prog: "Law",
                  level: "500L",
                  status: "Active",
                },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">
                    {item.reg}
                  </td>
                  <td className="px-6 py-4 font-medium text-foreground">
                    {item.name}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-foreground">{item.prog}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.level}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`flex items-center gap-1.5 w-fit text-xs font-medium px-3 py-1 rounded-full ${item.status === "Active" ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>
                      {item.status === "Active" ? (
                        <UserCheck className="w-3.5 h-3.5" />
                      ) : (
                        <UserX className="w-3.5 h-3.5" />
                      )}
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button
                      title="Edit Details / Reg No"
                      className="p-1.5 text-muted-foreground hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      title={
                        item.status === "Active"
                          ? "Suspend Student"
                          : "Activate Student"
                      }
                      className={`p-1.5 text-muted-foreground rounded-md transition-colors ${item.status === "Active" ? "hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20" : "hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"}`}>
                      <ShieldAlert className="w-4 h-4" />
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
