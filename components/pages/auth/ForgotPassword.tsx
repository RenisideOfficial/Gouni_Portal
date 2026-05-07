"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, Variants, AnimatePresence } from "framer-motion";
import {
  Loader2,
  Copy,
  CheckCircle2,
  AlertTriangle,
  KeyRound,
} from "lucide-react";

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const ForgotPassword = () => {
  const [identifier, setIdentifier] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Popup States
  const [showPopup, setShowPopup] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    // Generates an 8-character alphanumeric password
    return Math.random().toString(36).slice(-8).toUpperCase();
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) return;

    setError("");
    setIsLoading(true);

    // Simulate Network Request
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("gouni_users") || "[]");
      const lowerId = identifier.toLowerCase();

      // Look for user matching Email, Reg Number, Staff ID, or Admin ID
      const userIndex = users.findIndex(
        (u: any) =>
          (u.email && u.email.toLowerCase() === lowerId) ||
          (u.regNumber && u.regNumber.toLowerCase() === lowerId) ||
          (u.staffId && u.staffId.toLowerCase() === lowerId) ||
          (u.id && u.id.toLowerCase() === lowerId),
      );

      if (userIndex !== -1) {
        // Generate new password and update database
        const generatedPass = generatePassword();
        users[userIndex].password = generatedPass;
        localStorage.setItem("gouni_users", JSON.stringify(users));

        // Update active session if they happen to be logged in with that account
        const currentUser = JSON.parse(
          localStorage.getItem("gouni_current_user") || "null",
        );
        if (currentUser && currentUser.id === users[userIndex].id) {
          currentUser.password = generatedPass;
          localStorage.setItem(
            "gouni_current_user",
            JSON.stringify(currentUser),
          );
        }

        setNewPassword(generatedPass);
        setShowPopup(true);
      } else {
        setError("No account found matching that ID or Email address.");
      }
      setIsLoading(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(newPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto p-4 sm:p-8">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="show"
          className="bg-card rounded-3xl shadow-xl border border-border p-8 sm:p-10 relative pt-12">
          {/* Back Button */}
          <Link
            href="/"
            className="absolute top-6 left-6 flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors"
            aria-label="Back to Home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </Link>

          <div className="flex justify-center mb-6">
            <img
              src="/images/gouni_logo.svg"
              alt="GO University"
              className="h-14 w-14 mt-4"
            />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Forgot Password ?
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your University Email or ID number to reset your password.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleResetPassword}>
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm text-center border border-red-100 dark:border-red-900/30 overflow-hidden flex items-center justify-center gap-2">
                  <AlertTriangle size={16} /> {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Identification
              </label>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Email, Matric No, or Staff ID"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-500 outline-none transition-all placeholder:text-muted-foreground"
              />
            </div>

            <div className="flex items-center gap-4 pt-2">
              <Link href="/login" className="flex-1">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 border-2 border-blue-900 dark:border-blue-500 text-blue-900 dark:text-blue-400 rounded-full font-bold text-center hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">
                  Cancel
                </motion.div>
              </Link>
              <motion.button
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
                disabled={isLoading || !identifier.trim()}
                type="submit"
                className="flex-1 py-3.5 flex justify-center items-center gap-2 bg-blue-900 dark:bg-blue-700 text-white rounded-full font-bold shadow-md hover:bg-blue-800 disabled:opacity-70 disabled:cursor-not-allowed transition-colors">
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Reset"
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* SUCCESS MODAL POPUP */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setShowPopup(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-card rounded-[2rem] shadow-2xl p-8 border border-border text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                <KeyRound size={32} />
              </div>

              <h2 className="text-xl font-bold text-foreground mb-2">
                Password Reset!
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Your account password has been successfully regenerated. Please
                copy it below and use it to log in.
              </p>

              <div className="bg-muted border border-border rounded-xl p-4 flex items-center justify-between mb-8 group">
                <span className="font-mono font-black text-2xl tracking-widest text-foreground pl-4">
                  {newPassword}
                </span>
                <button
                  onClick={copyToClipboard}
                  className="p-3 bg-background rounded-lg shadow-sm border border-border hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  title="Copy to clipboard">
                  {copied ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>

              <Link href="/login" onClick={() => setShowPopup(false)}>
                <button className="w-full py-4 bg-blue-900 text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-blue-800 transition-colors shadow-lg">
                  Go to Login
                </button>
              </Link>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ForgotPassword;
