// src/components/pages/core/student/Sidebar.tsx
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  CreditCard,
  BookOpen,
  Building,
  CheckSquare,
  FileText,
  HelpCircle,
  LogOut,
  X,
  User,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { name: "Dashboard", href: "/dashboard/student", icon: LayoutDashboard },
  { name: "Payments", href: "/dashboard/student/payments", icon: CreditCard },
  {
    name: "Course Reg.",
    href: "/dashboard/student/course-reg",
    icon: BookOpen,
  },
  { name: "Hostel", href: "/dashboard/student/hostel", icon: Building },
  {
    name: "Clearance",
    href: "/dashboard/student/clearance",
    icon: CheckSquare,
  },
  { name: "Result", href: "/dashboard/student/result", icon: FileText },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  // State to hold dynamically fetched student data
  const [studentUser, setStudentUser] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const storedUser = localStorage.getItem("gouni_current_user");
      if (storedUser) {
        try {
          setStudentUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Failed to parse current user data", error);
        }
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="md:hidden fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <aside
        className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border flex flex-col transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="md:hidden absolute top-6 right-4 p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors">
          <X className="w-5 h-5" />
        </button>

        {/* Logo Area */}
        <div className="p-6 flex items-center gap-3 border-b border-border/50 flex-shrink-0">
          <img src="/images/gouni_logo.svg" alt="GOUNI" className="w-8 h-8" />
          <span className="font-bold text-sm text-foreground tracking-wider uppercase">
            Student Portal
          </span>
        </div>

        {/* Profile Summary - Now Dynamic */}
        <div className="p-6 flex flex-col items-center border-b border-border/50 flex-shrink-0">
          <Link href="/dashboard/student/profile" onClick={onClose}>
            <div className="w-20 h-20 rounded-full border-4 border-blue-50 dark:border-blue-900/30 overflow-hidden mb-3 hover:opacity-80 transition-opacity cursor-pointer">
              <img
                src={studentUser?.avatar || "/images/chinweike.jpg"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
          <h3 className="font-bold text-foreground text-center">
            {studentUser ? studentUser.name : "Loading..."}
          </h3>
          <span className="text-xs text-muted-foreground mt-1">
            {studentUser ? studentUser.level || "100 Level" : "..."}
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;

            return (
              <Link key={link.name} href={link.href} onClick={onClose}>
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-semibold"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}>
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{link.name}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Links */}
        <div className="p-4 border-t border-border/50 space-y-1.5 flex-shrink-0">
          <Link href="/dashboard/student/profile" onClick={onClose}>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer">
              <User className="w-5 h-5" />
              <span className="text-sm">Profile Settings</span>
            </div>
          </Link>
          <Link href="/dashboard/student/help" onClick={onClose}>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer">
              <HelpCircle className="w-5 h-5" />
              <span className="text-sm">Help Center</span>
            </div>
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem("gouni_current_user");
              window.location.href = "/login";
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Log out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
