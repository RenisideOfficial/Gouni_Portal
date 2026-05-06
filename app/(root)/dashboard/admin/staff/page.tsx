"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Plus,
  BookOpen,
  Wallet,
  X,
  CheckCircle,
  Edit,
  Save,
  Search,
  BadgeDollarSign,
  Users,
} from "lucide-react";
import { facultyData } from "@/lib/constants/faculty_mapping";

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", duration: 0.4 },
  },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
};

// --- TOOLTIP COMPONENT ---
const Tooltip = ({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) => {
  const [show, setShow] = useState(false);
  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 text-white text-[10px] font-bold rounded pointer-events-none whitespace-nowrap z-50">
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function StaffManagementPage() {
  const [activeTab, setActiveTab] = useState<
    "directory" | "assignments" | "payroll_list"
  >("directory");
  const [staffList, setStaffList] = useState<any[]>([]);
  const [masterCourses, setMasterCourses] = useState<any[]>([]);

  // Modal States
  const [activeModal, setActiveModal] = useState<
    "add" | "edit" | "assign" | "payroll_config" | null
  >(null);
  const [isSuccessView, setIsSuccessView] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);

  // Form States
  const [staffForm, setStaffForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "Lecturer",
    faculty: "",
    dept: "",
  });
  const [payrollForm, setPayrollForm] = useState({
    baseSalary: "",
    bankName: "",
    accountNumber: "",
  });
  const [courseSearch, setCourseSearch] = useState("");
  const [generatedCreds, setGeneratedCreds] = useState({
    staffId: "",
    password: "",
  });

  // Add this function before useEffect (or after state declarations)
  const refreshData = () => {
    const users = JSON.parse(localStorage.getItem("gouni_users") || "[]");
    setStaffList(users.filter((u: any) => u.role === "staff"));
    setMasterCourses(
      JSON.parse(localStorage.getItem("gouni_master_courses") || "[]"),
    );
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshData();
  }, []);

  // Then modify handleSaveStaff:
  const handleSaveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    const allUsers = JSON.parse(localStorage.getItem("gouni_users") || "[]");
    if (activeModal === "edit") {
      const updated = allUsers.map((u: any) =>
        u.id === selectedStaff.id ? { ...u, ...staffForm } : u,
      );
      localStorage.setItem("gouni_users", JSON.stringify(updated));
    } else {
      const staffId = `GOU/STAFF/${Math.floor(100 + Math.random() * 900)}`;
      const password = Math.random().toString(36).slice(-8);
      // Exclude 'role' from staffForm to avoid duplicate key
      const { role, ...staffWithoutRole } = staffForm;
      const newStaff = {
        id: staffId,
        staffId,
        status: "Active",
        password,
        ...staffWithoutRole,
        role: "staff", // Override to ensure correct role for authentication
      };
      localStorage.setItem(
        "gouni_users",
        JSON.stringify([...allUsers, newStaff]),
      );
      setGeneratedCreds({ staffId, password });
    }
    setIsSuccessView(true);
    refreshData(); // Now refreshData is defined in scope
  };

  const handlePayrollSave = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Fetch current users list
    const allUsers = JSON.parse(localStorage.getItem("gouni_users") || "[]");

    // 2. Map and Update: Ensure we find the staff by ID and inject the payroll object
    const updatedUsers = allUsers.map((u: any) => {
      // Logic check: match by either 'id' or 'staffId' to be safe
      if (u.id === selectedStaff.id || u.staffId === selectedStaff.staffId) {
        return {
          ...u,
          payroll: {
            baseSalary: payrollForm.baseSalary,
            bankName: payrollForm.bankName,
            accountNumber: payrollForm.accountNumber,
            lastUpdated: new Date().toISOString(),
          },
        };
      }
      return u;
    });

    // 3. Save back to LocalStorage
    localStorage.setItem("gouni_users", JSON.stringify(updatedUsers));

    // 4. Refresh the local state immediately so the table updates
    setStaffList(updatedUsers.filter((u: any) => u.role === "staff"));

    // 5. Visual Feedback: Use the success view before closing
    setIsSuccessView(true);

    // Optional: Auto-close after 1.5 seconds if you don't want to click 'Complete'
    setTimeout(() => {
      closeModal();
    }, 1500);
  };

  const assignCourse = (courseId: string) => {
    const updatedCourses = masterCourses.map((c) => {
      if (c.id === courseId)
        return {
          ...c,
          lecturer: selectedStaff.name,
          lecturerId: selectedStaff.id,
        };
      return c;
    });
    localStorage.setItem(
      "gouni_master_courses",
      JSON.stringify(updatedCourses),
    );
    setMasterCourses(updatedCourses);
  };

  const closeModal = () => {
    setActiveModal(null);
    setIsSuccessView(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-foreground">Staff Management</h1>
        <button
          onClick={() => setActiveModal("add")}
          className="flex items-center gap-2 bg-blue-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-800 transition-all shadow-md">
          <Plus size={18} /> Add New Staff
        </button>
      </div>

      {/* --- NAVIGATION CHIPS --- */}
      <div className="flex bg-card p-1 rounded-2xl border border-border w-fit">
        {[
          { id: "directory", label: "Staff Directory", icon: Users },
          { id: "assignments", label: "Assignments", icon: BookOpen },
          { id: "payroll_list", label: "Payroll Setup", icon: Wallet },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === tab.id ? "bg-blue-900 text-white shadow-lg" : "text-muted-foreground hover:bg-muted"}`}>
            <tab.icon size={14} /> {tab.label}
          </button>
        ))}
      </div>

      {/* --- TABLE CONTENT --- */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 font-bold">
              <tr>
                <th className="px-6 py-4 text-center">Info</th>
                <th className="px-6 py-4">
                  {activeTab === "directory"
                    ? "Contact & Dept"
                    : activeTab === "assignments"
                      ? "Assigned Courses"
                      : "Payroll Details"}
                </th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {staffList.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-black text-foreground uppercase tracking-tight">
                      {item.name}
                    </p>
                    <p className="text-[10px] font-mono text-blue-600">
                      {item.staffId}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    {activeTab === "directory" && (
                      <div className="space-y-0.5">
                        <p className="text-xs font-medium text-foreground">
                          {item.email}
                        </p>
                        <p className="text-[10px] text-muted-foreground uppercase">
                          {item.dept || "No Department"}
                        </p>
                      </div>
                    )}
                    {activeTab === "assignments" && (
                      <div className="flex flex-wrap gap-1">
                        {masterCourses.filter((c) => c.lecturerId === item.id)
                          .length > 0 ? (
                          masterCourses
                            .filter((c) => c.lecturerId === item.id)
                            .map((c) => (
                              <span
                                key={c.id}
                                className="px-2 py-0.5 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 rounded text-[10px] font-bold border border-blue-100 dark:border-blue-800">
                                {c.code}
                              </span>
                            ))
                        ) : (
                          <span className="text-[10px] text-muted-foreground italic">
                            No courses assigned
                          </span>
                        )}
                      </div>
                    )}
                    {activeTab === "payroll_list" && (
                      <div>
                        {item.payroll ? (
                          <div className="flex items-center gap-4">
                            <p className="text-sm font-black text-foreground">
                              ₦
                              {Number(item.payroll.baseSalary).toLocaleString()}
                            </p>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                              {item.payroll.bankName}
                            </p>
                          </div>
                        ) : (
                          <span className="text-[10px] text-red-500 font-bold uppercase tracking-tighter italic">
                            Missing Payroll Data
                          </span>
                        )}
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-black uppercase rounded-full border border-green-100">
                      Active
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Tooltip text="Edit Profile">
                        <button
                          onClick={() => {
                            setSelectedStaff(item);
                            setStaffForm(item);
                            setActiveModal("edit");
                          }}
                          className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-all">
                          <Edit size={16} />
                        </button>
                      </Tooltip>
                      <Tooltip text="Assign Courses">
                        <button
                          onClick={() => {
                            setSelectedStaff(item);
                            setActiveModal("assign");
                          }}
                          className="p-2 hover:bg-amber-50 text-amber-600 rounded-lg transition-all">
                          <BookOpen size={16} />
                        </button>
                      </Tooltip>
                      <Tooltip text="Payroll Setup">
                        <button
                          onClick={() => {
                            setSelectedStaff(item);
                            setPayrollForm(
                              item.payroll || {
                                baseSalary: "",
                                bankName: "",
                                accountNumber: "",
                              },
                            );
                            setActiveModal("payroll_config");
                          }}
                          className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-all">
                          <Wallet size={16} />
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODALS OVERLAY --- */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto py-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-lg bg-card rounded-[2.5rem] shadow-2xl border border-border overflow-hidden">
              {/* HEADER */}
              <div className="p-6 border-b border-border bg-muted/30 flex justify-between items-center">
                <h2 className="text-xl font-bold text-foreground">
                  {activeModal === "assign"
                    ? `Assignments: ${selectedStaff?.name}`
                    : activeModal === "payroll_config"
                      ? "Payroll Config"
                      : activeModal === "edit"
                        ? "Edit Staff"
                        : "Add Staff"}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-muted rounded-full">
                  <X size={20} />
                </button>
              </div>

              <div className="p-8">
                {/* ASSIGNMENT MODAL CONTENT */}
                {activeModal === "assign" && (
                  <div className="space-y-4">
                    <div className="relative">
                      <Search
                        className="absolute left-3 top-3 text-muted-foreground"
                        size={16}
                      />
                      <input
                        type="text"
                        placeholder="Filter courses..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background"
                        value={courseSearch}
                        onChange={(e) => setCourseSearch(e.target.value)}
                      />
                    </div>
                    <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                      {masterCourses
                        .filter(
                          (c) =>
                            c.code
                              .toLowerCase()
                              .includes(courseSearch.toLowerCase()) ||
                            c.title
                              .toLowerCase()
                              .includes(courseSearch.toLowerCase()),
                        )
                        .map((course) => {
                          const isMine = course.lecturerId === selectedStaff.id;
                          return (
                            <div
                              key={course.id}
                              className="p-4 rounded-2xl border border-border flex justify-between items-center">
                              <div>
                                <p className="font-bold text-sm text-blue-900 dark:text-blue-400">
                                  {course.code}
                                </p>
                                <p className="text-[10px] text-muted-foreground">
                                  {course.title}
                                </p>
                              </div>
                              <button
                                onClick={() => assignCourse(course.id)}
                                className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${isMine ? "bg-green-100 text-green-700" : "bg-blue-900 text-white"}`}>
                                {isMine ? "Assigned" : "Assign"}
                              </button>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}

                {/* PAYROLL MODAL CONTENT */}
                {activeModal === "payroll_config" && (
                  <div className="p-8">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold flex items-center gap-2">
                        <BadgeDollarSign className="text-green-600" /> Payroll
                        Configuration
                      </h2>
                      <button onClick={closeModal}>
                        <X size={20} />
                      </button>
                    </div>

                    {!isSuccessView ? (
                      <form onSubmit={handlePayrollSave} className="space-y-4">
                        <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-3xl border border-green-100 mb-4 text-center">
                          <p className="text-[10px] font-black text-green-800 uppercase tracking-widest mb-1">
                            Monthly Base Salary
                          </p>
                          <p className="text-3xl font-black text-green-900 dark:text-green-300">
                            ₦{" "}
                            {Number(payrollForm.baseSalary).toLocaleString() ||
                              "0"}
                          </p>
                        </div>

                        <div>
                          <label className="text-[10px] font-black uppercase text-muted-foreground ml-1 mb-1 block">
                            Amount (₦)
                          </label>
                          <input
                            required
                            type="number"
                            placeholder="Base Salary (0.00)"
                            value={payrollForm.baseSalary}
                            onChange={(e) =>
                              setPayrollForm({
                                ...payrollForm,
                                baseSalary: e.target.value,
                              })
                            }
                            className="w-full p-3.5 rounded-2xl border border-input bg-background outline-none focus:ring-2 focus:ring-green-500/20"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] font-black uppercase text-muted-foreground ml-1 mb-1 block">
                              Bank
                            </label>
                            <input
                              required
                              placeholder="Bank Name"
                              value={payrollForm.bankName}
                              onChange={(e) =>
                                setPayrollForm({
                                  ...payrollForm,
                                  bankName: e.target.value,
                                })
                              }
                              className="w-full p-3.5 rounded-2xl border border-input bg-background outline-none focus:ring-2 focus:ring-green-500/20"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-black uppercase text-muted-foreground ml-1 mb-1 block">
                              Account No.
                            </label>
                            <input
                              required
                              placeholder="0123456789"
                              value={payrollForm.accountNumber}
                              onChange={(e) =>
                                setPayrollForm({
                                  ...payrollForm,
                                  accountNumber: e.target.value,
                                })
                              }
                              maxLength={10}
                              className="w-full p-3.5 rounded-2xl border border-input bg-background outline-none focus:ring-2 focus:ring-green-500/20"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-4 bg-green-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg mt-4 flex items-center justify-center gap-2 hover:bg-green-700 transition-all">
                          <Save size={16} /> Save Settings
                        </button>
                      </form>
                    ) : (
                      <div className="text-center py-6">
                        <CheckCircle
                          size={64}
                          className="text-green-500 mx-auto mb-4"
                        />
                        <h3 className="text-2xl font-black mb-2">
                          Payroll Updated
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Salary settings for {selectedStaff?.name} have been
                          saved.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* ADD/EDIT FORM CONTENT */}
                {(activeModal === "add" || activeModal === "edit") &&
                  !isSuccessView && (
                    <form onSubmit={handleSaveStaff} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          required
                          placeholder="Full Name"
                          value={staffForm.name}
                          onChange={(e) =>
                            setStaffForm({ ...staffForm, name: e.target.value })
                          }
                          className="w-full p-3.5 rounded-2xl border border-input bg-background"
                        />
                        <input
                          required
                          type="email"
                          placeholder="Email Address"
                          value={staffForm.email}
                          onChange={(e) =>
                            setStaffForm({
                              ...staffForm,
                              email: e.target.value,
                            })
                          }
                          className="w-full p-3.5 rounded-2xl border border-input bg-background"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <select
                          required
                          value={staffForm.faculty}
                          onChange={(e) =>
                            setStaffForm({
                              ...staffForm,
                              faculty: e.target.value,
                              dept: "",
                            })
                          }
                          className="w-full p-3.5 rounded-2xl border border-input bg-background text-sm">
                          <option value="">Select Faculty</option>
                          {Object.keys(facultyData).map((f) => (
                            <option key={f} value={f}>
                              {f}
                            </option>
                          ))}
                        </select>
                        <select
                          required
                          value={staffForm.dept}
                          onChange={(e) =>
                            setStaffForm({ ...staffForm, dept: e.target.value })
                          }
                          disabled={!staffForm.faculty}
                          className="w-full p-3.5 rounded-2xl border border-input bg-background text-sm disabled:opacity-50">
                          <option value="">Select Dept</option>
                          {staffForm.faculty &&
                            facultyData[staffForm.faculty]?.map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="w-full py-4 bg-blue-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg mt-4">
                        {activeModal === "edit"
                          ? "Save Changes"
                          : "Confirm Onboarding"}
                      </button>
                    </form>
                  )}

                {/* SUCCESS VIEW */}
                {isSuccessView && (
                  <div className="text-center py-6">
                    <CheckCircle
                      size={64}
                      className="text-green-500 mx-auto mb-4"
                    />
                    <h3 className="text-2xl font-black mb-6">
                      Action Successful!
                    </h3>
                    {activeModal === "add" && (
                      <div className="bg-muted p-4 rounded-3xl text-left border border-border mb-8">
                        <p className="text-[10px] font-black uppercase text-muted-foreground mb-2">
                          Temporary Login Credentials
                        </p>
                        <div className="flex justify-between font-mono text-xs">
                          <span>ID: {generatedCreds.staffId}</span>
                          <span>PW: {generatedCreds.password}</span>
                        </div>
                      </div>
                    )}
                    <button
                      onClick={closeModal}
                      className="w-full py-4 bg-blue-900 text-white rounded-2xl font-bold uppercase tracking-widest text-xs">
                      Complete
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
