// src/app/(root)/dashboard/admin/finances/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, TrendingUp, DollarSign, Activity } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminFinancesPage() {
  const [allPayments, setAllPayments] = useState<any[]>([]);
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    tuitionRevenue: 0,
    otherRevenue: 0,
  });
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchPayments = () => {
      // 1. Fetch RAW data directly from LocalStorage
      const rawPayments = JSON.parse(
        localStorage.getItem("gouni_payments") || "[]",
      );

      // 2. Filter ONLY for successful payments (Removed the Admin/Staff name block)
      const successfulPayments = rawPayments.filter(
        (p: any) => p.status === "Paid",
      );

      // 3. Sort by timestamp (newest first)
      const sorted = successfulPayments.sort(
        (a: any, b: any) => b.timestamp - a.timestamp,
      );
      setAllPayments(sorted);

      // 4. Calculate Metrics accurately based on real data
      let total = 0,
        tuition = 0,
        other = 0;
      const typeMap: Record<string, number> = {};

      sorted.forEach((p: any) => {
        const amt = Number(p.amount) || 0;
        total += amt;

        if (p.type === "Tuition Fee") {
          tuition += amt;
        } else {
          other += amt;
        }

        // Group for chart (Shorten names for clean X-Axis labels)
        let shortName = p.type || "Other";
        if (shortName.includes("Tuition")) shortName = "Tuition";
        if (shortName.includes("ICT") || shortName.includes("Online"))
          shortName = "ICT";
        if (shortName.includes("Acceptance")) shortName = "Acceptance";
        if (shortName.includes("Library")) shortName = "Library";

        typeMap[shortName] = (typeMap[shortName] || 0) + amt;
      });

      setMetrics({
        totalRevenue: total,
        tuitionRevenue: tuition,
        otherRevenue: other,
      });

      // 5. Format for Recharts
      const cData = Object.keys(typeMap)
        .map((key) => ({
          name: key,
          amount: typeMap[key],
        }))
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 6);

      // Default empty state chart if no data exists
      setChartData(
        cData.length > 0
          ? cData
          : [
              { name: "Tuition", amount: 0 },
              { name: "ICT", amount: 0 },
              { name: "Acceptance", amount: 0 },
            ],
      );
    };

    fetchPayments();

    // Auto-update if payment happens in another tab
    window.addEventListener("storage", fetchPayments);
    return () => window.removeEventListener("storage", fetchPayments);
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-foreground">Financial Ledger</h1>
        <button className="flex items-center gap-2 bg-blue-900 dark:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors shadow-sm w-full sm:w-auto justify-center">
          <Download className="w-4 h-4" /> Export Report
        </button>
      </motion.div>

      {/* Financial Overview Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="text-sm font-medium text-muted-foreground">
              Total Revenue Collected
            </span>
            <div className="p-2 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-lg">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-foreground relative z-10">
            ₦{(metrics.totalRevenue / 1000000).toFixed(2)}M
          </h3>
          <p className="text-xs text-green-600 flex items-center gap-1 mt-2 relative z-10">
            <TrendingUp className="w-3 h-3" /> Real-time aggregate
          </p>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-medium text-muted-foreground">
              Tuition Fees
            </span>
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-foreground">
            ₦{(metrics.tuitionRevenue / 1000000).toFixed(2)}M
          </h3>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-medium text-muted-foreground">
              Other Fees (ICT, Acceptance, etc)
            </span>
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-lg">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-foreground">
            ₦{(metrics.otherRevenue / 1000000).toFixed(2)}M
          </h3>
        </div>
      </motion.div>

      {/* Chart Section using Recharts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card p-6 rounded-2xl border border-border shadow-sm">
        <h2 className="text-sm font-bold text-foreground mb-6">
          Revenue by Category
        </h2>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
                tickFormatter={(value) => `₦${value / 1000}k`}
              />
              <Tooltip
                cursor={{ fill: "transparent" }}
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                formatter={(value: any) => [
                  `₦${Number(value).toLocaleString()}`,
                  "Revenue",
                ]}
              />
              <Bar
                dataKey="amount"
                fill="#1e3a8a"
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Unified Ledger Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground">
            Recent Transactions Ledger
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
              <tr>
                <th className="px-6 py-4 font-medium">Invoice ID</th>
                <th className="px-6 py-4 font-medium">Student Info</th>
                <th className="px-6 py-4 font-medium">Fee Category</th>
                <th className="px-6 py-4 font-medium">Amount & Bank</th>
                <th className="px-6 py-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <AnimatePresence>
                {allPayments.length > 0 ? (
                  allPayments.map((item, i) => (
                    <motion.tr
                      key={item.id || i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-foreground">
                        {item.id}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-foreground">
                          {item.studentName || "Unknown"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.studentId} • {item.level || "N/A"}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        <span className="font-medium text-foreground">
                          {item.type}
                        </span>
                        <p className="text-[10px] uppercase mt-0.5">
                          {item.session} - {item.semester}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-foreground">
                          ₦{Number(item.amount).toLocaleString()}
                        </span>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.bank}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground text-xs">
                        {item.date}
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center">
                      <div className="text-muted-foreground mb-2">
                        No transactions recorded yet.
                      </div>
                      <p className="text-xs text-muted-foreground/70">
                        When students make payments, they will appear here
                        instantly.
                      </p>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
