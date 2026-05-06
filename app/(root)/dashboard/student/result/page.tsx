"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Loader2,
  BookOpen,
  AlertCircle,
  Award,
  Printer,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ResultPage() {
  const router = useRouter();
  const [session, setSession] = useState("2025/2026");
  const [semester, setSemester] = useState("1st Semester");

  const [isChecking, setIsChecking] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [studentInfo, setStudentInfo] = useState<any>(null);

  // FIX: Wrapped in setTimeout to prevent synchronous setState cascading renders
  useEffect(() => {
    const loadStudentInfo = () => {
      const user = JSON.parse(
        localStorage.getItem("gouni_current_user") || "null",
      );
      setStudentInfo(user);
    };
    const timer = setTimeout(loadStudentInfo, 0);
    return () => clearTimeout(timer);
  }, []);

  const calculateGrade = (ca: number, exam: number) => {
    const total = ca + exam;
    if (total >= 70) return { total, grade: "A", color: "text-green-600" };
    if (total >= 60) return { total, grade: "B", color: "text-green-600" };
    if (total >= 50) return { total, grade: "C", color: "text-amber-600" };
    if (total >= 45) return { total, grade: "D", color: "text-amber-600" };
    if (total >= 40) return { total, grade: "E", color: "text-orange-500" };
    return { total, grade: "F", color: "text-red-600" };
  };

  const handleCheckResults = () => {
    setIsChecking(true);
    setHasChecked(false);

    setTimeout(() => {
      if (!studentInfo) return;

      const studentId = studentInfo.regNumber || studentInfo.id;
      const allRegs = JSON.parse(
        localStorage.getItem("gouni_registrations") || "[]",
      );
      const allResults = JSON.parse(
        localStorage.getItem("gouni_results") || "{}",
      );

      // 1. Find the student's registration for this session/semester
      const currentReg = allRegs.find(
        (r: any) =>
          r.studentId === studentId &&
          r.session === session &&
          r.semester === semester,
      );

      if (!currentReg || !currentReg.courses) {
        setResults([]);
      } else {
        // 2. Map through registered courses and look for published results
        const studentResults = currentReg.courses.map((course: any) => {
          const courseResults = allResults[course.code] || {};
          const myScore = courseResults[studentId];

          if (myScore) {
            const ca = Number(myScore.ca) || 0;
            const exam = Number(myScore.exam) || 0;
            const { total, grade, color } = calculateGrade(ca, exam);
            return {
              ...course,
              ca,
              exam,
              total,
              grade,
              color,
              status: "Published",
            };
          } else {
            return {
              ...course,
              ca: "-",
              exam: "-",
              total: "-",
              grade: "-",
              color: "text-muted-foreground",
              status: "Pending",
            };
          }
        });
        setResults(studentResults);
      }

      setIsChecking(false);
      setHasChecked(true);
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 px-4 sm:px-0">
      {/* Header & Dynamic Print Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Award className="text-blue-600" /> Academic Results
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            View your published continuous assessments and exam scores.
          </p>
        </motion.div>

        {/* Print Button Appears Here if Results Exist */}
        <AnimatePresence>
          {hasChecked && results.length > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() =>
                router.push(
                  `/student/result-printout?session=${session}&semester=${semester}`,
                )
              }
              className="w-full sm:w-auto flex justify-center items-center gap-2 bg-blue-900 text-white px-6 py-3 rounded-xl font-black text-xs hover:bg-blue-800 transition-all shadow-lg uppercase tracking-widest">
              <Printer size={16} /> Print Statement
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card p-6 rounded-3xl border border-border shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <select
            value={session}
            onChange={(e) => setSession(e.target.value)}
            className="w-full md:flex-1 bg-background border border-input text-foreground font-bold px-4 py-3.5 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-900 transition-all">
            <option>2025/2026</option>
            <option>2024/2025</option>
          </select>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full md:flex-1 bg-background border border-input text-foreground font-bold px-4 py-3.5 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-900 transition-all">
            <option>1st Semester</option>
            <option>2nd Semester</option>
          </select>
          <button
            onClick={handleCheckResults}
            disabled={isChecking}
            className="w-full md:w-auto bg-blue-900 text-white px-10 py-3.5 rounded-2xl font-black hover:bg-blue-800 disabled:opacity-50 transition-all shadow-md flex justify-center items-center gap-2 uppercase tracking-widest text-xs">
            {isChecking ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Checking
              </>
            ) : (
              <>
                <Search className="w-4 h-4" /> Check Result
              </>
            )}
          </button>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {hasChecked && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-[2rem] overflow-hidden shadow-sm">
            <div className="p-6 bg-muted/20 border-b border-border flex justify-between items-center">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <BookOpen size={18} className="text-blue-600" /> Result
                Statement: {session} ({semester})
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 text-muted-foreground uppercase text-[10px] tracking-widest font-black">
                  <tr>
                    <th className="px-6 py-5">Course Info</th>
                    <th className="px-6 py-5 text-center">Units</th>
                    <th className="px-6 py-5 text-center">CA</th>
                    <th className="px-6 py-5 text-center">Exam</th>
                    <th className="px-6 py-5 text-center">Total</th>
                    <th className="px-6 py-5 text-center">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {results.length > 0 ? (
                    results.map((res, i) => (
                      <tr
                        key={i}
                        className="hover:bg-muted/20 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-mono font-black text-blue-900 dark:text-blue-400">
                            {res.code}
                          </p>
                          <p className="text-xs font-medium text-foreground">
                            {res.title}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-center font-bold text-muted-foreground">
                          {res.units}
                        </td>
                        <td className="px-6 py-4 text-center font-bold">
                          {res.ca}
                        </td>
                        <td className="px-6 py-4 text-center font-bold">
                          {res.exam}
                        </td>
                        <td className="px-6 py-4 text-center font-black text-lg">
                          {res.total}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {res.status === "Published" ? (
                            <span className={`font-black text-xl ${res.color}`}>
                              {res.grade}
                            </span>
                          ) : (
                            <span className="text-[10px] uppercase font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-200">
                              Pending
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-16 text-center text-muted-foreground">
                        <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p className="font-bold text-foreground">
                          No course registrations found.
                        </p>
                        <p className="text-xs mt-1">
                          You must register for courses in this session before
                          results can be published.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
