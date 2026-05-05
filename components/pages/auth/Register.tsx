// src/components/pages/auth/Register.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";

const slideVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.3, ease: "easeIn" } },
};

const Register = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-8">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative">
        {/* Header & Progress Bar */}
        <div className="p-8 pb-0">
          <div className="flex justify-center mb-6">
            <img
              src="/images/gouni_logo.svg"
              alt="GO University"
              className="h-12 w-12"
            />
          </div>
          <div className="text-center mb-8">
            <span className="text-blue-700 font-bold text-xs tracking-widest uppercase">
              Sign Up
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">
              Set Up your account
            </h1>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-between gap-2 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: step >= i ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-blue-900"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="p-8 pt-0 relative min-h-[350px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="E.g Samuel"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-900 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="E.g Nnana"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-900 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="yourexample4@gmail.com"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-900 outline-none"
                  />
                  <p className="text-xs text-blue-700 mt-2 font-medium">
                    Must be at least 8 characters
                  </p>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-5">
                <h3 className="font-semibold text-slate-900 border-b pb-2">
                  Personal Details
                </h3>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Matriculation Number / JAMB Reg
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Registration Number"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+234 XXX XXXX"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Residential Address
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Your full address..."
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-900 outline-none resize-none"></textarea>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-5">
                <h3 className="font-semibold text-slate-900 border-b pb-2">
                  Academic Qualifications (WAEC/NECO)
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Exam Type
                    </label>
                    <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-900 outline-none bg-white">
                      <option>WAEC</option>
                      <option>NECO</option>
                      <option>NABTEB</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Exam Year
                    </label>
                    <input
                      type="number"
                      placeholder="2024"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-900 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Examination Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Exam Number"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Upload Result Slip
                  </label>
                  <input
                    type="file"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-900 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-5">
                <h3 className="font-semibold text-slate-900 border-b pb-2">
                  Parent / Guardian Information
                </h3>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Guardian Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Mr./Mrs. Guardian Name"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Guardian Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+234 XXX XXXX"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Relationship to Student
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-900 outline-none bg-white">
                    <option>Father</option>
                    <option>Mother</option>
                    <option>Sibling</option>
                    <option>Sponsor</option>
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-100">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="px-6 py-3.5 rounded-lg font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                Back
              </button>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={step === totalSteps ? undefined : nextStep}
              className="flex-1 py-3.5 bg-blue-900 text-white rounded-lg font-bold shadow-md hover:bg-blue-800 transition-colors">
              {step === totalSteps ? "Complete Setup" : "Next Step"}
            </motion.button>
          </div>

          <div className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-700 font-bold hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
