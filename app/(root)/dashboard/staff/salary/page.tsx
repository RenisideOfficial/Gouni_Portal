"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Wallet, Landmark, CreditCard, Loader2 } from "lucide-react";

export default function SalaryPage() {
  const [userPayroll, setUserPayroll] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState("2026");

  useEffect(() => {
    const loadPayrollData = () => {
      // 1. Get the current logged-in staff session
      const currentUser = JSON.parse(
        localStorage.getItem("gouni_current_user") || "{}",
      );

      if (currentUser && currentUser.payroll) {
        setUserPayroll(currentUser.payroll);
      }
      setIsLoading(false);
    };

    const timer = setTimeout(loadPayrollData, 500);
    return () => clearTimeout(timer);
  }, []);

  const baseSalary = userPayroll ? Number(userPayroll.baseSalary) : 0;

  // Mocking the months for the selected year
  const months = [
    { month: `April ${selectedYear}`, status: "Pending" },
    { month: `March ${selectedYear}`, status: "Paid" },
    { month: `February ${selectedYear}`, status: "Paid" },
    { month: `January ${selectedYear}`, status: "Paid" },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-blue-900" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Wallet className="text-blue-600" size={24} /> Salary & Allowances
        </h1>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="bg-card border border-border text-foreground px-4 py-2 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold">
          <option>2026</option>
          <option>2025</option>
        </select>
      </motion.div>

      {/* --- PAYROLL INFO CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-blue-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-white/60 text-xs font-black uppercase tracking-widest mb-1">
              Monthly Base Salary
            </p>
            <h2 className="text-3xl font-black">
              ₦ {baseSalary.toLocaleString()}
            </h2>
          </div>
          <CreditCard className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10 rotate-12" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600">
              <Landmark size={20} />
            </div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Designated Bank
            </p>
          </div>
          <p className="text-lg font-black text-foreground uppercase">
            {userPayroll?.bankName || "Not Configured"}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600">
              <CreditCard size={20} />
            </div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Account Number
            </p>
          </div>
          <p className="text-lg font-mono font-black text-foreground tracking-tighter">
            {userPayroll?.accountNumber || "XXXXXXXXXX"}
          </p>
        </motion.div>
      </div>

      {/* --- PAYMENT HISTORY TABLE --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border bg-muted/20">
          <h2 className="text-sm font-black text-foreground uppercase tracking-widest">
            Payment Ledger
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] text-muted-foreground uppercase bg-muted/50 font-black tracking-widest">
              <tr>
                <th className="px-6 py-4">Month</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Net Amount</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {months.map((item, i) => (
                <tr key={i} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-5 font-bold text-foreground">
                    {item.month}
                  </td>
                  <td className="px-6 py-5 text-muted-foreground text-xs font-medium">
                    Monthly Remittance ({userPayroll?.bankName})
                  </td>
                  <td className="px-6 py-5 text-foreground font-black text-md">
                    ₦ {baseSalary.toLocaleString()}
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${
                        item.status === "Paid"
                          ? "bg-green-50 text-green-700 border-green-100 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/30 dark:text-amber-400"
                      }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {!userPayroll && (
        <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 p-4 rounded-2xl flex items-center gap-3">
          <p className="text-sm font-bold text-red-600">
            Note: Your payroll profile has not been fully configured by the
            Administrator. Please contact the Bursary department.
          </p>
        </div>
      )}
    </div>
  );
}
