// src/components/pages/core/admin/Topbar.tsx
"use client";
import React from "react";
import { Search, Menu, Bell } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface TopbarProps {
  onOpenSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onOpenSidebar }) => {
  return (
    <header className="h-20 flex-shrink-0 bg-background border-b border-border flex items-center justify-between px-4 sm:px-8 z-30 transition-colors duration-300">
      <button
        onClick={onOpenSidebar}
        className="md:hidden p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">
        <Menu className="w-6 h-6" />
      </button>

      <div className="hidden sm:flex items-center bg-muted px-4 py-2.5 rounded-full w-full max-w-md border border-transparent focus-within:border-blue-900/30 dark:focus-within:border-blue-500/30 transition-all ml-4 md:ml-0">
        <Search className="w-4 h-4 text-muted-foreground mr-3" />
        <input
          type="text"
          placeholder="Search students, staff, invoices..."
          className="bg-transparent border-none outline-none w-full text-sm text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <ThemeToggle />
        <div className="md:hidden w-10 h-10 rounded-full border-2 border-border overflow-hidden">
          <img
            src="/images/admin_login_bg.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
