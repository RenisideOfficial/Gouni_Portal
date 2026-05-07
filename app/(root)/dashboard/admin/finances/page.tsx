"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  TrendingUp,
  DollarSign,
  Activity,
  Plus,
  Edit3,
  Trash2,
  X,
  Save,
  Settings,
  AlertTriangle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminFinancesPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "fees">("overview");
  const [allPayments, setAllPayments] = useState<any[]>([]);
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    tuitionRevenue: 0,
    otherRevenue: 0,
  });
  const [chartData, setChartData] = useState<any[]>([]);

  // Fee Management States
  const [appFees, setAppFees] = useState<any>({ tuition: {}, otherFees: [] });
  const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);
  const [editingFeeId, setEditingFeeId] = useState<string | null>(null);
  const [feeForm, setFeeForm] = useState({ name: "", amount: "" });

  // Custom HCI Delete Modal State
  const [feeToDelete, setFeeToDelete] = useState<string | null>(null);

  // 1. DECLARE fetchData FIRST
  const fetchData = () => {
    const storedFees = JSON.parse(
      localStorage.getItem("gouni_fees") || '{"tuition":{},"otherFees":[]}',
    );
    setAppFees(storedFees);

    const rawPayments = JSON.parse(
      localStorage.getItem("gouni_payments") || "[]",
    );
    const successfulPayments = rawPayments.filter(
      (p: any) => p.status === "Paid",
    );
    const sorted = successfulPayments.sort(
      (a: any, b: any) => b.timestamp - a.timestamp,
    );
    setAllPayments(sorted);

    let total = 0,
      tuition = 0,
      other = 0;
    const typeMap: Record<string, number> = {};

    sorted.forEach((p: any) => {
      const amt = Number(String(p.amount).replace(/[^0-9.-]+/g, "")) || 0;
      total += amt;
      if (p.type === "Tuition Fee") tuition += amt;
      else other += amt;

      let shortName = p.type || "Other";
      if (shortName.includes("Tuition")) shortName = "Tuition";
      if (shortName.includes("ICT") || shortName.includes("Online"))
        shortName = "ICT";
      if (shortName.includes("Acceptance")) shortName = "Acceptance";
      if (shortName.includes("Library")) shortName = "Library";
      typeMap[shortName] = (typeMap[shortName] || 0) + amt;
    });

    setMetrics({
      totalRevenue: total,
      tuitionRevenue: tuition,
      otherRevenue: other,
    });

    const cData = Object.keys(typeMap)
      .map((key) => ({ name: key, amount: typeMap[key] }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 6);

    setChartData(
      cData.length > 0
        ? cData
        : [
            { name: "Tuition", amount: 0 },
            { name: "ICT", amount: 0 },
            { name: "Acceptance", amount: 0 },
          ],
    );
  };

  useEffect(() => {
    // Defers execution to prevent the synchronous setState cascading render warning
    const timer = setTimeout(() => {
      fetchData();
    }, 0);

    window.addEventListener("storage", fetchData);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("storage", fetchData);
    };
  }, []);

  // --- FEE CRUD LOGIC ---
  const handleSaveFee = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedOtherFees = [...appFees.otherFees];

    if (editingFeeId) {
      updatedOtherFees = updatedOtherFees.map((f: any) =>
        f.id === editingFeeId
          ? { ...f, name: feeForm.name, amount: Number(feeForm.amount) }
          : f,
      );
    } else {
      updatedOtherFees.push({
        id: `fee-${Date.now()}`,
        name: feeForm.name,
        amount: Number(feeForm.amount),
      });
    }

    const updatedAppFees = { ...appFees, otherFees: updatedOtherFees };
    localStorage.setItem("gouni_fees", JSON.stringify(updatedAppFees));
    setAppFees(updatedAppFees);

    setIsFeeModalOpen(false);
    setEditingFeeId(null);
    setFeeForm({ name: "", amount: "" });
    window.dispatchEvent(new Event("storage"));
  };

  const initiateDelete = (id: string) => {
    setFeeToDelete(id);
  };

  const confirmDeleteFee = () => {
    if (!feeToDelete) return;

    const updatedOtherFees = appFees.otherFees.filter(
      (f: any) => f.id !== feeToDelete,
    );
    const updatedAppFees = { ...appFees, otherFees: updatedOtherFees };
    localStorage.setItem("gouni_fees", JSON.stringify(updatedAppFees));
    setAppFees(updatedAppFees);
    window.dispatchEvent(new Event("storage"));

    setFeeToDelete(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 px-4 sm:px-0">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-foreground">
          Financial Management
        </h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="flex bg-card p-1 rounded-xl border border-border w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "overview" ? "bg-blue-900 text-white" : "text-muted-foreground hover:bg-muted"}`}>
              Overview
            </button>
            <button
              onClick={() => setActiveTab("fees")}
              className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "fees" ? "bg-blue-900 text-white" : "text-muted-foreground hover:bg-muted"}`}>
              Fee Config
            </button>
          </div>
        </div>
      </motion.div>

      {activeTab === "overview" ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6">
          {/* Financial Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-start mb-4 relative z-10">
                <span className="text-sm font-medium text-muted-foreground">
                  Total Revenue Collected
                </span>
                <div className="p-2 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-lg">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-foreground relative z-10">
                ₦{(metrics.totalRevenue / 1000000).toFixed(2)}M
              </h3>
              <p className="text-xs text-green-600 flex items-center gap-1 mt-2 relative z-10">
                <TrendingUp className="w-3 h-3" /> Real-time aggregate
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-medium text-muted-foreground">
                  Tuition Fees
                </span>
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg">
                  <Activity className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-foreground">
                ₦{(metrics.tuitionRevenue / 1000000).toFixed(2)}M
              </h3>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-medium text-muted-foreground">
                  Other Fees
                </span>
                <div className="p-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-lg">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-foreground">
                ₦{(metrics.otherRevenue / 1000000).toFixed(2)}M
              </h3>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
            <h2 className="text-sm font-bold text-foreground mb-6">
              Revenue by Category
            </h2>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e2e8f0"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#64748b" }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#64748b" }}
                    tickFormatter={(value) => `₦${value / 1000}k`}
                  />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                    formatter={(value: any) => [
                      `₦${Number(value).toLocaleString()}`,
                      "Revenue",
                    ]}
                  />
                  <Bar
                    dataKey="amount"
                    fill="#1e3a8a"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={50}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Ledger Table */}
          <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="text-sm font-bold text-foreground">
                Recent Transactions Ledger
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[10px] text-muted-foreground uppercase bg-muted/50 font-black tracking-widest">
                  <tr>
                    <th className="px-6 py-5">Invoice ID</th>
                    <th className="px-6 py-5">Student Info</th>
                    <th className="px-6 py-5">Fee Category</th>
                    <th className="px-6 py-5">Amount & Bank</th>
                    <th className="px-6 py-5">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {allPayments.slice(0, 10).map((item, i) => (
                    <tr key={i} className="hover:bg-muted/30">
                      <td className="px-6 py-4 font-mono font-bold text-blue-600">
                        {item.id}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold">
                          {item.studentName || "Unknown"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.studentId}
                        </p>
                      </td>
                      <td className="px-6 py-4 font-bold">{item.type}</td>
                      <td className="px-6 py-4 font-black">
                        ₦{Number(item.amount).toLocaleString()}
                        <p className="text-[10px] text-muted-foreground font-bold uppercase mt-1">
                          {item.bank}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-muted-foreground">
                        {item.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6">
          <div className="flex justify-end">
            <button
              onClick={() => {
                setEditingFeeId(null);
                setFeeForm({ name: "", amount: "" });
                setIsFeeModalOpen(true);
              }}
              className="flex items-center gap-2 bg-blue-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-blue-800 transition-all shadow-md">
              <Plus size={16} /> Add New Fee
            </button>
          </div>

          <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-600" />{" "}
              <h2 className="text-sm font-bold text-foreground">
                Configurable Fees
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[10px] text-muted-foreground uppercase bg-muted/50 font-black tracking-widest">
                  <tr>
                    <th className="px-6 py-5">Fee Name</th>
                    <th className="px-6 py-5">Amount (₦)</th>
                    <th className="px-6 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-blue-50/50 dark:bg-blue-900/10">
                    <td className="px-6 py-4 font-bold text-blue-900 dark:text-blue-400">
                      Tuition Fee (Base/Default)
                    </td>
                    <td className="px-6 py-4 font-black text-foreground">
                      ₦{Number(appFees.tuition?.Default || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right text-[10px] font-bold text-muted-foreground uppercase">
                      System Defined
                    </td>
                  </tr>
                  {appFees.otherFees.map((fee: any) => (
                    <tr key={fee.id} className="hover:bg-muted/30">
                      <td className="px-6 py-4 font-bold text-foreground">
                        {fee.name}
                      </td>
                      <td className="px-6 py-4 font-black text-foreground">
                        ₦{Number(fee.amount).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setFeeForm({ name: fee.name, amount: fee.amount });
                            setEditingFeeId(fee.id);
                            setIsFeeModalOpen(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => initiateDelete(fee.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* --- ADD/EDIT FEE MODAL --- */}
      <AnimatePresence>
        {isFeeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFeeModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-card rounded-3xl shadow-2xl border border-border p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-foreground">
                  {editingFeeId ? "Edit Fee" : "Add Fee"}
                </h2>
                <button
                  onClick={() => setIsFeeModalOpen(false)}
                  className="p-2 hover:bg-muted rounded-full">
                  <X size={18} />
                </button>
              </div>
              <form onSubmit={handleSaveFee} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-muted-foreground ml-1 mb-1 block">
                    Fee Name
                  </label>
                  <input
                    required
                    value={feeForm.name}
                    onChange={(e) =>
                      setFeeForm({ ...feeForm, name: e.target.value })
                    }
                    placeholder="e.g. Library Fee"
                    className="w-full p-3.5 rounded-2xl border border-input bg-background font-bold outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-muted-foreground ml-1 mb-1 block">
                    Amount (₦)
                  </label>
                  <input
                    required
                    type="number"
                    value={feeForm.amount}
                    onChange={(e) =>
                      setFeeForm({ ...feeForm, amount: e.target.value })
                    }
                    placeholder="0"
                    className="w-full p-3.5 rounded-2xl border border-input bg-background font-bold outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-blue-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-800 transition-all flex justify-center items-center gap-2 mt-4">
                  <Save size={16} /> Save Fee
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- CUSTOM DELETE CONFIRMATION DIALOG --- */}
      <AnimatePresence>
        {feeToDelete && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFeeToDelete(null)}
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
                Delete Fee?
              </h2>
              <p className="text-sm text-muted-foreground mb-8">
                This will permanently remove this fee category from the
                university's payment structure.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setFeeToDelete(null)}
                  className="flex-1 py-3 bg-muted rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors">
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteFee}
                  className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition-colors">
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
