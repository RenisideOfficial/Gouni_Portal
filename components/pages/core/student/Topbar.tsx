// src/components/pages/core/student/Topbar.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Search, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link";

interface TopbarProps {
  onOpenSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onOpenSidebar }) => {
  const [studentUser, setStudentUser] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const storedUser = localStorage.getItem("gouni_current_user");
      if (storedUser) {
        try {
          setStudentUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Failed to parse current user", error);
        }
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="h-20 flex-shrink-0 bg-background border-b border-border flex items-center justify-between px-4 sm:px-8 z-30 transition-colors duration-300">
      {/* Mobile Menu Button (Hidden on Desktop) */}
      <button
        onClick={onOpenSidebar}
        className="md:hidden p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">
        <Menu className="w-6 h-6" />
      </button>

      {/* Search Bar */}
      <div className="hidden sm:flex items-center bg-muted px-4 py-2.5 rounded-full w-full max-w-md border border-transparent focus-within:border-blue-900/30 dark:focus-within:border-blue-500/30 transition-all ml-4 md:ml-0">
        <Search className="w-4 h-4 text-muted-foreground mr-3" />
        <input
          type="text"
          placeholder="Search courses, payments..."
          className="bg-transparent border-none outline-none w-full text-sm text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4 ml-auto">
        <ThemeToggle />
        {/* Mobile Profile Avatar - Now Dynamic */}
        <Link
          href="/dashboard/student/profile"
          className="md:hidden w-10 h-10 rounded-full border-2 border-border overflow-hidden">
          <img
            src={studentUser?.avatar || "/images/chinweike.jpg"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
    </header>
  );
};

export default Topbar;
