// src/components/pages/auth/ActivationModal.tsx
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useRouter } from "next/navigation";

interface ActivationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Added the : Variants type to explicitly tell TS this is for Framer Motion
const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// Added the : Variants type here too
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
}) => {
  const [isActivating, setIsActivating] = useState(false);
  const router = useRouter();

  const handleActivate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsActivating(true);

    // Simulate API call validation delay
    setTimeout(() => {
      setIsActivating(false);
      onClose();
      // Redirect to the multi-step registration wizard
      router.push("/register");
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-0">
          {/* Blurred Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
            {/* Top Decoration */}
            <div className="h-2 w-full bg-blue-900" />

            <div className="p-8">
              {/* Icon & Header */}
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-900 mb-6 mx-auto">
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
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Activate Account
                </h2>
                <p className="text-sm text-slate-600">
                  Enter your matriculation number and the activation token
                  provided by the ICT Directorate.
                </p>
              </div>

              {/* Activation Form */}
              <form onSubmit={handleActivate} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Matriculation Number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. GOU/26/1234"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-900 focus:border-blue-900 outline-none transition-all uppercase placeholder:normal-case"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Activation Token
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter 8-digit token"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-900 focus:border-blue-900 outline-none transition-all tracking-widest font-mono"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isActivating}
                    className="flex-1 py-3.5 bg-slate-100 text-slate-700 rounded-lg font-bold hover:bg-slate-200 transition-colors disabled:opacity-50">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isActivating}
                    className="flex-1 py-3.5 bg-blue-900 text-white rounded-lg font-bold shadow-md hover:bg-blue-800 transition-colors disabled:opacity-70 flex justify-center items-center gap-2">
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
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ActivationModal;
