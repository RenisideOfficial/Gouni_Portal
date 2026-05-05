// src/app/help/page.tsx
"use client";
import React from "react";
import { motion, Variants } from "framer-motion";

const helpTopics = [
  {
    title: "Account & Login",
    description:
      "Help with account activation, login issues, and password reset.",
  },
  {
    title: "Course Registration",
    description:
      "Step-by-step guide to selecting and registering your courses.",
  },
  {
    title: "Results",
    description: "Understand how to view results and track GPA/CGPA.",
  },
  {
    title: "Clearance",
    description:
      "Learn how clearance works and track your progress across units.",
  },
  {
    title: "Hostel",
    description:
      "Help with viewing, booking, and managing hostel accommodation.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function HelpCenterPage() {
  return (
    <div className="pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-3">Help Center</h1>
        <p className="text-slate-600">What do you need help with?</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-4">
        {helpTopics.map((topic, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.01, borderColor: "#1E3A8A" }}
            className="border border-slate-200 rounded-lg p-6 bg-white cursor-pointer transition-colors hover:shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-1">{topic.title}</h3>
            <p className="text-sm text-slate-600">{topic.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 text-center">
        <p className="text-slate-600 mb-4">Still need help?</p>
        <button className="bg-blue-900 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-800 transition-colors">
          Contact Support
        </button>
      </motion.div>
    </div>
  );
}
