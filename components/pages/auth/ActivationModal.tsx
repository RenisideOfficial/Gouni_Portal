// src/components/pages/auth/ActivationModal.tsx
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface ActivationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (regNumber: string) => void;
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", duration: 0.5, bounce: 0.3 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2 },
  },
};

const ActivationModal: React.FC<ActivationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [isActivating, setIsActivating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  // Controlled inputs
  const [regNumber, setRegNumber] = useState("");
  const [token, setToken] = useState("");

  // Fixed: Wrapped in setTimeout to prevent synchronous cascading renders
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isOpen) {
        setRegNumber("");
        setToken("");
        setError("");
        setIsSuccess(false);
      }
    }, 0);
    return () => clearTimeout(timer); // Cleanup
  }, [isOpen]);

  const handleActivate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsActivating(true);
    setError("");

    // Simulate network delay for realistic HCI feedback
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("gouni_users") || "[]");

      // Find the user matching the credentials
      const userIndex = users.findIndex(
        (u: any) =>
          u.regNumber?.toLowerCase() === regNumber.toLowerCase() &&
          u.activationToken === token,
      );

      if (userIndex !== -1) {
        // Activate the account in the database
        users[userIndex].isActivated = true;
        localStorage.setItem("gouni_users", JSON.stringify(users));

        setIsActivating(false);
        setIsSuccess(true);

        // Wait 2 seconds so they can read the success message, then close and auto-fill
        setTimeout(() => {
          onSuccess(users[userIndex].regNumber);
          onClose();
        }, 2000);
      } else {
        setIsActivating(false);
        setError(
          "Invalid Matriculation Number or Token. Please verify your credentials.",
        );
      }
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-0">
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-md bg-card rounded-3xl shadow-2xl border border-border overflow-hidden">
            <div className="h-2 w-full bg-blue-900 dark:bg-blue-500" />

            <div className="p-8">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}>
                    <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-900 dark:text-blue-400 mb-6 mx-auto">
                      <svg
                        className="w-7 h-7"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                        />
                      </svg>
                    </div>

                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-foreground mb-2">
                        Activate Account
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Enter your matriculation number and the 8-digit
                        activation token.
                      </p>
                    </div>

                    <form onSubmit={handleActivate} className="space-y-5">
                      {error && (
                        <div className="bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 p-3 rounded-lg text-sm text-center border border-red-100 dark:border-red-900/30">
                          {error}
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Matriculation Number
                        </label>
                        <input
                          type="text"
                          required
                          value={regNumber}
                          onChange={(e) => setRegNumber(e.target.value)}
                          placeholder="e.g. GOU/U24/CSC/123"
                          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-500 outline-none transition-all uppercase placeholder:normal-case placeholder:text-muted-foreground"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Activation Token
                        </label>
                        <input
                          type="text"
                          required
                          value={token}
                          onChange={(e) => setToken(e.target.value)}
                          placeholder="Enter 8-digit token"
                          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-500 outline-none transition-all tracking-widest font-mono placeholder:text-muted-foreground"
                        />
                      </div>

                      <div className="pt-4 flex gap-3">
                        <button
                          type="button"
                          onClick={onClose}
                          disabled={isActivating}
                          className="flex-1 py-3.5 bg-muted text-foreground rounded-lg font-bold hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors disabled:opacity-50">
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isActivating || !regNumber || !token}
                          className="flex-1 py-3.5 bg-blue-900 dark:bg-blue-700 text-white rounded-lg font-bold shadow-md hover:bg-blue-800 transition-colors disabled:opacity-70 flex justify-center items-center gap-2">
                          {isActivating ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                fill="none"
                                viewBox="0 0 24 24">
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                              </svg>
                              Verifying...
                            </>
                          ) : (
                            "Verify & Activate"
                          )}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8">
                    <div className="w-20 h-20 bg-green-50 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mx-auto mb-6">
                      <svg
                        className="w-10 h-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-3">
                      Account Activated!
                    </h2>
                    <p className="text-muted-foreground">
                      Your portal is now unlocked. Redirecting you to login...
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ActivationModal;
