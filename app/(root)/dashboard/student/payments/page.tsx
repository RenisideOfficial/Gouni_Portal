// src/app/(root)/dashboard/student/payments/page.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { MoreVertical, Download } from "lucide-react";

export default function PaymentsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Payments</h1>
        <select className="bg-card border border-border text-foreground px-4 py-2 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors">
          <option>All</option>
          <option>Paid</option>
          <option>Pending</option>
        </select>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground">Payment history</h2>
          <button className="text-xs bg-blue-900 dark:bg-blue-700 text-white px-5 py-2.5 rounded-full font-medium hover:bg-blue-800 transition-colors flex items-center gap-2">
            <Download className="w-3 h-3" /> Generate Invoice
          </button>
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
