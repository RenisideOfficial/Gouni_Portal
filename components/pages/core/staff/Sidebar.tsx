// src/components/pages/core/staff/Sidebar.tsx
"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Wallet,
  FileSpreadsheet,
  Users,
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
  { name: "Dashboard", href: "/dashboard/staff", icon: LayoutDashboard },
  { name: "Salary", href: "/dashboard/staff/salary", icon: Wallet },
  { name: "Results", href: "/dashboard/staff/results", icon: FileSpreadsheet },
  { name: "Students", href: "/dashboard/staff/students", icon: Users },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  return (
    <>
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

      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <button
          onClick={onClose}
          className="md:hidden absolute top-6 right-4 p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 flex items-center gap-3 border-b border-border/50 flex-shrink-0">
          <img src="/images/gouni_logo.svg" alt="GOUNI" className="w-8 h-8" />
          <span className="font-bold text-sm text-foreground tracking-wider uppercase">
            Staff Portal
          </span>
        </div>

        <div className="p-6 flex flex-col items-center border-b border-border/50 flex-shrink-0">
          <Link href="/dashboard/staff/profile" onClick={onClose}>
            <div className="w-20 h-20 rounded-full border-4 border-blue-50 dark:border-blue-900/30 overflow-hidden mb-3 hover:opacity-80 transition-opacity cursor-pointer">
              <img
                src="/images/staff_login_bg.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
          <h3 className="font-bold text-foreground text-center">
            Dr. Emeka Obi
          </h3>
          <span className="text-xs text-muted-foreground mt-1">
            Computer Science
          </span>
        </div>

        <div className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link key={link.name} href={link.href} onClick={onClose}>
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-semibold" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{link.name}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-border/50 space-y-1.5 flex-shrink-0">
          <Link href="/dashboard/staff/profile" onClick={onClose}>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer">
              <User className="w-5 h-5" />
              <span className="text-sm">Profile Settings</span>
            </div>
          </Link>
          <Link href="/dashboard/staff/help" onClick={onClose}>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer">
              <HelpCircle className="w-5 h-5" />
              <span className="text-sm">Help Center</span>
            </div>
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Log out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
