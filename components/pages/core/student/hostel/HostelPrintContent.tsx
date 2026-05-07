"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Printer, ArrowLeft, Loader2, Home } from "lucide-react";

export default function HostelPrintContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id");

  const [booking, setBooking] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const storedUser = JSON.parse(
        localStorage.getItem("gouni_current_user") || "null",
      );
      const allBookings = JSON.parse(
        localStorage.getItem("gouni_hostel_bookings") || "[]",
      );
      const currentBooking = allBookings.find((b: any) => b.id === bookingId);

      setUser(storedUser);
      setBooking(currentBooking);
    }, 0);
    return () => clearTimeout(timer);
  }, [bookingId]);

  if (!user || !booking)
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="animate-spin text-blue-900 w-8 h-8" />
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 print:bg-white pb-10 font-sans">
      <div className="max-w-3xl mx-auto pt-6 px-4 print:hidden flex justify-between items-center mb-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-600 font-bold hover:text-blue-900 transition-colors">
          <ArrowLeft size={16} /> Back
        </button>
        <button
          onClick={() => window.print()}
          className="bg-blue-900 text-white px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-2 shadow-xl hover:bg-blue-800 transition-all">
          <Printer size={16} /> Print Allocation Card
        </button>
      </div>

      <div className="max-w-3xl mx-auto bg-white shadow-2xl print:shadow-none border-2 border-slate-100 p-6 sm:p-10 rounded-3xl print:rounded-none relative overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-start border-b-2 border-blue-900 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <img
              src="/images/gouni_logo.svg"
              alt="GOUNI Logo"
              className="w-14 h-14"
            />
            <div>
              <h1 className="text-xl font-black text-slate-900 uppercase tracking-tighter">
                Godfrey Okoye University
              </h1>
              <p className="text-blue-600 font-bold uppercase tracking-widest text-[9px] mt-0.5">
                Hostel Allocation Card
              </p>
            </div>
          </div>
          {/* PROFILE PICTURE - DYNAMIC */}
          <div className="w-20 h-24 border-2 border-slate-100 rounded-lg overflow-hidden shadow-sm bg-slate-100">
            <img
              src={user.avatar || "/images/user_image.jpg"}
              alt="Student Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Student & Booking Info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">
              Full Name
            </label>
            <p className="text-base font-black text-slate-900 uppercase">
              {user.name}
            </p>
          </div>
          <div>
            <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">
              Matriculation Number
            </label>
            <p className="text-base font-mono font-black text-blue-900">
              {user.regNumber}
            </p>
          </div>
          <div>
            <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">
              Program / Level
            </label>
            <p className="text-xs font-bold text-slate-700">
              {user.prog} • {user.level || "100L"}
            </p>
          </div>
          <div>
            <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">
              Allocation Ref
            </label>
            <p className="text-xs font-mono font-bold text-slate-700">
              {booking.id}
            </p>
          </div>
        </div>

        {/* Allocation Details Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center text-white">
              <Home size={20} />
            </div>
            <div>
              <p className="text-[8px] font-black text-blue-600 uppercase tracking-widest mb-0.5">
                Assigned Residency
              </p>
              <h2 className="text-lg font-black text-blue-950">
                {booking.hostel}
              </h2>
              <p className="text-xs font-bold text-blue-800">
                {booking.block} — {booking.room} ({booking.bunk})
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[8px] font-black text-blue-600 uppercase tracking-widest mb-0.5">
              Term
            </p>
            <p className="text-xs font-bold text-blue-900">{booking.session}</p>
            <p className="text-xs font-bold text-blue-900">
              {booking.semester}
            </p>
          </div>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-12 mt-8 px-2">
          <div className="text-center">
            <div className="h-px bg-slate-300 mb-2" />
            <p className="text-[8px] font-black uppercase text-slate-900 mb-1">
              Student's Signature & Date
            </p>
          </div>
          <div className="text-center">
            <div className="h-px bg-slate-300 mb-2" />
            <p className="text-[8px] font-black uppercase text-slate-900 mb-1">
              Hall Warden's Signature & Stamp
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-[8px] font-bold text-slate-400 uppercase tracking-widest border-t border-slate-100 pt-4">
          This card must be presented upon entry into the university hostel
          premises.
        </div>
      </div>

      <style jsx global>{`
        @media print {
          @page {
            margin: 0.5cm;
          }
          body {
            background: white !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .max-w-3xl {
            max-width: 100% !important;
            margin: 0 !important;
            border: none !important;
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
}
