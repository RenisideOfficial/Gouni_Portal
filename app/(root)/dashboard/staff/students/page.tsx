"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Users, AlertCircle, Loader2, BookOpen } from "lucide-react";

export default function StudentsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [assignedCourses, setAssignedCourses] = useState<any[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [enrolledStudents, setEnrolledStudents] = useState<any[]>([]);

  // Initial Load: Get Staff & Assigned Courses
  useEffect(() => {
    const initializeData = () => {
      const currentUser = JSON.parse(
        localStorage.getItem("gouni_current_user") || "{}",
      );
      const masterCourses = JSON.parse(
        localStorage.getItem("gouni_master_courses") || "[]",
      );

      if (currentUser && currentUser.id) {
        // Find courses assigned to this specific staff member
        const myCourses = masterCourses.filter(
          (c: any) => c.lecturerId === currentUser.id,
        );
        setAssignedCourses(myCourses);

        if (myCourses.length > 0) {
          setSelectedCourseId(myCourses[0].id); // Select the first course by default
        }
      }
      setIsLoading(false);
    };

    const timer = setTimeout(initializeData, 300);
    return () => clearTimeout(timer);
  }, []);

  // Secondary Effect: Fetch Students when Selected Course Changes
  // FIX: Wrapped in setTimeout to prevent synchronous setState cascading renders
  useEffect(() => {
    const fetchClassList = () => {
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

      // 1. Find all registrations that include this course code
      const relevantRegs = allRegs.filter(
        (reg: any) =>
          reg.courses &&
          reg.courses.some((c: any) => c.code === selectedCourse.code),
      );

      // 2. Extract unique student IDs (to prevent duplicates)
      const uniqueStudentIds = Array.from(
        new Set(relevantRegs.map((r: any) => r.studentId)),
      );

      // 3. Map to actual User objects to get names and levels
      const classList = uniqueStudentIds.map((id) => {
        const student = allUsers.find(
          (u: any) => u.id === id || u.regNumber === id,
        );
        return {
          mat: student?.regNumber || id,
          name: student?.name || "Unknown Student",
          level: student?.level || "100L",
        };
      });

      // Sort alphabetically by name
      classList.sort((a, b) => a.name.localeCompare(b.name));
      setEnrolledStudents(classList);
    };

    // Defer execution to avoid React state-in-effect warning
    const timer = setTimeout(fetchClassList, 0);
    return () => clearTimeout(timer);
  }, [selectedCourseId, assignedCourses]);

  const handleExportCSV = () => {
    if (enrolledStudents.length === 0) return;

    const selectedCourse = assignedCourses.find(
      (c) => c.id === selectedCourseId,
    );
    const courseCode = selectedCourse
      ? selectedCourse.code.replace(/\s+/g, "_")
      : "Course";

    const headers = ["S/N", "Matric Number", "Full Name", "Level"];
    const csvContent = [
      headers.join(","),
      ...enrolledStudents.map(
        (s, i) => `${i + 1},${s.mat},"${s.name}",${s.level}`,
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${courseCode}_Class_List.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Users className="text-blue-600" /> Class Roster
        </h1>
      </motion.div>

      {assignedCourses.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-3xl p-12 text-center">
          <AlertCircle className="w-12 h-12 text-amber-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-amber-900 dark:text-amber-400">
            No Courses Assigned
          </h2>
          <p className="text-sm text-amber-800/70 dark:text-amber-500/70 mt-2 max-w-md mx-auto">
            You currently do not have any courses assigned to your profile.
            Please contact the Department HOD or System Administrator.
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
                className="bg-background border border-input text-foreground font-bold px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-900 transition-all w-full md:w-72 shadow-sm">
                {assignedCourses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.code} — {course.title}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleExportCSV}
              disabled={enrolledStudents.length === 0}
              className="text-xs bg-blue-900 dark:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg w-full md:w-auto justify-center uppercase tracking-widest">
              <Download className="w-4 h-4" /> Export Class List
            </button>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] text-muted-foreground uppercase bg-muted/50 font-black tracking-widest">
                <tr>
                  <th className="px-6 py-5 w-16 text-center">S/N</th>
                  <th className="px-6 py-5">Matric Number</th>
                  <th className="px-6 py-5">Full Name</th>
                  <th className="px-6 py-5">Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {enrolledStudents.length > 0 ? (
                  enrolledStudents.map((item, i) => (
                    <tr key={i} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 text-muted-foreground text-center font-bold">
                        {i + 1}
                      </td>
                      <td className="px-6 py-4 font-mono font-black text-blue-900 dark:text-blue-400">
                        {item.mat}
                      </td>
                      <td className="px-6 py-4 font-bold text-foreground">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground font-semibold">
                        {item.level}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-16 text-center text-muted-foreground">
                      <Users className="w-12 h-12 mx-auto mb-3 opacity-20" />
                      <p className="font-bold text-foreground">
                        No students enrolled yet
                      </p>
                      <p className="text-xs mt-1">
                        Students will appear here once they complete their
                        course registration.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Summary */}
          {enrolledStudents.length > 0 && (
            <div className="p-4 bg-muted/20 border-t border-border flex justify-between items-center text-xs">
              <span className="font-black text-muted-foreground uppercase tracking-widest">
                Total Class Size
              </span>
              <span className="font-black text-blue-900 text-base">
                {enrolledStudents.length} Students
              </span>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
