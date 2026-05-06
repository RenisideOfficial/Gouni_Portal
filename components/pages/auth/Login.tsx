// src/components/pages/auth/Login.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, Variants, AnimatePresence } from "framer-motion";
import ActivationModal from "./ActivationModal";

type Role = "student" | "staff" | "admin";

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isActivationModalOpen, setActivationModalOpen] = useState(false);

  // Local State for Authentication
  const [activeRole, setActiveRole] = useState<Role>("student");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Dynamic configuration based on SRS User Classes
  const roleConfig = {
    student: {
      label: "Log In",
      title: "Welcome Back",
      idPlaceholder: "Matric Number or Email",
      image: "/images/student_studying.jpg",
    },
    staff: {
      label: "Staff Portal",
      title: "Staff Login",
      idPlaceholder: "Staff ID or Email",
      image: "/images/staff_login_bg.jpg",
    },
    admin: {
      label: "Management",
      title: "Admin Access",
      idPlaceholder: "Admin ID or Email",
      image: "/images/admin_login_bg.jpg",
    },
  };

  const handleActivationSuccess = (regNumber: string) => {
    setActiveRole("student");
    setIdentifier(regNumber);
    setPassword("");
    setSuccessMessage(
      "Account activated successfully! Please enter your password to log in.",
    );
    setTimeout(() => setSuccessMessage(""), 8000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Fetch users from our simulated LocalStorage Database
    const users = JSON.parse(localStorage.getItem("gouni_users") || "[]");

    // Find a user that matches the identifier, password, and active role tab
    let user = users.find(
      (u: any) =>
        (u.email?.toLowerCase() === identifier.toLowerCase() ||
          u.regNumber?.toLowerCase() === identifier.toLowerCase() ||
          u.staffId?.toLowerCase() === identifier.toLowerCase() ||
          u.adminId?.toLowerCase() === identifier.toLowerCase()) &&
        u.password === password &&
        u.role === activeRole,
    );

    // Fallbacks for the demo
    if (!user) {
      if (
        activeRole === "admin" &&
        identifier.toLowerCase() === "admin" &&
        password === "admin"
      ) {
        user = { role: "admin", name: "System Admin", id: "GOU/ADMIN/001" };
      } else if (
        activeRole === "staff" &&
        identifier.toLowerCase() === "staff" &&
        password === "staff"
      ) {
        user = { role: "staff", name: "Dr. Emeka", id: "GOU/STAFF/045" };
      } else if (
        activeRole === "student" &&
        identifier.toLowerCase() === "student" &&
        password === "student"
      ) {
        user = {
          role: "student",
          name: "Demo Student",
          regNumber: "GOU/U24/DEMO",
          status: "Active",
          isActivated: true,
        };
      }
    }

    if (user) {
      // Logic guards for Student Accounts
      if (user.role === "student") {
        if (user.status === "Pending") {
          setError("Your application is still pending administrator approval.");
          return;
        }
        if (user.status === "Rejected") {
          setError(
            "Your application has been rejected. Please contact admissions.",
          );
          return;
        }
        if (user.status === "Suspended") {
          setError(
            "Your portal access has been suspended. Please contact the ICT Directorate.",
          );
          return;
        }
        if (!user.isActivated && user.activationToken) {
          setError("You must activate your account first before logging in.");
          setActivationModalOpen(true);
          return;
        }
      }

      // Create session and redirect
      localStorage.setItem("gouni_current_user", JSON.stringify(user));
      router.push(`/dashboard/${activeRole}`);
    } else {
      setError("Invalid credentials. Please check your ID and Password.");
    }
  };

  return (
    <>
      <div className="min-h-screen w-full flex bg-background transition-colors duration-300 overflow-hidden">
        {/* Left Form Side */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 lg:px-32 relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-8 left-8 sm:top-12 sm:left-12">
            <Link
              href="/"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors">
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
            <motion.div
              variants={fadeUpVariants}
              className="mb-8 text-center lg:text-left flex justify-center lg:justify-start">
              <Link href="/">
                <img
                  src="/images/gouni_logo.svg"
                  alt="GO University Seal"
                  className="h-14 w-14 object-contain"
                />
              </Link>
            </motion.div>

            {/* Role Switcher Toggle */}
            <motion.div
              variants={fadeUpVariants}
              className="bg-muted p-1 rounded-xl flex mb-8 relative">
              {(["student", "staff", "admin"] as Role[]).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => {
                    setActiveRole(role);
                    setError("");
                    setSuccessMessage("");
                  }}
                  className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider relative z-10 transition-colors ${activeRole === role ? "text-white" : "text-muted-foreground"}`}>
                  {role}
                </button>
              ))}
              <motion.div
                layoutId="activeRoleTab"
                className="absolute inset-y-1 bg-blue-900 dark:bg-blue-700 rounded-lg shadow-sm"
                initial={false}
                animate={{
                  x:
                    activeRole === "student"
                      ? "0%"
                      : activeRole === "staff"
                        ? "100%"
                        : "200%",
                  width: "33.33%",
                }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeRole}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="mb-6 text-center lg:text-left">
                <span className="text-blue-700 dark:text-blue-400 font-bold text-xs tracking-widest uppercase">
                  {roleConfig[activeRole].label}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                  {roleConfig[activeRole].title}
                </h1>
              </motion.div>
            </AnimatePresence>

            {/* Form */}
            <motion.form
              variants={fadeUpVariants}
              className="space-y-5"
              onSubmit={handleLogin}>
              {/* Message Display Area */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm text-center border border-red-100 dark:border-red-900/30 overflow-hidden">
                    {error}
                  </motion.div>
                )}
                {successMessage && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-3 rounded-lg text-sm text-center border border-green-100 dark:border-green-900/30 overflow-hidden">
                    {successMessage}
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
                  placeholder={roleConfig[activeRole].idPlaceholder}
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
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                      <path
                        d={
                          showPassword
                            ? "M9.88 9.88a3 3 0 1 0 4.24 4.24M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61M2 2l20 22"
                            : "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"
                        }
                      />
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
                type="submit"
                className="w-full py-3.5 bg-blue-900 dark:bg-blue-700 text-white rounded-lg font-bold shadow-md hover:bg-blue-800 transition-colors mt-4">
                Sign In to Portal
              </motion.button>
            </motion.form>

            <AnimatePresence>
              {activeRole === "student" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-8 text-center text-sm text-muted-foreground">
                  First time here?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setError("");
                      setActivationModalOpen(true);
                    }}
                    className="text-blue-700 dark:text-blue-400 font-bold hover:underline focus:outline-none">
                    Activate Account
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
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
            <AnimatePresence mode="wait">
              <motion.img
                key={activeRole}
                src={roleConfig[activeRole].image}
                alt={`${activeRole} workspace`}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <ActivationModal
        isOpen={isActivationModalOpen}
        onClose={() => setActivationModalOpen(false)}
        onSuccess={handleActivationSuccess}
      />
    </>
  );
};

export default Login;
