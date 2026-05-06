"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Printer, X, CheckCircle, Clock, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation"; // IMPORT ADDED HERE
import {
  paymentBanks,
  feeStructure,
  getTuitionFee,
} from "@/lib/constants/finance_data";

// Safe number parser
const parseAmount = (val: any) =>
  Number(String(val).replace(/[^0-9.-]+/g, "")) || 0;

export default function PaymentsPage() {
  const router = useRouter(); // HOOK INITIALIZED HERE

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
        setPayments(
          allPayments
            .filter(
              (p: any) =>
                p.studentId === user.regNumber || p.studentId === user.id,
            )
            .reverse(), // Newest first
        );
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const calculateAmount = (selectedFee: string) => {
    if (!currentUser) return 0;
    if (selectedFee === "Tuition Fee") {
      return parseAmount(getTuitionFee(currentUser.prog));
    }
    const otherFee = feeStructure.otherFees.find((f) => f.name === selectedFee);
    return otherFee ? parseAmount(otherFee.amount) : 0;
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
    }, 1500);
  };

  const amountToPay = calculateAmount(feeType);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 px-4 sm:px-0">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">My Payments</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-xs bg-blue-900 dark:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-black uppercase tracking-widest hover:bg-blue-800 transition-all flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95">
          <Plus className="w-4 h-4" /> Make Payment
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-[2rem] border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between bg-muted/20">
          <h2 className="text-sm font-black text-foreground uppercase tracking-widest">
            Payment Ledger
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] text-muted-foreground uppercase bg-muted/50 font-black tracking-widest">
              <tr>
                <th className="px-6 py-5">Invoice No.</th>
                <th className="px-6 py-5">Fee Description</th>
                <th className="px-6 py-5">Session/Sem</th>
                <th className="px-6 py-5">Amount</th>
                <th className="px-6 py-5">Date</th>
                <th className="px-6 py-5 text-center">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <AnimatePresence>
                {payments.length > 0 ? (
                  payments.map((item, i) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-blue-600">
                        {item.id}
                      </td>
                      <td className="px-6 py-4 text-foreground font-bold">
                        {item.type}
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">
                          Via {item.bank}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground text-xs font-medium">
                        {item.session} <br /> {item.semester}
                      </td>
                      <td className="px-6 py-4 text-foreground font-black text-lg">
                        ₦{Number(item.amount).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground text-xs font-medium">
                        {item.date}
                      </td>
                      <td className="px-6 py-4 flex justify-center gap-2">
                        {item.status === "Paid" ? (
                          <button
                            onClick={() =>
                              router.push(
                                `/student/receipt-printout?id=${item.id}`,
                              )
                            }
                            className="bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 p-2.5 rounded-xl transition-all shadow-sm"
                            title="Print Official Receipt">
                            <Printer size={18} />
                          </button>
                        ) : (
                          <span className="flex items-center gap-1 w-fit bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-black uppercase px-3 py-1 rounded-full">
                            <Clock size={12} /> Pending
                          </span>
                        )}
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-muted-foreground">
                      <p className="font-bold text-foreground">
                        No payments made yet.
                      </p>
                      <p className="text-xs mt-1">
                        Your payment history will appear here once you generate
                        an invoice.
                      </p>
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
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-10 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isProcessing && setIsModalOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-card rounded-[2.5rem] shadow-2xl border border-border p-8">
              <div className="flex justify-between items-center mb-8 border-b border-border pb-4">
                <h2 className="text-xl font-bold text-foreground">
                  Generate Invoice
                </h2>
                <button
                  onClick={() => !isProcessing && setIsModalOpen(false)}
                  className="text-muted-foreground hover:bg-muted p-2 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleMakePayment} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-muted-foreground ml-1 mb-1">
                      Session
                    </label>
                    <select
                      value={session}
                      onChange={(e) => setSession(e.target.value)}
                      className="w-full p-3.5 text-sm rounded-2xl border border-input bg-background font-bold outline-none focus:ring-2 focus:ring-blue-900">
                      <option>2025/2026</option>
                      <option>2024/2025</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-muted-foreground ml-1 mb-1">
                      Semester
                    </label>
                    <select
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      className="w-full p-3.5 text-sm rounded-2xl border border-input bg-background font-bold outline-none focus:ring-2 focus:ring-blue-900">
                      <option>1st Semester</option>
                      <option>2nd Semester</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-muted-foreground ml-1 mb-1">
                    Select Fee Type
                  </label>
                  <select
                    required
                    value={feeType}
                    onChange={(e) => setFeeType(e.target.value)}
                    className="w-full p-3.5 rounded-2xl border border-input bg-background font-bold outline-none focus:ring-2 focus:ring-blue-900">
                    <option value="" disabled hidden>
                      -- Choose Fee --
                    </option>
                    <option value="Tuition Fee">Tuition Fee</option>
                    {feeStructure.otherFees.map((fee) => (
                      <option key={fee.id} value={fee.name}>
                        {fee.name}
                      </option>
                    ))}
                  </select>
                </div>

                {feeType && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-3xl border border-blue-100 dark:border-blue-900/30 flex flex-col items-center justify-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-900 dark:text-blue-400 mb-1">
                      Amount Due
                    </span>
                    <span className="text-4xl font-black text-blue-700 dark:text-blue-300">
                      ₦{amountToPay.toLocaleString()}
                    </span>
                  </motion.div>
                )}

                <div>
                  <label className="block text-[10px] font-black uppercase text-muted-foreground ml-1 mb-1">
                    Payment Gateway
                  </label>
                  <select
                    required
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    className="w-full p-3.5 rounded-2xl border border-input bg-background font-bold outline-none focus:ring-2 focus:ring-blue-900">
                    <option value="" disabled hidden>
                      -- Select Bank --
                    </option>
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
                  className="w-full mt-4 py-4 bg-blue-900 dark:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-800 disabled:opacity-50 transition-all flex justify-center items-center gap-2 shadow-lg active:scale-95">
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                    </>
                  ) : (
                    "Confirm & Pay"
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
