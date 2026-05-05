// src/app/(root)/dashboard/staff/salary/page.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

export default function SalaryPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">
          Salary & Allowances
        </h1>
        <select className="bg-card border border-border text-foreground px-4 py-2 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors">
          <option>2026</option>
          <option>2025</option>
        </select>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground">Payment History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
              <tr>
                <th className="px-6 py-4 font-medium">Month</th>
                <th className="px-6 py-4 font-medium">Description</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-center">Payslip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                {
                  month: "March 2026",
                  desc: "Basic Salary + Allowances",
                  amount: "₦450,000",
                  status: "Paid",
                },
                {
                  month: "February 2026",
                  desc: "Basic Salary + Allowances",
                  amount: "₦450,000",
                  status: "Paid",
                },
                {
                  month: "January 2026",
                  desc: "Basic Salary + Allowances",
                  amount: "₦450,000",
                  status: "Paid",
                },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">
                    {item.month}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {item.desc}
                  </td>
                  <td className="px-6 py-4 text-foreground font-semibold">
                    {item.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-full">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-center">
                    <button className="text-blue-700 dark:text-blue-400 hover:text-blue-900 transition-colors p-1 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20">
                      <Download className="w-5 h-5" />
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
