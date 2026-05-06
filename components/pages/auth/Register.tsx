// src/components/pages/auth/Register.tsx
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";

const slideVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.3, ease: "easeIn" } },
};

const Register = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // Centralized State: Ensures data persists when navigating Back and Next
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    regNumber: "",
    phone: "",
    address: "",
    examType: "WAEC",
    examYear: "",
    examNumber: "",
    guardianName: "",
    guardianPhone: "",
    relationship: "Father",
  });

  // Check if the user just came from the Activation Modal
  // Fixed: Wrapped in a setTimeout to prevent synchronous cascading renders
  // and satisfy strict ESLint rules for Next.js
  useEffect(() => {
    const timer = setTimeout(() => {
      const activationData = localStorage.getItem("gouni_activation_temp");
      if (activationData) {
        try {
          const parsedData = JSON.parse(activationData);
          setFormData((prev) => ({
            ...prev,
            regNumber: parsedData.regNumber, // Pre-fill the reg number
          }));
          // Clean up temp data so it doesn't leak
          localStorage.removeItem("gouni_activation_temp");
        } catch (error) {
          console.error("Error parsing activation data", error);
        }
      }
    }, 0);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  // Universal input handler
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // Local Storage Sync: Saves user to "Database" and logs them in
  const handleFinalSubmit = () => {
    // Fetch existing users or initialize empty array
    const existingUsers = JSON.parse(
      localStorage.getItem("gouni_users") || "[]",
    );

    // Create new user profile
    const newUser = {
      ...formData,
      role: "student", // Default role for registration
      id: `GOU/STUDENT/${Date.now()}`,
      name: `${formData.firstName} ${formData.lastName}`,
      status: "Active",
    };

    // Save to simulated database
    localStorage.setItem(
      "gouni_users",
      JSON.stringify([...existingUsers, newUser]),
    );

    // Set current active session
    localStorage.setItem("gouni_current_user", JSON.stringify(newUser));

    // Redirect to Student Dashboard
    router.push("/dashboard/student");
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-8 transition-colors duration-300">
      <div className="bg-card rounded-3xl shadow-xl border border-border overflow-hidden relative pt-6">
        {/* Back Button */}
        <Link
          href="/"
          className="absolute top-6 left-6 flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors z-10"
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

        <div className="p-8 pb-0 mt-4">
          <div className="flex justify-center mb-6">
            <img
              src="/images/gouni_logo.svg"
              alt="GO University"
              className="h-12 w-12"
            />
          </div>
          <div className="text-center mb-8">
            <span className="text-blue-700 dark:text-blue-400 font-bold text-xs tracking-widest uppercase">
              Step {step} of {totalSteps}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mt-2">
              Set Up your account
            </h1>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center justify-between gap-2 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: step >= i ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-blue-900 dark:bg-blue-500"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 pt-0 relative min-h-[350px]">
          <AnimatePresence mode="wait">
            {/* STEP 1: Basic Info */}
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
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="E.g Samuel"
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-500 outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="E.g Nnana"
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-500 outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="yourexample4@gmail.com"
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-500 outline-none placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-500 outline-none placeholder:text-muted-foreground tracking-widest"
                  />
                  <p className="text-xs text-blue-700 dark:text-blue-400 mt-2 font-medium">
                    Must be at least 8 characters
                  </p>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Personal Details */}
            {step === 2 && (
              <motion.div
                key="step2"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-5">
                <h3 className="font-semibold text-foreground border-b border-border pb-2">
                  Personal Details
                </h3>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Matriculation Number / JAMB Reg
                  </label>
                  <input
                    type="text"
                    name="regNumber"
                    value={formData.regNumber}
                    onChange={handleInputChange}
                    placeholder="Enter Registration Number"
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-500 outline-none placeholder:text-muted-foreground uppercase"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+234 XXX XXXX"
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-500 outline-none placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Residential Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="Your full address..."
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-500 outline-none resize-none placeholder:text-muted-foreground"
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 3: Academic Info */}
            {step === 3 && (
              <motion.div
                key="step3"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-5">
                <h3 className="font-semibold text-foreground border-b border-border pb-2">
                  Academic Qualifications (WAEC/NECO)
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Exam Type
                    </label>
                    <select
                      name="examType"
                      value={formData.examType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-500 outline-none">
                      <option>WAEC</option>
                      <option>NECO</option>
                      <option>NABTEB</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Exam Year
                    </label>
                    <input
                      type="number"
                      name="examYear"
                      value={formData.examYear}
                      onChange={handleInputChange}
                      placeholder="2024"
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-500 outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Examination Number
                  </label>
                  <input
                    type="text"
                    name="examNumber"
                    value={formData.examNumber}
                    onChange={handleInputChange}
                    placeholder="Enter Exam Number"
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-500 outline-none placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Upload Result Slip
                  </label>
                  <input
                    type="file"
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900/30 file:text-blue-700 dark:file:text-blue-400 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/50 cursor-pointer"
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 4: Guardian Info */}
            {step === 4 && (
              <motion.div
                key="step4"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-5">
                <h3 className="font-semibold text-foreground border-b border-border pb-2">
                  Parent / Guardian Information
                </h3>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Guardian Full Name
                  </label>
                  <input
                    type="text"
                    name="guardianName"
                    value={formData.guardianName}
                    onChange={handleInputChange}
                    placeholder="Mr./Mrs. Guardian Name"
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-500 outline-none placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Guardian Phone Number
                  </label>
                  <input
                    type="tel"
                    name="guardianPhone"
                    value={formData.guardianPhone}
                    onChange={handleInputChange}
                    placeholder="+234 XXX XXXX"
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-500 outline-none placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Relationship to Student
                  </label>
                  <select
                    name="relationship"
                    value={formData.relationship}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-500 outline-none">
                    <option>Father</option>
                    <option>Mother</option>
                    <option>Sibling</option>
                    <option>Sponsor</option>
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Navigation Actions */}
          <div className="flex items-center gap-4 mt-8 pt-6 border-t border-border">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="px-6 py-3.5 rounded-lg font-bold text-muted-foreground hover:bg-muted transition-colors">
                Back
              </button>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={step === totalSteps ? handleFinalSubmit : nextStep}
              className="flex-1 py-3.5 bg-blue-900 dark:bg-blue-700 text-white rounded-lg font-bold shadow-md hover:bg-blue-800 transition-colors">
              {step === totalSteps ? "Complete Setup" : "Next Step"}
            </motion.button>
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-700 dark:text-blue-400 font-bold hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
