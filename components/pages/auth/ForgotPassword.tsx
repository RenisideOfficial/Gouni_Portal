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
        className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-10">
        <div className="flex justify-center mb-6">
          <img
            src="/images/gouni_logo.svg"
            alt="GO University"
            className="h-14 w-14"
          />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Forgot Password ?
          </h1>
          <p className="text-sm text-slate-600">
            Check your email to reset your password
          </p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              placeholder="yourexample4@gmail.com"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-900 focus:border-blue-900 outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-4 pt-2">
            <Link href="/login" className="flex-1">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 border-2 border-blue-900 text-blue-900 rounded-full font-bold text-center hover:bg-blue-50 transition-colors">
                Cancel
              </motion.div>
            </Link>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3.5 bg-blue-900 text-white rounded-full font-bold shadow-md hover:bg-blue-800 transition-colors">
              Reset Password
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
