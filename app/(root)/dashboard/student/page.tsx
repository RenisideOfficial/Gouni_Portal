"use client";
import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import {
  CreditCard,
  BookOpen,
  FileText,
  Building,
  Loader2,
  CheckCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { feeStructure } from "@/lib/constants/finance_data";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Safe number parser
const parseAmount = (val: any) =>
  Number(String(val).replace(/[^0-9.-]+/g, "")) || 0;

export default function StudentDashboardHome() {
  const [isLoading, setIsLoading] = useState(true);
  const [firstName, setFirstName] = useState("Student");

  const [stats, setStats] = useState({
    outstanding: 0,
    carryovers: 0,
    cgpa: "0.00",
  });

  const [recentPayments, setRecentPayments] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboardData = () => {
      const currentUser = JSON.parse(
        localStorage.getItem("gouni_current_user") || "{}",
      );
      const allPayments = JSON.parse(
        localStorage.getItem("gouni_payments") || "[]",
      );
      const allRegs = JSON.parse(
        localStorage.getItem("gouni_registrations") || "[]",
      );
      const allResults = JSON.parse(
        localStorage.getItem("gouni_results") || "{}",
      );

      if (currentUser && currentUser.name) {
        setFirstName(currentUser.name.split(" ")[0]);
      }

      const studentId = currentUser.regNumber || currentUser.id;
      const studentProg = currentUser.prog || "Default"; // Fallback if prog isn't set
      const currentSession = "2025/2026";

      // 1. Calculate Outstanding Payments
      // FIX: Dynamically access the tuition fee based on the student's program
      const tuitionDictionary = feeStructure.tuition as Record<string, number>;
      const rawTuition =
        tuitionDictionary[studentProg] || tuitionDictionary["Default"] || 0;

      const tuition = parseAmount(rawTuition);
      const others = (feeStructure?.otherFees || []).reduce(
        (acc: number, curr: any) => acc + parseAmount(curr.amount),
        0,
      );
      const totalRequiredFees = tuition + others;

      const myPaymentsThisSession = allPayments.filter(
        (p: any) =>
          p.studentId === studentId &&
          p.session === currentSession &&
          p.status === "Paid",
      );

      const totalPaid = myPaymentsThisSession.reduce(
        (acc: number, curr: any) => acc + parseAmount(curr.amount),
        0,
      );
      const outstanding = Math.max(0, totalRequiredFees - totalPaid);

      // 2. Fetch Recent Payment History (Top 5)
      const myAllPayments = allPayments
        .filter((p: any) => p.studentId === studentId)
        .reverse()
        .slice(0, 5);
      setRecentPayments(myAllPayments);

      // 3. Calculate CGPA & Carryovers
      const myRegs = allRegs.filter((r: any) => r.studentId === studentId);

      let totalUnits = 0;
      let totalQualityPoints = 0;
      let carryoverCount = 0;

      myRegs.forEach((reg: any) => {
        reg.courses?.forEach((course: any) => {
          const result = allResults[course.code]?.[studentId];
          if (result) {
            const ca = Number(result.ca) || 0;
            const exam = Number(result.exam) || 0;
            const total = ca + exam;

            let points = 0;
            if (total >= 70) points = 5;
            else if (total >= 60) points = 4;
            else if (total >= 50) points = 3;
            else if (total >= 45) points = 2;
            else if (total >= 40) points = 1;
            else {
              points = 0;
              carryoverCount++;
            }

            totalUnits += course.units;
            totalQualityPoints += points * course.units;
          }
        });
      });

      const cgpa =
        totalUnits > 0 ? (totalQualityPoints / totalUnits).toFixed(2) : "0.00";

      setStats({
        outstanding,
        carryovers: carryoverCount,
        cgpa,
      });

      setIsLoading(false);
    };

    const timer = setTimeout(fetchDashboardData, 300);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-blue-900 w-8 h-8" />
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 px-4 sm:px-0">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Welcome, {firstName} 👋
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Here is your academic and financial summary.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <motion.div
          variants={itemVariants}
          className="bg-card p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30 shadow-sm flex flex-col justify-between h-32 hover:border-blue-500/50 transition-colors">
          <span className="text-xs font-black uppercase tracking-widest text-blue-700 dark:text-blue-400">
            Outstanding Payments
          </span>
          <span className="text-3xl font-black text-foreground self-end">
            ₦{stats.outstanding.toLocaleString()}
          </span>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between h-32 hover:border-amber-500/50 transition-colors">
          <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">
            Carryovers
          </span>
          <span
            className={`text-3xl font-black self-end ${stats.carryovers > 0 ? "text-amber-600 dark:text-amber-400" : "text-foreground"}`}>
            {stats.carryovers}
          </span>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between h-32 hover:border-green-500/50 transition-colors">
          <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">
            Current CGPA
          </span>
          <span className="text-3xl font-black text-foreground self-end">
            {stats.cgpa}
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        className="pt-4">
        <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/dashboard/student/payments"
            className="flex flex-col items-center justify-center gap-3 bg-blue-900 text-white p-5 rounded-2xl font-bold text-sm hover:bg-blue-800 transition-all shadow-md hover:-translate-y-1">
            <CreditCard className="w-6 h-6" /> Pay Fees
          </Link>
          <Link
            href="/dashboard/student/course-reg"
            className="flex flex-col items-center justify-center gap-3 bg-blue-900 text-white p-5 rounded-2xl font-bold text-sm hover:bg-blue-800 transition-all shadow-md hover:-translate-y-1">
            <BookOpen className="w-6 h-6" /> Register Courses
          </Link>
          <Link
            href="/dashboard/student/result"
            className="flex flex-col items-center justify-center gap-3 bg-blue-900 text-white p-5 rounded-2xl font-bold text-sm hover:bg-blue-800 transition-all shadow-md hover:-translate-y-1">
            <FileText className="w-6 h-6" /> View Results
          </Link>
          <Link
            href="/dashboard/student/hostel"
            className="flex flex-col items-center justify-center gap-3 bg-blue-900 text-white p-5 rounded-2xl font-bold text-sm hover:bg-blue-800 transition-all shadow-md hover:-translate-y-1">
            <Building className="w-6 h-6" /> Book Hostel
          </Link>
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border bg-muted/20 flex items-center justify-between">
          <h2 className="text-sm font-black uppercase tracking-widest text-foreground">
            Payment History
          </h2>
          <Link
            href="/dashboard/student/payments"
            className="text-xs bg-blue-900 dark:bg-blue-700 text-white px-5 py-2 rounded-xl font-bold hover:bg-blue-800 transition-all shadow-sm">
            Generate Invoice
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] text-muted-foreground uppercase bg-muted/50 font-black tracking-widest">
              <tr>
                <th className="px-6 py-4">Reference No.</th>
                <th className="px-6 py-4">Fee Category</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentPayments.length > 0 ? (
                recentPayments.map((item, i) => (
                  <tr key={i} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-blue-600">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 font-bold text-foreground">
                      {item.type}
                    </td>
                    <td className="px-6 py-4 font-black text-foreground">
                      ₦{Number(item.amount).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground text-xs font-medium">
                      {item.date}
                    </td>
                    <td className="px-6 py-4">
                      {item.status === "Paid" ? (
                        <span className="flex items-center gap-1 w-fit bg-green-50 text-green-700 border border-green-200 text-[10px] font-black uppercase px-3 py-1 rounded-full">
                          <CheckCircle size={12} /> Paid
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 w-fit bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-black uppercase px-3 py-1 rounded-full">
                          <Clock size={12} /> Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-muted-foreground">
                    <p className="font-bold text-foreground mb-1">
                      No payments recorded
                    </p>
                    <p className="text-xs">
                      Your payment history will appear here once you generate an
                      invoice.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
