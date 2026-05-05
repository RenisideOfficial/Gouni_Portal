// src/app/(root)/dashboard/staff/results/page.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { UploadCloud } from "lucide-react";

export default function ResultsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">
          Result Management
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm">
        <h2 className="text-sm font-bold text-foreground mb-4">
          Upload Results
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <select className="bg-background border border-input text-foreground px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-900/50 transition-all">
            <option value="" disabled selected hidden>
              Select Course
            </option>
            <option>CSC 401 - Data Structures</option>
            <option>CSC 405 - Artificial Intelligence</option>
          </select>
          <select className="bg-background border border-input text-foreground px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-900/50 transition-all">
            <option value="" disabled selected hidden>
              Session
            </option>
            <option>2025/2026</option>
          </select>
          <select className="bg-background border border-input text-foreground px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-900/50 transition-all">
            <option value="" disabled selected hidden>
              Semester
            </option>
            <option>1st Semester</option>
          </select>
        </div>

        <div className="border-2 border-dashed border-border rounded-xl p-12 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer mb-6">
          <UploadCloud className="w-10 h-10 text-muted-foreground mb-4" />
          <p className="text-foreground font-medium mb-1">
            Click to upload CSV
          </p>
          <p className="text-xs text-muted-foreground">
            or drag and drop your excel file here
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button className="px-6 py-2.5 rounded-xl font-medium text-muted-foreground hover:bg-muted transition-colors">
            Preview
          </button>
          <button className="bg-blue-900 dark:bg-blue-700 text-white px-8 py-2.5 rounded-xl font-medium hover:bg-blue-800 transition-colors shadow-sm">
            Publish Results
          </button>
        </div>
      </motion.div>
    </div>
  );
}
