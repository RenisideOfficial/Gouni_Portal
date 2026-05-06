"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Printer, Loader2, Lock, Home } from "lucide-react";
import { hostelData } from "@/lib/constants/hostel_data";
import { useRouter } from "next/navigation";

export default function HostelPage() {
  const router = useRouter();

  // Verification States
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasPaid, setHasPaid] = useState(false);
  const [missingFees, setMissingFees] = useState<string[]>([]);

  // History
  const [bookings, setBookings] = useState<any[]>([]);

  // Booking Form States
  const [session, setSession] = useState("2025/2026");
  const [semester, setSemester] = useState("1st Semester");
  const [hostel, setHostel] = useState("");
  const [block, setBlock] = useState("");
  const [room, setRoom] = useState("");
  const [bunk, setBunk] = useState("");
  const [isBooking, setIsBooking] = useState(false);

  // Derived Options for UI Cascading
  const availableBlocks = hostel ? hostelData[hostel].blocks : [];
  const availableRooms = hostel
    ? Array.from(
        { length: hostelData[hostel].rooms },
        (_, i) => `Room ${i + 1}`,
      )
    : [];
  const availableBunks = hostel ? hostelData[hostel].bunks : [];

  useEffect(() => {
    const checkStatus = () => {
      const storedUser = JSON.parse(
        localStorage.getItem("gouni_current_user") || "null",
      );
      if (!storedUser) return;
      setUser(storedUser);

      // Verify Payments for the Selected Session
      const required = JSON.parse(
        localStorage.getItem("gouni_registration_requirements") ||
          '["Tuition Fee"]',
      );
      const payments = JSON.parse(
        localStorage.getItem("gouni_payments") || "[]",
      );
      const paidNames = payments
        .filter(
          (p: any) =>
            p.studentId === (storedUser.regNumber || storedUser.id) &&
            p.session === session &&
            p.status === "Paid",
        )
        .map((p: any) => p.type);

      const missing = required.filter((f: string) => !paidNames.includes(f));
      setMissingFees(missing);
      setHasPaid(missing.length === 0);

      // Load Booking History
      const allBookings = JSON.parse(
        localStorage.getItem("gouni_hostel_bookings") || "[]",
      );
      const myBookings = allBookings.filter(
        (b: any) => b.studentId === (storedUser.regNumber || storedUser.id),
      );
      setBookings(myBookings.reverse()); // Newest first

      setIsLoading(false);
    };

    const timer = setTimeout(checkStatus, 300);
    return () => clearTimeout(timer);
  }, [session]); // Re-check if session changes

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hostel || !block || !room || !bunk) return;

    setIsBooking(true);

    setTimeout(() => {
      const newBooking = {
        id: `HSTL-${Date.now().toString().slice(-6)}`,
        studentId: user.regNumber || user.id,
        session,
        semester,
        hostel,
        block,
        room,
        bunk,
        date: new Date().toLocaleDateString("en-GB"),
        status: "Active",
      };

      const allBookings = JSON.parse(
        localStorage.getItem("gouni_hostel_bookings") || "[]",
      );

      // Prevent double booking for same session/semester
      const exists = allBookings.find(
        (b: any) =>
          b.studentId === newBooking.studentId &&
          b.session === session &&
          b.semester === semester,
      );

      let updatedBookings = allBookings;
      if (exists) {
        updatedBookings = allBookings.map((b: any) =>
          b.id === exists.id ? newBooking : b,
        );
      } else {
        updatedBookings = [...allBookings, newBooking];
      }

      localStorage.setItem(
        "gouni_hostel_bookings",
        JSON.stringify(updatedBookings),
      );

      const myBookings = updatedBookings.filter(
        (b: any) => b.studentId === (user.regNumber || user.id),
      );
      setBookings(myBookings.reverse());

      // Reset Form
      setHostel("");
      setBlock("");
      setRoom("");
      setBunk("");
      setIsBooking(false);
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-blue-900 w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 px-4 sm:px-0">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Home className="text-blue-600" /> Accommodation Portal
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Book and manage your on-campus residency.
        </p>
      </motion.div>

      {/* Booking Form Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card p-6 md:p-8 rounded-[2rem] border border-border shadow-sm">
        <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
          <h2 className="text-sm font-bold text-foreground uppercase tracking-widest">
            Reserve Space
          </h2>
          <select
            value={session}
            onChange={(e) => setSession(e.target.value)}
            className="bg-background border border-input text-foreground font-bold px-4 py-2 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-900">
            <option>2025/2026</option>
            <option>2024/2025</option>
          </select>
        </div>

        <AnimatePresence mode="wait">
          {!hasPaid ? (
            <motion.div
              key="locked"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-3xl p-10 text-center">
              <Lock className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-amber-900 dark:text-amber-400">
                Clearance Required
              </h2>
              <p className="text-sm text-amber-800/70 dark:text-amber-500/70 mt-2 mb-6 max-w-md mx-auto">
                Hostel booking is restricted. You must settle the following fees
                for {session} before reserving a room: <br />
                <span className="font-black text-amber-900 dark:text-amber-300 uppercase block mt-2">
                  {missingFees.join(" & ")}
                </span>
              </p>
              <button
                onClick={() => router.push("/dashboard/student/payments")}
                className="bg-amber-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-amber-700 shadow-md transition-all">
                Go to Payments
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleBooking}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              <div>
                <label className="block text-[10px] font-black uppercase text-muted-foreground ml-1 mb-1.5">
                  Semester
                </label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full bg-background border border-input text-foreground font-bold px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-900/50 transition-all">
                  <option>1st Semester</option>
                  <option>2nd Semester</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-muted-foreground ml-1 mb-1.5">
                  Hostel Name
                </label>
                <select
                  required
                  value={hostel}
                  onChange={(e) => {
                    setHostel(e.target.value);
                    setBlock("");
                    setRoom("");
                    setBunk("");
                  }}
                  className="w-full bg-background border border-input text-foreground font-bold px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-900/50 transition-all">
                  <option value="" disabled hidden>
                    Select Hostel
                  </option>
                  {Object.keys(hostelData).map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-muted-foreground ml-1 mb-1.5">
                  Block
                </label>
                <select
                  required
                  disabled={!hostel}
                  value={block}
                  onChange={(e) => setBlock(e.target.value)}
                  className="w-full bg-background border border-input text-foreground font-bold px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-900/50 disabled:opacity-50 transition-all">
                  <option value="" disabled hidden>
                    Select Block
                  </option>
                  {availableBlocks.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-muted-foreground ml-1 mb-1.5">
                  Room
                </label>
                <select
                  required
                  disabled={!block}
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="w-full bg-background border border-input text-foreground font-bold px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-900/50 disabled:opacity-50 transition-all">
                  <option value="" disabled hidden>
                    Select Room
                  </option>
                  {availableRooms.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-muted-foreground ml-1 mb-1.5">
                  Bed Space
                </label>
                <select
                  required
                  disabled={!room}
                  value={bunk}
                  onChange={(e) => setBunk(e.target.value)}
                  className="w-full bg-background border border-input text-foreground font-bold px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-900/50 disabled:opacity-50 transition-all">
                  <option value="" disabled hidden>
                    Select Bed
                  </option>
                  {availableBunks.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-5 flex justify-end mt-4 pt-4 border-t border-border">
                <button
                  type="submit"
                  disabled={isBooking || !bunk}
                  className="w-full md:w-auto bg-blue-900 dark:bg-blue-700 text-white px-10 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-800 disabled:opacity-50 transition-all shadow-xl flex items-center justify-center gap-2">
                  {isBooking ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Reserving
                      Space...
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Booking History Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-[2rem] border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border bg-muted/20">
          <h2 className="text-sm font-black text-foreground uppercase tracking-widest">
            Allocation History
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] text-muted-foreground uppercase font-black tracking-widest bg-muted/50">
              <tr>
                <th className="px-6 py-5">Ref / Term</th>
                <th className="px-6 py-5">Hostel Name</th>
                <th className="px-6 py-5">Details</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-center">Print</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {bookings.length > 0 ? (
                bookings.map((b, i) => (
                  <tr key={i} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-mono font-bold text-blue-600">
                        {b.id}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {b.session} • {b.semester}
                      </p>
                    </td>
                    <td className="px-6 py-4 font-bold text-foreground">
                      {b.hostel}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs font-bold text-foreground">
                        {b.block} — {b.room}
                      </p>
                      <p className="text-[10px] text-muted-foreground uppercase">
                        {b.bunk}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-black px-3 py-1 rounded-full uppercase border bg-green-50 text-green-700 border-green-200">
                        {b.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex justify-center">
                      <button
                        onClick={() =>
                          router.push(`/student/hostel-printout?id=${b.id}`)
                        }
                        className="text-muted-foreground hover:text-blue-700 transition-colors p-2 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20">
                        <Printer className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-16 text-center text-muted-foreground">
                    <Home className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p className="font-bold text-foreground">
                      No bookings found
                    </p>
                    <p className="text-xs mt-1">
                      Your accommodation history will appear here once reserved.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
