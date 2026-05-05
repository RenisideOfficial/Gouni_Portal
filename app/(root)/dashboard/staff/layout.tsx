// src/app/(root)/dashboard/staff/layout.tsx
"use client";
import React, { useState } from "react";
import Sidebar from "@/components/pages/core/staff/Sidebar";
import Topbar from "@/components/pages/core/staff/Topbar";

export default function StaffDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground transition-colors duration-300">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col relative w-full">
        <Topbar onOpenSidebar={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50 dark:bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
