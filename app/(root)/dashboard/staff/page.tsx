"use client";
import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import {
  FileSpreadsheet,
  Users,
  Download,
  ArrowRight,
  BookOpen,
  AlertCircle,
  Loader2,
} from "lucide-react";
import Link from "next/link";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function StaffDashboardHome() {
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("Staff Member");
  const [stats, setStats] = useState({
    courses: 0,
    students: 0,
    pendingUploads: 0,
  });
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboardData = () => {
      const currentUser = JSON.parse(
        localStorage.getItem("gouni_current_user") || "{}",
      );
      const masterCourses = JSON.parse(
        localStorage.getItem("gouni_master_courses") || "[]",
      );
      const allRegs = JSON.parse(
        localStorage.getItem("gouni_registrations") || "[]",
      );
      const allResults = JSON.parse(
        localStorage.getItem("gouni_results") || "{}",
      );

      if (currentUser && currentUser.name) {
        // Extract first name or prefix
        const nameParts = currentUser.name.split(" ");
        setUserName(
          nameParts.length > 1
            ? `${nameParts[0]} ${nameParts[1]}`
            : nameParts[0],
        );
      }

      // 1. Get Assigned Courses
      const myCourses = masterCourses.filter(
        (c: any) => c.lecturerId === currentUser.id,
      );
      const myCourseCodes = myCourses.map((c: any) => c.code);

      // 2. Calculate Total Unique Students
      const studentSet = new Set();
      allRegs.forEach((reg: any) => {
        if (
          reg.courses &&
          reg.courses.some((c: any) => myCourseCodes.includes(c.code))
        ) {
          studentSet.add(reg.studentId);
        }
      });

      // 3. Calculate Pending Results & Build Activity Feed
      let pendingCount = 0;
      const recentActs: any[] = [];

      myCourses.forEach((course: any) => {
        const hasResult = !!allResults[course.code];
        if (!hasResult) {
          pendingCount++;
        }
        recentActs.push({
          code: course.code,
          title: course.title,
          status: hasResult ? "Published" : "Pending",
          semester: course.semester || "Current Semester",
        });
      });

      setStats({
        courses: myCourses.length,
        students: studentSet.size,
        pendingUploads: pendingCount,
      });
      setActivities(recentActs.slice(0, 4)); // Show only up to 4 recent activities
      setIsLoading(false);
    };

    const timer = setTimeout(fetchDashboardData, 300);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-900" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 px-4 sm:px-0">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Welcome, {userName} 👋
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Here is your academic overview for the session.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Assigned Courses Card */}
        <motion.div
          variants={itemVariants}
          className="bg-card p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30 shadow-sm flex flex-col justify-between h-32 hover:border-blue-500/50 transition-colors">
          <div className="flex justify-between items-start">
            <span className="text-xs font-black text-blue-700 dark:text-blue-400 uppercase tracking-widest">
              Assigned Courses
            </span>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-4xl font-black text-foreground self-end">
            {stats.courses}
          </span>
        </motion.div>

        {/* Pending Results Card */}
        <motion.div
          variants={itemVariants}
          className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between h-32 hover:border-amber-500/50 transition-colors">
          <div className="flex justify-between items-start">
            <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">
              Pending Uploads
            </span>
            <AlertCircle
              className={`w-4 h-4 ${stats.pendingUploads > 0 ? "text-amber-600" : "text-muted-foreground"}`}
            />
          </div>
          <span
            className={`text-4xl font-black self-end ${stats.pendingUploads > 0 ? "text-amber-600 dark:text-amber-400" : "text-foreground"}`}>
            {stats.pendingUploads}
          </span>
        </motion.div>

        {/* Total Students Card */}
        <motion.div
          variants={itemVariants}
          className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between h-32 hover:border-green-500/50 transition-colors">
          <div className="flex justify-between items-start">
            <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">
              Enrolled Students
            </span>
            <Users className="w-4 h-4 text-green-600" />
          </div>
          <span className="text-4xl font-black text-foreground self-end">
            {stats.students}
          </span>
        </motion.div>
      </motion.div>

      {/* QUICK ACTIONS GRID */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        className="pt-4">
        <h2 className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-6">
          Quick Tools
        </h2>
        <div className="grid grid-cols-1 xs:grid-cols-3 gap-4">
          <Link
            href="/dashboard/staff/results"
            className="group flex flex-col items-center justify-center gap-3 bg-card border border-border p-6 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:border-blue-500/50 transition-all">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-700 dark:text-blue-400 group-hover:scale-110 transition-transform">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <span className="font-bold text-sm">Upload Results</span>
          </Link>

          <Link
            href="/dashboard/staff/students"
            className="group flex flex-col items-center justify-center gap-3 bg-card border border-border p-6 rounded-2xl hover:bg-green-50 dark:hover:bg-green-900/10 hover:border-green-500/50 transition-all">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl text-green-700 dark:text-green-400 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <span className="font-bold text-sm">Class Roster</span>
          </Link>

          <Link
            href="/dashboard/staff/salary"
            className="group flex flex-col items-center justify-center gap-3 bg-card border border-border p-6 rounded-2xl hover:bg-amber-50 dark:hover:bg-amber-900/10 hover:border-amber-500/50 transition-all">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl text-amber-700 dark:text-amber-400 group-hover:scale-110 transition-transform">
              <Download className="w-6 h-6" />
            </div>
            <span className="font-bold text-sm">Payrolls</span>
          </Link>
        </div>
      </motion.div>

      {/* RECENT ACTIVITY */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between bg-muted/20">
          <h2 className="text-sm font-black text-foreground uppercase tracking-widest">
            Course Status Overview
          </h2>
          <Link
            href="/dashboard/staff/results"
            className="text-xs text-blue-700 dark:text-blue-400 font-bold hover:underline flex items-center gap-1 uppercase tracking-widest">
            Manage <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="p-6 space-y-4">
          {activities.length > 0 ? (
            activities.map((act, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b border-border pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="font-bold text-foreground text-sm">
                    {act.code} - {act.title}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">
                    {act.semester}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${
                    act.status === "Published"
                      ? "bg-green-50 text-green-700 border-green-100 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/30 dark:text-amber-400"
                  }`}>
                  {act.status}
                </span>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-20" />
              <p className="text-sm font-medium">
                No courses have been assigned to you yet.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
