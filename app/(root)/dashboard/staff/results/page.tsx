"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Save,
  AlertCircle,
  Loader2,
  BookOpen,
  UserCheck,
  CheckCircle,
} from "lucide-react";

export default function ResultsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Data States
  const [assignedCourses, setAssignedCourses] = useState<any[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [enrolledStudents, setEnrolledStudents] = useState<any[]>([]);

  // Scoring State: { studentId: { ca: number, exam: number } }
  const [scores, setScores] = useState<
    Record<string, { ca: string; exam: string }>
  >({});

  useEffect(() => {
    const initializeData = () => {
      const currentUser = JSON.parse(
        localStorage.getItem("gouni_current_user") || "{}",
      );
      const masterCourses = JSON.parse(
        localStorage.getItem("gouni_master_courses") || "[]",
      );

      if (currentUser && currentUser.id) {
        const myCourses = masterCourses.filter(
          (c: any) => c.lecturerId === currentUser.id,
        );
        setAssignedCourses(myCourses);
        if (myCourses.length > 0) setSelectedCourseId(myCourses[0].id);
      }
      setIsLoading(false);
    };

    const timer = setTimeout(initializeData, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchClassListAndExistingScores = () => {
      if (!selectedCourseId) {
        setEnrolledStudents([]);
        return;
      }

      const selectedCourse = assignedCourses.find(
        (c) => c.id === selectedCourseId,
      );
      if (!selectedCourse) return;

      const allRegs = JSON.parse(
        localStorage.getItem("gouni_registrations") || "[]",
      );
      const allUsers = JSON.parse(localStorage.getItem("gouni_users") || "[]");
      const allResults = JSON.parse(
        localStorage.getItem("gouni_results") || "{}",
      );

      // 1. Find registered students
      const relevantRegs = allRegs.filter(
        (reg: any) =>
          reg.courses &&
          reg.courses.some((c: any) => c.code === selectedCourse.code),
      );
      const uniqueStudentIds = Array.from(
        new Set(relevantRegs.map((r: any) => r.studentId)),
      );

      const classList = uniqueStudentIds.map((id) => {
        const student = allUsers.find(
          (u: any) => u.id === id || u.regNumber === id,
        );
        return {
          id: id as string,
          mat: student?.regNumber || id,
          name: student?.name || "Unknown Student",
          level: student?.level || "100L",
        };
      });

      classList.sort((a, b) => a.name.localeCompare(b.name));
      setEnrolledStudents(classList);

      // 2. Load existing scores for this course if they exist
      const existingCourseResults = allResults[selectedCourse.code] || {};
      setScores(existingCourseResults);
    };

    const timer = setTimeout(fetchClassListAndExistingScores, 0);
    return () => clearTimeout(timer);
  }, [selectedCourseId, assignedCourses]);

  const handleScoreChange = (
    studentId: string,
    field: "ca" | "exam",
    value: string,
  ) => {
    // Basic validation to prevent typing letters
    if (value !== "" && isNaN(Number(value))) return;

    // Limits: CA max 30, Exam max 70
    const numValue = Number(value);
    if (field === "ca" && numValue > 30) return;
    if (field === "exam" && numValue > 70) return;

    setScores((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value,
      },
    }));
  };

  const calculateTotalAndGrade = (
    caStr: string = "0",
    examStr: string = "0",
  ) => {
    const ca = Number(caStr) || 0;
    const exam = Number(examStr) || 0;
    const total = ca + exam;
    let grade = "F";
    let status = "Fail";
    let color = "text-red-600";

    if (total >= 70) {
      grade = "A";
      status = "Pass";
      color = "text-green-600";
    } else if (total >= 60) {
      grade = "B";
      status = "Pass";
      color = "text-green-600";
    } else if (total >= 50) {
      grade = "C";
      status = "Pass";
      color = "text-amber-600";
    } else if (total >= 45) {
      grade = "D";
      status = "Pass";
      color = "text-amber-600";
    } else if (total >= 40) {
      grade = "E";
      status = "Pass";
      color = "text-orange-500";
    }

    return { total, grade, status, color };
  };

  const publishResults = () => {
    setIsSaving(true);
    setTimeout(() => {
      const selectedCourse = assignedCourses.find(
        (c) => c.id === selectedCourseId,
      );
      if (!selectedCourse) return;

      const allResults = JSON.parse(
        localStorage.getItem("gouni_results") || "{}",
      );

      // We save the scores keyed by the Course Code, then by Student ID
      allResults[selectedCourse.code] = scores;

      localStorage.setItem("gouni_results", JSON.stringify(allResults));

      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-blue-900" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 px-4 sm:px-0">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <UserCheck className="text-blue-600" /> Result Management
        </h1>
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-green-700 bg-green-50 px-4 py-2 rounded-xl font-bold text-xs shadow-sm border border-green-200">
            <CheckCircle size={16} /> Results Published Successfully
          </motion.div>
        )}
      </motion.div>

      {assignedCourses.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-3xl p-12 text-center">
          <AlertCircle className="w-12 h-12 text-amber-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-amber-900 dark:text-amber-400">
            No Courses Available
          </h2>
          <p className="text-sm text-amber-800/70 dark:text-amber-500/70 mt-2 max-w-md mx-auto">
            You cannot upload results because no courses have been assigned to
            you.
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
          {/* Header Controls */}
          <div className="p-6 border-b border-border flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-muted/20">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-700 dark:text-blue-400 hidden sm:block">
                <BookOpen size={20} />
              </div>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="bg-background border border-input text-foreground font-bold px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-900 transition-all w-full md:w-80 shadow-sm">
                {assignedCourses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.code} — {course.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Interactive Scoring Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] text-muted-foreground uppercase bg-muted/50 font-black tracking-widest">
                <tr>
                  <th className="px-6 py-5 w-16 text-center">S/N</th>
                  <th className="px-6 py-5">Student Info</th>
                  <th className="px-6 py-5 w-32 text-center">CA (30)</th>
                  <th className="px-6 py-5 w-32 text-center">Exam (70)</th>
                  <th className="px-6 py-5 w-24 text-center">Total</th>
                  <th className="px-6 py-5 w-24 text-center">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {enrolledStudents.length > 0 ? (
                  enrolledStudents.map((student, i) => {
                    const studentScore = scores[student.id] || {
                      ca: "",
                      exam: "",
                    };
                    const computed = calculateTotalAndGrade(
                      studentScore.ca,
                      studentScore.exam,
                    );

                    return (
                      <tr
                        key={student.id}
                        className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 text-muted-foreground text-center font-bold">
                          {i + 1}
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-foreground">
                            {student.name}
                          </p>
                          <p className="text-xs font-mono text-blue-600 dark:text-blue-400">
                            {student.mat}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={studentScore.ca}
                            onChange={(e) =>
                              handleScoreChange(
                                student.id,
                                "ca",
                                e.target.value,
                              )
                            }
                            placeholder="0-30"
                            className="w-full px-3 py-2 bg-background border border-input rounded-lg text-center font-bold outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={studentScore.exam}
                            onChange={(e) =>
                              handleScoreChange(
                                student.id,
                                "exam",
                                e.target.value,
                              )
                            }
                            placeholder="0-70"
                            className="w-full px-3 py-2 bg-background border border-input rounded-lg text-center font-bold outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="font-black text-lg text-foreground">
                            {computed.total}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`font-black text-xl ${computed.color}`}>
                            {computed.grade}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-16 text-center text-muted-foreground">
                      <AlertCircle className="w-10 h-10 mx-auto mb-3 opacity-20" />
                      <p className="font-bold text-foreground">
                        No students enrolled
                      </p>
                      <p className="text-xs mt-1">
                        Students must register for this course before you can
                        input results.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Action */}
          {enrolledStudents.length > 0 && (
            <div className="p-6 bg-muted/20 border-t border-border flex justify-end">
              <button
                onClick={publishResults}
                disabled={isSaving}
                className="w-full sm:w-auto bg-blue-900 dark:bg-blue-700 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-800 transition-all flex items-center justify-center gap-2 shadow-xl disabled:opacity-50">
                {isSaving ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4" /> Saving Data...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" /> Publish Results
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
