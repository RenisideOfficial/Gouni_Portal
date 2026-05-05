// src/app/(root)/dashboard/admin/admissions/page.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Mail } from "lucide-react";

export default function AdmissionsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">
          Pending Admissions
        </h1>
        <button className="bg-blue-900 dark:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors shadow-sm">
          Approve Selected
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <p className="text-sm text-muted-foreground">
            Approve applicants to automatically generate and email their
            Matriculation Number and Activation Token.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
              <tr>
                <th className="px-6 py-4 font-medium w-12">
                  <input type="checkbox" className="rounded border-input" />
                </th>
                <th className="px-6 py-4 font-medium">Applicant Name</th>
                <th className="px-6 py-4 font-medium">Program Applied</th>
                <th className="px-6 py-4 font-medium">JAMB Score</th>
                <th className="px-6 py-4 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                {
                  name: "Samuel Nnana",
                  prog: "B.Sc Computer Science",
                  score: 265,
                },
                { name: "Grace Okon", prog: "B.Sc Nursing", score: 240 },
                {
                  name: "Daniel Chukwu",
                  prog: "B.Eng Software Engineering",
                  score: 280,
                },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-input" />
                  </td>
                  <td className="px-6 py-4 font-medium text-foreground">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {item.prog}
                  </td>
                  <td className="px-6 py-4 font-semibold text-foreground">
                    {item.score}
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button className="flex items-center gap-1.5 text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-3 py-1.5 rounded-full hover:bg-green-100 transition-colors">
                      <CheckCircle className="w-3.5 h-3.5" /> Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
