"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  BookOpen,
  Settings2,
  X,
  Save,
  Trash2,
  Edit3,
  ShieldCheck,
  LayoutGrid,
  AlertTriangle,
} from "lucide-react";
import { feeStructure } from "@/lib/constants/finance_data";
import { facultyData } from "@/lib/constants/faculty_mapping";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [requiredFees, setRequiredFees] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [filters, setFilters] = useState({
    dept: "Computer Science",
    level: "100L",
    sem: "1st Semester",
  });

  const [formData, setFormData] = useState({ code: "", title: "", units: 3 });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const refreshData = () => {
    const stored = JSON.parse(
      localStorage.getItem("gouni_master_courses") || "[]",
    );
    setCourses(stored);
    const reqs = JSON.parse(
      localStorage.getItem("gouni_registration_requirements") ||
        '["Tuition Fee"]',
    );
    setRequiredFees(reqs);
  };

  useEffect(() => {
    const timer = setTimeout(refreshData, 0);
    return () => clearTimeout(timer);
  }, []);

  const filteredDisplay = courses.filter((c) => {
    const matchesFilters =
      c.dept === filters.dept &&
      c.level === filters.level &&
      c.semester === filters.sem;
    const matchesSearch =
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilters && matchesSearch;
  });

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    let updated;
    if (editingId) {
      updated = courses.map((c) =>
        c.id === editingId ? { ...c, ...formData } : c,
      );
    } else {
      const newCourse = { ...formData, ...filters, id: `course-${Date.now()}` };
      updated = [...courses, newCourse];
    }
    localStorage.setItem("gouni_master_courses", JSON.stringify(updated));
    setCourses(updated);
    setIsModalOpen(false);
    setFormData({ code: "", title: "", units: 3 });
    setEditingId(null);
  };

  const confirmDelete = () => {
    if (!deletingId) return;
    const updated = courses.filter((c) => c.id !== deletingId);
    localStorage.setItem("gouni_master_courses", JSON.stringify(updated));
    setCourses(updated);
    setIsDeleteModalOpen(false);
    setDeletingId(null);
  };

  const saveRequirements = () => {
    localStorage.setItem(
      "gouni_registration_requirements",
      JSON.stringify(requiredFees),
    );
    setIsConfigOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 px-4 sm:px-0">
      {/* RESPONSIVE HEADER */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
          <BookOpen className="text-blue-700" /> Curriculum Manager
        </h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => setIsConfigOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2.5 rounded-xl border border-border font-bold text-xs hover:bg-slate-200 transition-all">
            <Settings2 size={16} /> Rules
          </button>
          <button
            onClick={() => {
              setEditingId(null);
              setFormData({ code: "", title: "", units: 3 });
              setIsModalOpen(true);
            }}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-900 dark:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-blue-800 transition-all shadow-md">
            <Plus size={16} /> Add Course
          </button>
        </div>
      </div>

      {/* HORIZONTAL SCROLLABLE PREREQUISITES */}
      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 p-4 rounded-2xl">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
          <ShieldCheck className="text-blue-600 flex-shrink-0" size={20} />
          <div className="whitespace-nowrap">
            <p className="text-[10px] font-black text-blue-900/50 dark:text-blue-400/50 uppercase tracking-widest">
              Active Prerequisites
            </p>
            <p className="text-xs sm:text-sm font-bold text-blue-900 dark:text-blue-300">
              {requiredFees.join(", ")}
            </p>
          </div>
        </div>
      </div>

      {/* SEARCH & FILTERS */}
      <div className="bg-card rounded-2xl border border-border shadow-sm p-4 space-y-4">
        <div className="flex bg-background border border-input px-4 py-2.5 rounded-xl text-sm focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
          <Search className="w-4 h-4 text-muted-foreground mr-3 mt-0.5" />
          <input
            type="text"
            placeholder="Search course code or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none w-full text-foreground"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <select
            value={filters.dept}
            onChange={(e) => setFilters({ ...filters, dept: e.target.value })}
            className="bg-background border border-input p-2.5 rounded-xl text-sm outline-none cursor-pointer">
            {Object.keys(facultyData)
              .flatMap((f) => facultyData[f])
              .map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
          </select>
          <select
            value={filters.level}
            onChange={(e) => setFilters({ ...filters, level: e.target.value })}
            className="bg-background border border-input p-2.5 rounded-xl text-sm outline-none cursor-pointer">
            {["100L", "200L", "300L", "400L", "500L", "600L"].map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          <select
            value={filters.sem}
            onChange={(e) => setFilters({ ...filters, sem: e.target.value })}
            className="bg-background border border-input p-2.5 rounded-xl text-sm outline-none cursor-pointer">
            <option value="1st Semester">1st Semester</option>
            <option value="2nd Semester">2nd Semester</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground uppercase text-[10px] font-black tracking-widest">
              <tr>
                <th className="px-6 py-4">Course Details</th>
                <th className="px-6 py-4">Units</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredDisplay.length > 0 ? (
                filteredDisplay.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-mono font-black text-blue-900 dark:text-blue-400">
                        {c.code}
                      </p>
                      <p className="font-medium text-foreground">{c.title}</p>
                    </td>
                    <td className="px-6 py-4 font-bold text-muted-foreground">
                      {c.units}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => {
                            setFormData({
                              code: c.code,
                              title: c.title,
                              units: c.units,
                            });
                            setEditingId(c.id);
                            setIsModalOpen(true);
                          }}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all">
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setDeletingId(c.id);
                            setIsDeleteModalOpen(true);
                          }}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-16 text-center text-muted-foreground italic">
                    <LayoutGrid className="w-10 h-10 mx-auto mb-3 opacity-20" />
                    No courses found for current selection.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CUSTOM DELETE DIALOG */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-card rounded-3xl shadow-2xl border border-border p-8 text-center">
              <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                <AlertTriangle size={32} />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">
                Delete Course?
              </h2>
              <p className="text-sm text-muted-foreground mb-8">
                This action is permanent and will remove this course from the
                university curriculum.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 py-3 bg-muted rounded-xl font-bold text-sm">
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700">
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADD/EDIT MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-card rounded-3xl shadow-2xl border border-border p-8">
              <h2 className="text-xl font-black text-foreground mb-6">
                {editingId ? "Edit" : "Add"} Course
              </h2>
              <form onSubmit={handleSaveCourse} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-muted-foreground block mb-1.5 ml-1">
                    Course Code
                  </label>
                  <input
                    required
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value })
                    }
                    className="w-full p-3 rounded-xl border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-blue-900/20 uppercase"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-muted-foreground block mb-1.5 ml-1">
                    Course Title
                  </label>
                  <input
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full p-3 rounded-xl border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-blue-900/20"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-muted-foreground block mb-1.5 ml-1">
                    Credit Units
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    required
                    value={formData.units}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        units: parseInt(e.target.value),
                      })
                    }
                    className="w-full p-3 rounded-xl border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-blue-900/20"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-blue-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs mt-4 shadow-lg hover:bg-blue-800 transition-all flex items-center justify-center gap-2">
                  <Save size={16} /> Save Changes
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* RULES MODAL */}
      <AnimatePresence>
        {isConfigOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsConfigOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-card rounded-3xl shadow-2xl border border-border overflow-hidden max-h-[85vh] flex flex-col">
              <div className="p-6 border-b border-border bg-muted/30 flex justify-between items-center">
                <h2 className="text-lg font-black text-foreground flex items-center gap-2">
                  <Settings2 className="text-blue-600" size={18} />{" "}
                  Prerequisites
                </h2>
                <button
                  onClick={() => setIsConfigOpen(false)}
                  className="p-2 hover:bg-muted rounded-full transition-colors">
                  <X size={18} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                <div className="space-y-2">
                  {[
                    "Tuition Fee",
                    ...feeStructure.otherFees.map((f) => f.name),
                  ].map((fee) => (
                    <div
                      key={fee}
                      onClick={() =>
                        setRequiredFees((prev) =>
                          prev.includes(fee)
                            ? prev.filter((f) => f !== fee)
                            : [...prev, fee],
                        )
                      }
                      className={`p-4 rounded-xl border-2 cursor-pointer flex justify-between items-center transition-all ${requiredFees.includes(fee) ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20" : "border-border hover:bg-muted/50"}`}>
                      <span className="text-sm font-bold">{fee}</span>
                      {requiredFees.includes(fee) && (
                        <ShieldCheck className="text-blue-600" size={18} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 border-t border-border bg-muted/10">
                <button
                  onClick={saveRequirements}
                  className="w-full bg-blue-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg hover:bg-blue-800 transition-all flex items-center justify-center gap-2">
                  <Save size={16} /> Update Rules
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
