"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Lock, CheckCircle, FileText, Printer } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ClearancePage() {
  const router = useRouter();
  const [session, setSession] = useState("2025/2026");
  const [semester, setSemester] = useState("1st Semester");

  const [isProcessing, setIsProcessing] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const [isCleared, setIsCleared] = useState(false);
  const [missingFees, setMissingFees] = useState<string[]>([]);

  const handleGenerate = () => {
    setIsProcessing(true);
    setHasChecked(false);

    setTimeout(() => {
      const storedUser = JSON.parse(
        localStorage.getItem("gouni_current_user") || "{}",
      );
      const requiredFees = JSON.parse(
        localStorage.getItem("gouni_registration_requirements") ||
          '["Tuition Fee"]',
      );
      const allPayments = JSON.parse(
        localStorage.getItem("gouni_payments") || "[]",
      );

      const studentId = storedUser.regNumber || storedUser.id;
      const myPaidFees = allPayments
        .filter(
          (p: any) =>
            p.studentId === studentId &&
            p.session === session &&
            p.status === "Paid",
        )
        .map((p: any) => p.type);

      const missing = requiredFees.filter(
        (fee: string) => !myPaidFees.includes(fee),
      );

      setMissingFees(missing);
      setIsCleared(missing.length === 0);
      setIsProcessing(false);
      setHasChecked(true);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 px-4 sm:px-0">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <FileText className="text-pink-600" /> Exam Clearance
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Generate your official clearance slip required for examinations.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card p-6 rounded-3xl border border-border shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <select
            value={session}
            onChange={(e) => setSession(e.target.value)}
            className="w-full md:flex-1 bg-background border border-input text-foreground font-bold px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-pink-900 transition-all">
            <option>2025/2026</option>
            <option>2024/2025</option>
          </select>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full md:flex-1 bg-background border border-input text-foreground font-bold px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-pink-900 transition-all">
            <option>1st Semester</option>
            <option>2nd Semester</option>
          </select>
          <button
            onClick={handleGenerate}
            disabled={isProcessing}
            className="w-full md:w-auto bg-pink-700 text-white px-10 py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-pink-800 transition-colors shadow-lg disabled:opacity-50 flex items-center justify-center gap-2">
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Verifying
              </>
            ) : (
              "Generate Clearance"
            )}
          </button>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {hasChecked && (
          <motion.div
            key={isCleared ? "cleared" : "locked"}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="pt-4">
            {!isCleared ? (
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-3xl p-12 text-center shadow-sm">
                <Lock className="w-16 h-16 text-red-600 mx-auto mb-4" />
                <h2 className="text-2xl font-black text-red-900 dark:text-red-400 mb-2">
                  Clearance Denied
                </h2>
                <p className="text-sm text-red-800/70 dark:text-red-500/70 max-w-md mx-auto mb-6">
                  You have outstanding financial obligations for the {session}{" "}
                  session. The following required fees remain unpaid:
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {missingFees.map((fee) => (
                    <span
                      key={fee}
                      className="bg-white dark:bg-red-950 px-4 py-2 rounded-lg border border-red-200 dark:border-red-800 text-xs font-black uppercase tracking-widest text-red-700 dark:text-red-400 shadow-sm">
                      {fee}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => router.push("/dashboard/student/payments")}
                  className="bg-red-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-red-700 transition-all shadow-md">
                  Resolve Payments Now
                </button>
              </div>
            ) : (
              <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 rounded-3xl p-12 text-center shadow-sm">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-black text-green-900 dark:text-green-400 mb-2">
                  Clearance Approved
                </h2>
                <p className="text-sm text-green-800/70 dark:text-green-500/70 max-w-md mx-auto mb-8">
                  Financial obligations met. You are officially cleared for{" "}
                  {semester} examinations.
                </p>
                <button
                  onClick={() =>
                    router.push(
                      `/student/clearance-printout?session=${session}&semester=${semester}`,
                    )
                  }
                  className="bg-pink-700 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-pink-800 transition-all shadow-xl flex items-center justify-center gap-2 mx-auto">
                  <Printer size={18} /> Print Clearance Slip
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
