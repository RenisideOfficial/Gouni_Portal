// src/components/pages/auth/ForgotPassword.tsx
"use client";
import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

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
  return (
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
            Check your email to reset your password
          </p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              placeholder="yourexample4@gmail.com"
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
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3.5 bg-blue-900 dark:bg-blue-700 text-white rounded-full font-bold shadow-md hover:bg-blue-800 transition-colors">
              Reset Password
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
