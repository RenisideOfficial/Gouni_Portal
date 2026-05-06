// src/app/(root)/dashboard/student/payments/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import {
  paymentBanks,
  feeStructure,
  getTuitionFee,
} from "@/lib/constants/finance_data";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Payment Form State
  const [feeType, setFeeType] = useState("");
  const [bank, setBank] = useState("");
  const [session, setSession] = useState("2025/2026");
  const [semester, setSemester] = useState("1st Semester");

  // Load Data safely
  useEffect(() => {
    const timer = setTimeout(() => {
      const userStr = localStorage.getItem("gouni_current_user");
      const user = userStr ? JSON.parse(userStr) : null;
      setCurrentUser(user);

      const allPayments = JSON.parse(
        localStorage.getItem("gouni_payments") || "[]",
      );
      if (user) {
        // Filter payments only for this student
        setPayments(
          allPayments.filter(
            (p: any) =>
              p.studentId === user.regNumber || p.studentId === user.id,
          ),
        );
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const calculateAmount = (selectedFee: string) => {
    if (!currentUser) return 0;
    if (selectedFee === "Tuition Fee") {
      return getTuitionFee(currentUser.prog);
    }
    const otherFee = feeStructure.otherFees.find((f) => f.name === selectedFee);
    return otherFee ? otherFee.amount : 0;
  };

  const handleMakePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const amount = calculateAmount(feeType);
      const newPayment = {
        id: `GOU${Date.now().toString().slice(-8)}`,
        studentId: currentUser.regNumber || currentUser.id,
        studentName: currentUser.name,
        prog: currentUser.prog,
        level: currentUser.level || "100L",
        type: feeType,
        amount: amount,
        session: session,
        semester: semester,
        bank: bank,
        date: new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        status: "Paid",
        timestamp: Date.now(),
      };

      const allPayments = JSON.parse(
        localStorage.getItem("gouni_payments") || "[]",
      );
      localStorage.setItem(
        "gouni_payments",
        JSON.stringify([...allPayments, newPayment]),
      );

      setPayments((prev) => [newPayment, ...prev]);
      setIsProcessing(false);
      setIsModalOpen(false);
      setFeeType("");
      setBank("");
    }, 1500); // Simulate network latency
  };

  const amountToPay = calculateAmount(feeType);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">My Payments</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-xs bg-blue-900 dark:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-800 transition-colors flex items-center gap-2 shadow-sm">
          <Plus className="w-4 h-4" /> Make Payment
        </button>
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
                <th className="px-6 py-4 font-medium">Invoice No.</th>
                <th className="px-6 py-4 font-medium">Fee Description</th>
                <th className="px-6 py-4 font-medium">Session/Sem</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <AnimatePresence>
                {payments.length > 0 ? (
                  payments.map((item, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-foreground">
                        {item.id}
                      </td>
                      <td className="px-6 py-4 text-foreground font-semibold">
                        {item.type}
                        <p className="text-[10px] text-muted-foreground font-normal mt-0.5">
                          Via {item.bank}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground text-xs">
                        {item.session} <br /> {item.semester}
                      </td>
                      <td className="px-6 py-4 text-foreground font-medium">
                        ₦{item.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {item.date}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          {item.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-8 text-center text-muted-foreground">
                      No payments made yet.
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Payment Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isProcessing && setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-card rounded-3xl shadow-2xl border border-border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-foreground">
                  Generate Invoice & Pay
                </h2>
                <button
                  onClick={() => !isProcessing && setIsModalOpen(false)}
                  className="text-muted-foreground hover:bg-muted p-2 rounded-full">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleMakePayment} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      Session
                    </label>
                    <select
                      value={session}
                      onChange={(e) => setSession(e.target.value)}
                      className="w-full p-2.5 text-sm rounded-lg border border-input bg-background outline-none">
                      <option>2025/2026</option>
                      <option>2024/2025</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      Semester
                    </label>
                    <select
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      className="w-full p-2.5 text-sm rounded-lg border border-input bg-background outline-none">
                      <option>1st Semester</option>
                      <option>2nd Semester</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Select Fee Type
                  </label>
                  <select
                    required
                    value={feeType}
                    onChange={(e) => setFeeType(e.target.value)}
                    className="w-full p-3 rounded-lg border border-input bg-background font-medium outline-none">
                    <option value="">-- Choose Fee --</option>
                    <option value="Tuition Fee">Tuition Fee</option>
                    {feeStructure.otherFees.map((fee) => (
                      <option key={fee.id} value={fee.name}>
                        {fee.name}
                      </option>
                    ))}
                  </select>
                </div>

                {feeType && (
                  <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 flex justify-between items-center">
                    <span className="text-sm font-medium text-blue-900 dark:text-blue-400">
                      Amount Due:
                    </span>
                    <span className="text-xl font-bold text-blue-700 dark:text-blue-300">
                      ₦{amountToPay.toLocaleString()}
                    </span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Payment Method / Bank
                  </label>
                  <select
                    required
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    className="w-full p-3 rounded-lg border border-input bg-background outline-none">
                    <option value="">-- Select Bank --</option>
                    {paymentBanks.map((b) => (
                      <option key={b.bankId} value={b.bankName}>
                        {b.bankName}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing || !feeType || !bank}
                  className="w-full mt-4 py-3.5 bg-blue-900 dark:bg-blue-700 text-white rounded-xl font-bold hover:bg-blue-800 disabled:opacity-50 transition-colors flex justify-center items-center gap-2">
                  {isProcessing ? "Processing..." : "Confirm & Pay"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
