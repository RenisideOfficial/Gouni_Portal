// src/app/(root)/dashboard/admin/finances/page.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
} from "lucide-react";

export default function AdminFinancesPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Finances & Fees</h1>
        <button className="flex items-center gap-2 bg-blue-900 dark:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors shadow-sm">
          <Download className="w-4 h-4" /> Export Report
        </button>
      </motion.div>

      {/* Financial Overview Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-medium text-muted-foreground">
              Total Revenue (YTD)
            </span>
            <div className="p-2 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-lg">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-foreground">₦450.2M</h3>
          <p className="text-xs text-green-600 flex items-center gap-1 mt-2">
            <TrendingUp className="w-3 h-3" /> +12% from last year
          </p>
        </div>
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-medium text-muted-foreground">
              Pending Payments
            </span>
            <div className="p-2 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-lg">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-foreground">₦28.5M</h3>
          <p className="text-xs text-amber-600 flex items-center gap-1 mt-2">
            <TrendingDown className="w-3 h-3" /> 150 students owing
          </p>
        </div>
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-medium text-muted-foreground">
              Clearance Fees
            </span>
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-foreground">₦12.1M</h3>
          <p className="text-xs text-blue-600 flex items-center gap-1 mt-2">
            <TrendingUp className="w-3 h-3" /> +5% this semester
          </p>
        </div>
      </motion.div>

      {/* Fee Structure Setup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground">
            School Fee Structure Config
          </h2>
          <button className="text-xs font-medium text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" /> Add Fee Category
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
              <tr>
                <th className="px-6 py-4 font-medium">Program / Faculty</th>
                <th className="px-6 py-4 font-medium">Level</th>
                <th className="px-6 py-4 font-medium">Fee Category</th>
                <th className="px-6 py-4 font-medium">Amount (₦)</th>
                <th className="px-6 py-4 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                {
                  prog: "Computer Science",
                  level: "100L",
                  cat: "Tuition Fee",
                  amt: "450,000",
                },
                {
                  prog: "All Programs",
                  level: "All",
                  cat: "ICT / Online Reg",
                  amt: "15,000",
                },
                {
                  prog: "Nursing",
                  level: "200L - 400L",
                  cat: "Clinical Levy",
                  amt: "50,000",
                },
                {
                  prog: "All Programs",
                  level: "400L",
                  cat: "Project Fee",
                  amt: "30,000",
                },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">
                    {item.prog}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {item.level}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {item.cat}
                  </td>
                  <td className="px-6 py-4 font-semibold text-foreground">
                    {item.amt}
                  </td>
                  <td className="px-6 py-4 flex justify-center">
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-xs px-3 py-1 bg-muted rounded">
                      Edit
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
