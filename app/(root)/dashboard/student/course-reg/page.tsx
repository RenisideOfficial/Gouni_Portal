"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  CheckCircle,
  Printer,
  Loader2,
  BookOpen,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function CourseRegistrationPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [checking, setChecking] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const [session, setSession] = useState("2025/2026");
  const [semester, setSemester] = useState("1st Semester");

  const [hasPaid, setHasPaid] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [availableCourses, setAvailableCourses] = useState<any[]>([]);
  const [missingFees, setMissingFees] = useState<string[]>([]);

  useEffect(() => {
    const checkStatus = () => {
      const storedUser = JSON.parse(
        localStorage.getItem("gouni_current_user") || "null",
      );
      if (!storedUser) return;
      setUser(storedUser);

      // 1. Prerequisite Check (Session Specific)
      const required = JSON.parse(
        localStorage.getItem("gouni_registration_requirements") ||
          '["Tuition Fee"]',
      );
      const payments = JSON.parse(
        localStorage.getItem("gouni_payments") || "[]",
      );
      const paidNames = payments
        .filter(
          (p: any) =>
            p.studentId === (storedUser.regNumber || storedUser.id) &&
            p.session === session &&
            p.status === "Paid",
        )
        .map((p: any) => p.type);

      const missing = required.filter((f: string) => !paidNames.includes(f));
      setMissingFees(missing);
      setHasPaid(missing.length === 0);

      // 2. Registration Existence Check
      const allRegs = JSON.parse(
        localStorage.getItem("gouni_registrations") || "[]",
      );
      setAlreadyRegistered(
        allRegs.some(
          (r: any) =>
            r.studentId === (storedUser.regNumber || storedUser.id) &&
            r.session === session &&
            r.semester === semester,
        ),
      );

      // 3. Dynamic Course Fetch from Master Storage
      const masterCourses = JSON.parse(
        localStorage.getItem("gouni_master_courses") || "[]",
      );
      const filtered = masterCourses.filter(
        (c: any) =>
          c.dept === storedUser.prog &&
          c.level === (storedUser.level || "100L") &&
          c.semester === semester,
      );
      setAvailableCourses(filtered);

      setChecking(false);
    };

    const timer = setTimeout(checkStatus, 200);
    return () => clearTimeout(timer);
  }, [session, semester]);

  const handleRegister = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const registration = {
        studentId: user.regNumber || user.id,
        courses: availableCourses,
        date: new Date().toLocaleDateString("en-GB"),
        session,
        semester,
        timestamp: Date.now(),
      };
      const existing = JSON.parse(
        localStorage.getItem("gouni_registrations") || "[]",
      );
      localStorage.setItem(
        "gouni_registrations",
        JSON.stringify([...existing, registration]),
      );
      setIsProcessing(false);
      setAlreadyRegistered(true);
    }, 1200);
  };

  if (checking)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-blue-900" />
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Course Registration
          </h1>
          <p className="text-muted-foreground text-sm">
            Enroll for academic credits for {session}
          </p>
        </div>
        {alreadyRegistered && (
          <button
            onClick={() =>
              router.push(
                `/student/course-reg-printout?session=${session}&semester=${semester}`,
              )
            }
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md hover:bg-green-700 transition-all">
            <Printer size={16} /> Print {semester} Slip
          </button>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-card p-6 rounded-2xl border border-border shadow-sm">
        <div>
          <label className="text-xs font-black text-muted-foreground uppercase block mb-2">
            Session
          </label>
          <select
            value={session}
            onChange={(e) => setSession(e.target.value)}
            className="w-full bg-background border border-input p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-900">
            <option>2025/2026</option>
            <option>2024/2025</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-black text-muted-foreground uppercase block mb-2">
            Semester
          </label>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full bg-background border border-input p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-900">
            <option>1st Semester</option>
            <option>2nd Semester</option>
          </select>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!hasPaid ? (
          <motion.div
            key="locked"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-3xl p-10 text-center">
            <Lock className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-amber-900 dark:text-amber-400">
              Payments Required for {session}
            </h2>
            <p className="text-sm text-amber-800/70 dark:text-amber-500/70 mt-2 mb-6">
              Settlement of{" "}
              <span className="font-black">{missingFees.join(" & ")}</span> is
              mandatory before registration.
            </p>
            <button
              onClick={() => router.push("/dashboard/student/payments")}
              className="bg-amber-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-amber-700 transition-all">
              Go to Payments
            </button>
          </motion.div>
        ) : alreadyRegistered ? (
          <motion.div
            key="complete"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 rounded-3xl p-10 text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-green-900 dark:text-green-400">
              Registration Confirmed
            </h2>
            <p className="text-sm text-green-800/70 mt-2">
              You are officially registered for the {semester} of the {session}{" "}
              session.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6 bg-muted/30 border-b border-border flex items-center justify-between">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <BookOpen size={18} className="text-blue-600" /> {semester}{" "}
                Courses
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 text-muted-foreground uppercase text-[10px] tracking-widest font-bold">
                  <tr>
                    <th className="px-8 py-4">Code</th>
                    <th className="px-8 py-4">Title</th>
                    <th className="px-8 py-4 text-right">Units</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {availableCourses.map((c, i) => (
                    <tr key={i} className="hover:bg-muted/20">
                      <td className="px-8 py-4 font-bold text-foreground font-mono">
                        {c.code}
                      </td>
                      <td className="px-8 py-4 text-foreground font-medium">
                        {c.title}
                      </td>
                      <td className="px-8 py-4 text-foreground text-right font-black">
                        {c.units}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-2 text-xs text-muted-foreground max-w-md">
                <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                <p>
                  Finalize registration for {user?.level || "your level"} -{" "}
                  {semester}.
                </p>
              </div>
              <button
                onClick={handleRegister}
                disabled={isProcessing || availableCourses.length === 0}
                className="w-full sm:w-auto bg-blue-900 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-800 transition-all flex items-center justify-center gap-2 shadow-lg">
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4" /> Processing...
                  </>
                ) : (
                  "Submit Registration"
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
