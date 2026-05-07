"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Printer,
  X,
  CheckCircle,
  Clock,
  Loader2,
  ShieldCheck,
  Lock,
  CreditCard,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  paymentBanks,
  feeStructure as defaultFeeStructure,
} from "@/lib/constants/finance_data";

// Safe number parser
const parseAmount = (val: any) =>
  Number(String(val).replace(/[^0-9.-]+/g, "")) || 0;

export default function PaymentsPage() {
  const router = useRouter();

  const [payments, setPayments] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [appFees, setAppFees] = useState<any>({ tuition: {}, otherFees: [] });
  const [isLoading, setIsLoading] = useState(true);

  // --- MULTI-STEP CHECKOUT STATE ---
  const [checkoutStep, setCheckoutStep] = useState<
    "idle" | "invoice" | "confirm" | "gateway" | "processing" | "success"
  >("idle");
  const [processingText, setProcessingText] = useState("Authenticating...");

  const [feeType, setFeeType] = useState("");
  const [bank, setBank] = useState("");
  const [session, setSession] = useState("2025/2026");
  const [semester, setSemester] = useState("1st Semester");
  const [selectedCard, setSelectedCard] = useState("Mastercard");

  // Load Data safely
  useEffect(() => {
    const timer = setTimeout(() => {
      // Load or Seed Fees
      let storedFees = JSON.parse(localStorage.getItem("gouni_fees") || "null");
      if (!storedFees) {
        storedFees = defaultFeeStructure;
        localStorage.setItem("gouni_fees", JSON.stringify(storedFees));
      }
      setAppFees(storedFees);

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
            .reverse(),
        );
      }
      setIsLoading(false);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const calculateAmount = (selectedFee: string) => {
    if (!currentUser || !appFees) return 0;
    if (selectedFee === "Tuition Fee") {
      const prog = currentUser.prog || "Default";
      return parseAmount(
        appFees.tuition[prog] || appFees.tuition["Default"] || 0,
      );
    }
    const otherFee = appFees.otherFees.find((f: any) => f.name === selectedFee);
    return otherFee ? parseAmount(otherFee.amount) : 0;
  };
  const amountToPay = calculateAmount(feeType);

  const playSuccessSound = () => {
    try {
      const audio = new Audio(
        "https://actions.google.com/sounds/v1/ui/proxima_success_action.ogg",
      );
      audio.volume = 0.5;
      audio.play();
    } catch (error) {}
  };

  const handleProceedToConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feeType || !bank) return;
    setCheckoutStep("confirm");
  };

  const executePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep("processing");

    setTimeout(() => setProcessingText("Connecting to Bank..."), 800);
    setTimeout(() => setProcessingText("Verifying 3D Secure OTP..."), 2000);
    setTimeout(() => setProcessingText("Approving Transaction..."), 3500);

    setTimeout(() => {
      const newPayment = {
        id: `GOU${Date.now().toString().slice(-8)}`,
        studentId: currentUser.regNumber || currentUser.id,
        studentName: currentUser.name,
        prog: currentUser.prog,
        level: currentUser.level || "100L",
        type: feeType,
        amount: amountToPay,
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

      setCheckoutStep("success");
      playSuccessSound();

      setTimeout(() => {
        setCheckoutStep("idle");
        setFeeType("");
        setBank("");
      }, 3500);
    }, 4500);
  };

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-blue-900 w-8 h-8" />
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 px-4 sm:px-0">
      {/* Existing Dashboard Layout Elements */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">My Payments</h1>
        <button
          onClick={() => setCheckoutStep("invoice")}
          className="text-xs bg-blue-900 dark:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-black uppercase tracking-widest hover:bg-blue-800 transition-all flex items-center gap-2 shadow-lg">
          <Plus className="w-4 h-4" /> Make Payment
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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
                            className="bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 p-2.5 rounded-xl transition-all shadow-sm">
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
                      No payments made yet.
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* 1. INVOICE GENERATION MODAL */}
      <AnimatePresence>
        {checkoutStep === "invoice" && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-10 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCheckoutStep("idle")}
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
                  onClick={() => setCheckoutStep("idle")}
                  className="text-muted-foreground hover:bg-muted p-2 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleProceedToConfirm} className="space-y-5">
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
                    {appFees.otherFees.map((fee: any) => (
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
                    Payment Gateway / Bank
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
                  disabled={!feeType || !bank}
                  className="w-full mt-4 py-4 bg-blue-900 dark:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-800 disabled:opacity-50 transition-all shadow-lg">
                  Proceed to Checkout
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. CONFIRMATION ALERT */}
      <AnimatePresence>
        {checkoutStep === "confirm" && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-sm bg-card rounded-[2rem] shadow-2xl p-8 text-center border border-border">
              <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-10 h-10 text-amber-600" />
              </div>
              <h2 className="text-xl font-black mb-2 text-foreground">
                Confirm Gateway
              </h2>
              <p className="text-sm text-muted-foreground mb-8">
                You are about to be redirected to the secure payment gateway for{" "}
                <b>{bank}</b> to pay the sum of{" "}
                <b className="text-foreground">
                  ₦{amountToPay.toLocaleString()}
                </b>
                .
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setCheckoutStep("invoice")}
                  className="flex-1 py-3.5 bg-muted rounded-2xl font-bold text-xs uppercase tracking-widest text-foreground hover:bg-slate-200 transition-colors">
                  Cancel
                </button>
                <button
                  onClick={() => setCheckoutStep("gateway")}
                  className="flex-1 py-3.5 bg-amber-600 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-amber-700 transition-colors shadow-lg">
                  Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. FULL-SCREEN PAYMENT GATEWAY */}
      <AnimatePresence>
        {(checkoutStep === "gateway" ||
          checkoutStep === "processing" ||
          checkoutStep === "success") && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-slate-50 dark:bg-slate-950 flex flex-col overflow-y-auto">
            <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-6 flex justify-between items-center sticky top-0 z-10 shadow-sm">
              <div className="flex items-center gap-3">
                {checkoutStep === "gateway" && (
                  <button
                    onClick={() => setCheckoutStep("invoice")}
                    className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 transition-colors">
                    <ArrowLeft
                      size={20}
                      className="text-slate-700 dark:text-slate-300"
                    />
                  </button>
                )}
                <div className="flex items-center gap-2">
                  <ShieldCheck className="text-green-600 w-6 h-6" />
                  <span className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-sm">
                    Secure Checkout via {bank}
                  </span>
                </div>
              </div>
              <div className="font-mono font-black text-xl text-slate-900 dark:text-white">
                ₦{amountToPay.toLocaleString()}
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center p-4">
              {checkoutStep === "gateway" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl p-8 border border-slate-200 dark:border-slate-800">
                  <div className="text-center mb-8">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
                      Paying Godfrey Okoye University
                    </p>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6">
                      ₦{amountToPay.toLocaleString()}
                    </h2>
                    <div className="flex justify-center gap-3">
                      {["Mastercard", "Visa", "Verve"].map((card) => (
                        <div
                          key={card}
                          onClick={() => setSelectedCard(card)}
                          className={`cursor-pointer px-4 py-2 rounded-xl border-2 transition-all font-bold text-xs ${selectedCard === card ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/30" : "border-slate-200 text-slate-500 hover:border-blue-300 dark:border-slate-700 dark:text-slate-400 dark:hover:border-blue-500"}`}>
                          {card}
                        </div>
                      ))}
                    </div>
                  </div>
                  <form onSubmit={executePayment} className="space-y-5">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-500 ml-1 mb-1">
                        Card Number
                      </label>
                      <div className="relative">
                        <CreditCard className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
                        <input
                          required
                          type="text"
                          placeholder="0000 0000 0000 0000"
                          maxLength={19}
                          className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold outline-none focus:border-blue-600 transition-colors"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-500 ml-1 mb-1">
                          Expiry Date
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full px-4 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold outline-none focus:border-blue-600 text-center transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-500 ml-1 mb-1">
                          CVV
                        </label>
                        <input
                          required
                          type="password"
                          placeholder="123"
                          maxLength={3}
                          className="w-full px-4 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold outline-none focus:border-blue-600 text-center transition-colors"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full mt-6 py-4 bg-green-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl hover:bg-green-700 transition-all flex items-center justify-center gap-2">
                      <Lock className="w-4 h-4" /> Pay ₦
                      {amountToPay.toLocaleString()}
                    </button>
                  </form>
                  <div className="text-center mt-6 flex justify-center items-center gap-1 text-[10px] font-bold uppercase text-slate-400">
                    <Lock size={12} /> Secured by 256-bit encryption
                  </div>
                </motion.div>
              )}

              {checkoutStep === "processing" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center flex flex-col items-center">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 border-8 border-slate-200 dark:border-slate-800 border-t-blue-600 rounded-full animate-spin"></div>
                    <ShieldCheck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-600 w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                    {processingText}
                  </h2>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                    Please do not close this window
                  </p>
                </motion.div>
              )}

              {checkoutStep === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl p-10 border-4 border-green-500 text-center">
                  <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
                    Payment Successful!
                  </h2>
                  <p className="text-sm font-bold text-slate-500 mb-8">
                    Your transaction has been approved by the bank.
                  </p>
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl mb-8">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      Amount Paid
                    </p>
                    <p className="text-xl font-black text-slate-900 dark:text-white font-mono">
                      ₦{amountToPay.toLocaleString()}
                    </p>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest animate-pulse">
                    Redirecting to Dashboard...
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
