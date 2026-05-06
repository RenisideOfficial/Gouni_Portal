// src/components/pages/auth/Register.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";
import { facultyData } from "@/lib/constants/faculty_mapping";

const slideVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.3, ease: "easeIn" } },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", duration: 0.5, bounce: 0.3 },
  },
};

const Register = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    jambNumber: "",
    phone: "",
    address: "",
    faculty: "",
    prog: "", // prog represents the Department
    examType: "WAEC",
    examYear: "",
    examNumber: "",
    resultSlipName: "",
    guardianName: "",
    guardianPhone: "",
    relationship: "Father",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Reset department if faculty changes
    if (name === "faculty") {
      setFormData((prev) => ({ ...prev, prog: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        resultSlipName: e.target.files![0].name,
      }));
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    const existingUsers = JSON.parse(
      localStorage.getItem("gouni_users") || "[]",
    );
    const newUser = {
      ...formData,
      role: "student",
      id: `GOU/APP/${Date.now()}`,
      name: `${formData.firstName} ${formData.lastName}`,
      status: "Pending",
    };
    localStorage.setItem(
      "gouni_users",
      JSON.stringify([...existingUsers, newUser]),
    );

    // Simulating system processing delay for UI
    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsSubmitting(false);
    setShowSuccessModal(true);
  };

  const handleCloseAndRedirect = () => {
    setShowSuccessModal(false);
    router.push("/login");
  };

  return (
    <>
      <div className="w-full max-w-2xl mx-auto sm:p-8 transition-colors duration-300">
        <div className="bg-card md:rounded-3xl shadow-xl border border-border overflow-hidden relative pt-6">
          <Link
            href="/"
            className="absolute top-6 left-6 flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors z-10">
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
                Application Portal
              </h1>
            </div>

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
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-900 outline-none placeholder:text-muted-foreground"
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
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-900 outline-none placeholder:text-muted-foreground"
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
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-900 outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Create Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-900 outline-none placeholder:text-muted-foreground tracking-widest"
                    />
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
                      JAMB Registration Number
                    </label>
                    <input
                      type="text"
                      name="jambNumber"
                      value={formData.jambNumber}
                      onChange={handleInputChange}
                      placeholder="Enter JAMB Reg Number"
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-900 outline-none placeholder:text-muted-foreground uppercase"
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
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-900 outline-none placeholder:text-muted-foreground"
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
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-900 outline-none resize-none placeholder:text-muted-foreground"
                    />
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Academic Profile & Credentials */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-5">
                  <h3 className="font-semibold text-foreground border-b border-border pb-2">
                    Academic Profile
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30">
                    <div>
                      <label className="block text-sm font-bold text-foreground mb-1.5">
                        Select Faculty
                      </label>
                      <select
                        name="faculty"
                        value={formData.faculty}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-900 outline-none">
                        <option value="">-- Choose Faculty --</option>
                        {Object.keys(facultyData).map((fac) => (
                          <option key={fac} value={fac}>
                            {fac}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-foreground mb-1.5">
                        Select Department
                      </label>
                      <select
                        name="prog"
                        value={formData.prog}
                        onChange={handleInputChange}
                        disabled={!formData.faculty}
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-900 outline-none disabled:opacity-50 disabled:bg-muted">
                        <option value="">-- Choose Dept --</option>
                        {formData.faculty &&
                          facultyData[formData.faculty]?.map((dept) => (
                            <option key={dept} value={dept}>
                              {dept}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        O-Level Exam Type
                      </label>
                      <select
                        name="examType"
                        value={formData.examType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-900 outline-none">
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
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-900 outline-none placeholder:text-muted-foreground"
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
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-900 outline-none placeholder:text-muted-foreground"
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
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-900 outline-none placeholder:text-muted-foreground"
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
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-900 outline-none placeholder:text-muted-foreground"
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
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-blue-900 outline-none">
                      <option>Father</option>
                      <option>Mother</option>
                      <option>Sibling</option>
                      <option>Sponsor</option>
                    </select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-border">
              {step > 1 && (
                <button
                  onClick={prevStep}
                  disabled={isSubmitting}
                  className="px-6 py-3.5 rounded-lg font-bold text-muted-foreground hover:bg-muted transition-colors disabled:opacity-50">
                  Back
                </button>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={step === totalSteps ? handleFinalSubmit : nextStep}
                disabled={isSubmitting || (step === 3 && !formData.prog)}
                className="flex-1 py-3.5 bg-blue-900 dark:bg-blue-700 text-white rounded-lg font-bold shadow-md hover:bg-blue-800 transition-colors disabled:opacity-70 flex justify-center items-center gap-2">
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                  </span>
                ) : step === totalSteps ? (
                  "Submit Application"
                ) : (
                  "Next Step"
                )}
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

      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              className="relative w-full max-w-md bg-card rounded-3xl shadow-2xl border border-border p-8 text-center">
              <div className="w-16 h-16 bg-green-50 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-400">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Application Submitted!
              </h2>
              <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                Your registration has been successfully received and is
                currently{" "}
                <strong className="text-foreground">
                  pending Admin approval
                </strong>
                .
                <br />
                <br />
                Once approved by the portal administrator, your official{" "}
                <strong className="text-foreground">
                  Matriculation Number
                </strong>{" "}
                and{" "}
                <strong className="text-foreground">Activation Token</strong>{" "}
                will be distributed for portal activation.
              </p>
              <button
                onClick={handleCloseAndRedirect}
                className="w-full py-3.5 bg-blue-900 dark:bg-blue-700 text-white rounded-xl font-bold shadow-md hover:bg-blue-800 transition-colors">
                Proceed to Login Page
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Register;
