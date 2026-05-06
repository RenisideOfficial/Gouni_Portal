// src/app/(root)/dashboard/admin/students/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShieldAlert,
  UserCheck,
  UserX,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Download,
  KeyRound,
} from "lucide-react";

// ==========================================
// HCI UTILITIES
// ==========================================
const getDeptCode = (prog: string) => {
  if (!prog) return "GEN";
  // Map specific strings to traditional standard Nigerian university codes
  const codes: Record<string, string> = {
    "Computer Science": "CSC",
    Microbiology: "MCB",
    Accounting: "ACC",
    Economics: "ECO",
    "Medicine and Surgery": "MED",
    "Nursing Sciences": "NUR",
    "Banking and Finance": "BNK",
    "Business Education": "BED",
    Architecture: "ARC",
    "Mass Communications": "MAC",
    "Public Administration": "PUB",
    "Political Science": "POL",
    Biochemistry: "BCH",
    "Industrial Chemistry": "ICH",
    "Applied Biology": "APB",
  };

  if (codes[prog]) return codes[prog];
  // Fallback: Use first 3 letters for unmapped departments
  return prog.length >= 3 ? prog.substring(0, 3).toUpperCase() : "GEN";
};

const generateMatricNumber = (program: string) => {
  const year = new Date().getFullYear().toString().slice(-2);
  const deptCode = getDeptCode(program);
  const randomNum = Math.floor(100 + Math.random() * 900); // 3 digits
  return `GOU/U${year}/${deptCode}/${randomNum}`;
};

const generateToken = () => {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
};
// ==========================================

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = () => {
      const storedUsers = JSON.parse(
        localStorage.getItem("gouni_users") || "[]",
      );
      const studentUsers = storedUsers.filter((u: any) => u.role === "student");

      const formattedStudents = studentUsers.map((s: any) => ({
        id: s.id,
        email: s.email,
        reg: s.regNumber || s.jambNumber || "PENDING",
        name: s.name || `${s.firstName} ${s.lastName}`,
        faculty: s.faculty || "Faculty Missing",
        prog: s.prog || "Department Missing",
        status: s.status || "Pending",
        token: s.activationToken || "",
      }));

      if (formattedStudents.length === 0) {
        const mockData = [
          {
            id: "mock1",
            regNumber: "GOU/U24/CSC/858",
            name: "Ngozi Chukwumaobim",
            faculty: "Computing and Info. Tech",
            prog: "Computer Science",
            status: "Active",
            email: "ngozi@example.com",
            activationToken: "87654321",
          },
          {
            id: "mock2",
            jambNumber: "202412345678EF",
            name: "Samuel Nnana",
            faculty: "Management & Social Sciences",
            prog: "Accounting",
            status: "Pending",
            email: "samuel@example.com",
          },
        ];
        localStorage.setItem(
          "gouni_users",
          JSON.stringify([
            ...storedUsers,
            ...mockData.map((m) => ({ ...m, role: "student" })),
          ]),
        );

        setStudents(
          mockData.map((s) => ({
            id: s.id,
            email: s.email,
            reg: s.regNumber || s.jambNumber || "PENDING",
            name: s.name,
            faculty: s.faculty,
            prog: s.prog,
            status: s.status,
            token: s.activationToken || "",
          })),
        );
      } else {
        setStudents(formattedStudents);
      }
    };
    fetchStudents();
  }, []);

  const handleAdmissionAction = async (
    id: string,
    action: "Approve" | "Reject",
  ) => {
    setProcessingId(id);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const isApprove = action === "Approve";
    const newStatus = isApprove ? "Active" : "Rejected";
    let newRegNumber = "";
    let newToken = "";

    const storedUsers = JSON.parse(localStorage.getItem("gouni_users") || "[]");
    const updatedUsers = storedUsers.map((u: any) => {
      if (u.id === id) {
        if (isApprove) {
          newRegNumber = generateMatricNumber(u.prog);
          newToken = generateToken();
          return {
            ...u,
            status: newStatus,
            regNumber: newRegNumber,
            activationToken: newToken,
          };
        }
        return { ...u, status: newStatus };
      }
      return u;
    });
    localStorage.setItem("gouni_users", JSON.stringify(updatedUsers));

    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          return {
            ...s,
            status: newStatus,
            reg: isApprove ? newRegNumber : "REJECTED",
            token: isApprove ? newToken : "",
          };
        }
        return s;
      }),
    );
    setProcessingId(null);
  };

  const toggleSuspend = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "Active" ? "Suspended" : "Active";
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s)),
    );
    const storedUsers = JSON.parse(localStorage.getItem("gouni_users") || "[]");
    localStorage.setItem(
      "gouni_users",
      JSON.stringify(
        storedUsers.map((u: any) =>
          u.id === id ? { ...u, status: newStatus } : u,
        ),
      ),
    );
  };

  const exportCredentialsCSV = () => {
    const storedUsers = JSON.parse(localStorage.getItem("gouni_users") || "[]");
    const activeStudents = storedUsers.filter(
      (u: any) => u.role === "student" && u.status === "Active",
    );
    if (activeStudents.length === 0)
      return alert("No active/approved students available to export.");

    const headers = [
      "Full Name",
      "Email",
      "Faculty",
      "Department",
      "Matriculation Number",
      "Activation Token",
    ];
    const csvRows = [headers.join(",")];
    activeStudents.forEach((s: any) => {
      const row = [
        `"${s.name || s.firstName + " " + s.lastName}"`,
        `"${s.email}"`,
        `"${s.faculty || "N/A"}"`,
        `"${s.prog || "N/A"}"`,
        `"${s.regNumber || ""}"`,
        `"${s.activationToken || ""}"`,
      ];
      csvRows.push(row.join(","));
    });

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `GOUNI_Credentials_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.reg.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-foreground">
          Student Management
        </h1>
        <button
          onClick={exportCredentialsCSV}
          className="flex items-center gap-2 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 px-4 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm">
          <Download className="w-4 h-4" /> Export Active Credentials (CSV)
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex bg-background border border-input px-4 py-2 rounded-lg text-sm focus-within:border-blue-500 transition-colors w-full sm:w-80">
            <Search className="w-4 h-4 text-muted-foreground mr-2 mt-0.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search name or Jamb/Reg ID..."
              className="bg-transparent outline-none w-full text-foreground"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-background border border-input text-foreground px-4 py-2 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors w-full sm:w-auto font-medium">
            <option value="All">All Statuses</option>
            <option value="Pending">Pending Approval</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
              <tr>
                <th className="px-6 py-4 font-medium">Reg / JAMB ID</th>
                <th className="px-6 py-4 font-medium">Full Name</th>
                <th className="px-6 py-4 font-medium">Academic Program</th>
                <th className="px-6 py-4 font-medium">Portal Credentials</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <AnimatePresence>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((item) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-bold text-foreground tracking-wide">
                        {item.reg}
                      </td>
                      <td className="px-6 py-4 font-medium text-foreground">
                        {item.name}
                        <p className="text-xs text-muted-foreground font-normal">
                          {item.email}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-foreground">
                        <span className="font-semibold">{item.prog}</span>
                        <p className="text-xs text-muted-foreground">
                          {item.faculty}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        {item.status === "Active" && item.token ? (
                          <div className="bg-slate-100 dark:bg-slate-800 rounded px-3 py-1.5 inline-flex items-center gap-2 border border-slate-200 dark:border-slate-700">
                            <KeyRound className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                            <span className="font-mono font-bold tracking-widest text-foreground">
                              {item.token}
                            </span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-xs italic">
                            Awaiting Approval
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`flex items-center gap-1.5 w-fit text-xs font-bold px-3 py-1 rounded-full ${item.status === "Active" ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400" : item.status === "Pending" ? "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>
                          {item.status === "Active" && (
                            <UserCheck className="w-3.5 h-3.5" />
                          )}
                          {item.status === "Suspended" && (
                            <ShieldAlert className="w-3.5 h-3.5" />
                          )}
                          {item.status === "Rejected" && (
                            <UserX className="w-3.5 h-3.5" />
                          )}
                          {item.status === "Pending" && (
                            <Clock className="w-3.5 h-3.5" />
                          )}
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex justify-end gap-2">
                        {processingId === item.id ? (
                          <div className="flex items-center gap-2 text-muted-foreground px-4 py-1.5">
                            <Loader2 className="w-4 h-4 animate-spin" />{" "}
                            Processing...
                          </div>
                        ) : item.status === "Pending" ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                handleAdmissionAction(item.id, "Reject")
                              }
                              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 dark:text-red-400 dark:bg-red-900/20 dark:hover:bg-red-900/40 rounded-md transition-colors">
                              <XCircle className="w-3.5 h-3.5" /> Reject
                            </button>
                            <button
                              onClick={() =>
                                handleAdmissionAction(item.id, "Approve")
                              }
                              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-green-600 hover:bg-green-700 rounded-md shadow-sm transition-colors">
                              <CheckCircle className="w-3.5 h-3.5" /> Approve &
                              Gen
                            </button>
                          </div>
                        ) : (
                          item.status !== "Rejected" && (
                            <button
                              onClick={() =>
                                toggleSuspend(item.id, item.status)
                              }
                              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-md transition-colors border ${item.status === "Active" ? "text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900/30 dark:hover:bg-red-900/20" : "text-green-600 border-green-200 hover:bg-green-50 dark:border-green-900/30 dark:hover:bg-green-900/20"}`}>
                              <ShieldAlert className="w-3.5 h-3.5" />{" "}
                              {item.status === "Active"
                                ? "Suspend Portal"
                                : "Re-activate Portal"}
                            </button>
                          )
                        )}
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-8 text-center text-muted-foreground">
                      No students found matching your criteria.
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
