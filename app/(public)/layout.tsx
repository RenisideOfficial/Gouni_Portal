// src/app/(public)/layout.tsx
import React from "react";
import Navbar from "@/components/pages/home/Navbar";
import Footer from "@/components/pages/home/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
