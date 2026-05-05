// src/app/(root)/dashboard/admin/courses/page.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { Plus, Search, BookOpen, User } from "lucide-react";

export default function AdminCoursesPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">
          University Courses
        </h1>
        <button className="flex items-center gap-2 bg-blue-900 dark:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Add New Course
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="flex bg-background border border-input px-4 py-2 rounded-lg text-sm focus-within:border-blue-500 transition-colors w-full md:w-64">
            <Search className="w-4 h-4 text-muted-foreground mr-2 mt-0.5" />
            <input
              type="text"
              placeholder="Search course code..."
              className="bg-transparent outline-none w-full"
            />
          </div>
          <select className="bg-background border border-input text-foreground px-4 py-2 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors">
            <option>All Departments</option>
            <option>Computer Science</option>
            <option>Nursing</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
              <tr>
                <th className="px-6 py-4 font-medium">Course Code</th>
                <th className="px-6 py-4 font-medium">Course Title</th>
                <th className="px-6 py-4 font-medium">Units</th>
                <th className="px-6 py-4 font-medium">Assigned Lecturer</th>
                <th className="px-6 py-4 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                {
                  code: "CSC 401",
                  title: "Data Structures & Algorithms",
                  units: "3",
                  lecturer: "Dr. Emeka Obi",
                },
                {
                  code: "CSC 405",
                  title: "Artificial Intelligence",
                  units: "3",
                  lecturer: "Dr. Emeka Obi",
                },
                {
                  code: "ENG 201",
                  title: "Engineering Math I",
                  units: "2",
                  lecturer: "Unassigned",
                },
                {
                  code: "GST 101",
                  title: "Use of English",
                  units: "2",
                  lecturer: "Prof. Sarah Johnson",
                },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-muted-foreground" />{" "}
                    {item.code}
                  </td>
                  <td className="px-6 py-4 text-foreground">{item.title}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {item.units} Units
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full w-fit ${item.lecturer === "Unassigned" ? "bg-red-50 text-red-600 dark:bg-red-900/20" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"}`}>
                      <User className="w-3 h-3" /> {item.lecturer}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-xs px-3 py-1 bg-muted rounded">
                      Manage
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
