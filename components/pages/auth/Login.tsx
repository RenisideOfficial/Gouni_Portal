// src/components/pages/auth/Login.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import ActivationModal from "./ActivationModal";

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isActivationModalOpen, setActivationModalOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen w-full flex bg-background transition-colors duration-300">
        {/* Left Form Side */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 lg:px-32 relative">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-8 left-8 sm:top-12 sm:left-12">
            <Link
              href="/"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors"
              aria-label="Back to Home">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            className="w-full max-w-md mx-auto">
            {/* Logo */}
            <motion.div
              variants={fadeUpVariants}
              className="mb-10 text-center lg:text-left flex justify-center lg:justify-start">
              <Link href="/">
                <img
                  src="/images/gouni_logo.svg"
                  alt="GO University Seal"
                  className="h-14 w-14 object-contain"
                />
              </Link>
            </motion.div>

            {/* Headers */}
            <motion.div
              variants={fadeUpVariants}
              className="mb-8 text-center lg:text-left">
              <span className="text-blue-700 dark:text-blue-400 font-bold text-xs tracking-widest uppercase">
                Log In
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                Welcome Back
              </h1>
            </motion.div>

            {/* Form */}
            <motion.form
              variants={fadeUpVariants}
              className="space-y-5"
              onSubmit={(e) => e.preventDefault()}>
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

              <div className="relative">
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-500 outline-none transition-all tracking-widest placeholder:tracking-normal placeholder:text-muted-foreground"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      {showPassword ? (
                        <>
                          <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                          <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                          <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                          <line x1="2" y1="2" x2="22" y2="22"></line>
                        </>
                      ) : (
                        <>
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </>
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-input text-blue-900 focus:ring-blue-900"
                  />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    Remember me
                  </span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-700 dark:text-blue-400 font-semibold hover:text-blue-900 dark:hover:text-blue-300 transition-colors">
                  Forgot password?
                </Link>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 bg-blue-900 dark:bg-blue-700 text-white rounded-lg font-bold shadow-md hover:bg-blue-800 transition-colors mt-4">
                Login
              </motion.button>
            </motion.form>

            <motion.div
              variants={fadeUpVariants}
              className="mt-8 text-center text-sm text-muted-foreground">
              First time here?{" "}
              <button
                type="button"
                onClick={() => setActivationModalOpen(true)}
                className="text-blue-700 dark:text-blue-400 font-bold hover:underline focus:outline-none">
                Activate Account
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Image Side */}
        <div className="hidden lg:block lg:w-1/2 relative bg-muted overflow-hidden p-4">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full rounded-[2rem] overflow-hidden relative shadow-2xl">
            <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply z-10" />
            <img
              src="/images/student_studying.jpg"
              alt="Student Studying"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>

      <ActivationModal
        isOpen={isActivationModalOpen}
        onClose={() => setActivationModalOpen(false)}
      />
    </>
  );
};

export default Login;
