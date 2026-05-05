// src/app/(root)/dashboard/student/hostel/page.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { MoreVertical } from "lucide-react";

export default function HostelPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Hostel</h1>
      </motion.div>

      {/* Booking Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm">
        <h2 className="text-sm font-bold text-foreground mb-4">
          Book Accommodation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          {[
            { label: "Semester", options: ["1st Semester", "2nd Semester"] },
            { label: "Hostels", options: ["Unity Hostel", "Faith Hostel"] },
            { label: "Block", options: ["Block A", "Block B"] },
            { label: "Room", options: ["Room 101", "Room 102"] },
            { label: "Bunk", options: ["Top Bunk", "Bottom Bunk"] },
          ].map((field, idx) => (
            <div key={idx} className="w-full">
              <select className="w-full bg-background border border-input text-muted-foreground px-4 py-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-900/50 transition-all">
                <option value="" disabled selected hidden>
                  {field.label}
                </option>
                {field.options.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>
          ))}
          <div className="md:col-span-5 flex justify-end mt-2">
            <button className="w-full md:w-32 bg-blue-900 dark:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-800 transition-colors shadow-sm">
              Book
            </button>
          </div>
        </div>
      </motion.div>

      {/* History Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground">Hostel history</h2>
          <select className="bg-background border border-input text-foreground px-4 py-1.5 rounded-md text-sm outline-none focus:border-blue-500 transition-colors">
            <option>Session</option>
            <option>2025/2026</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
              <tr>
                <th className="px-6 py-4 font-medium">Hostel Name</th>
                <th className="px-6 py-4 font-medium">Block Name</th>
                <th className="px-6 py-4 font-medium">Session</th>
                <th className="px-6 py-4 font-medium">Semester</th>
                <th className="px-6 py-4 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-medium text-foreground">
                  UNITY HOSTEL
                </td>
                <td className="px-6 py-4 text-muted-foreground">Block A</td>
                <td className="px-6 py-4 text-muted-foreground">2025/2026</td>
                <td className="px-6 py-4 text-muted-foreground">
                  1st Semester
                </td>
                <td className="px-6 py-4 flex justify-center">
                  <button className="text-muted-foreground hover:text-blue-700 transition-colors p-1 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
