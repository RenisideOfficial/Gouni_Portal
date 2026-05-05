// src/app/(root)/dashboard/staff/students/page.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

export default function StudentsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">
          Registered Students
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <select className="bg-background border border-input text-foreground px-4 py-2 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors w-full md:w-auto">
            <option>CSC 401 - Data Structures</option>
            <option>CSC 405 - Artificial Intelligence</option>
          </select>
          <button className="text-xs bg-muted text-foreground px-5 py-2.5 rounded-full font-medium hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors flex items-center gap-2">
            <Download className="w-3 h-3" /> Export CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
              <tr>
                <th className="px-6 py-4 font-medium">S/N</th>
                <th className="px-6 py-4 font-medium">Matric Number</th>
                <th className="px-6 py-4 font-medium">Full Name</th>
                <th className="px-6 py-4 font-medium">Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                {
                  mat: "GOU/U22/CSC/001",
                  name: "Chisom Okafor",
                  level: "400L",
                },
                {
                  mat: "GOU/U22/CSC/002",
                  name: "David Adeleke",
                  level: "400L",
                },
                { mat: "GOU/U22/CSC/003", name: "Fatima Yusuf", level: "400L" },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 text-muted-foreground">{i + 1}</td>
                  <td className="px-6 py-4 font-medium text-foreground">
                    {item.mat}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {item.level}
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
