"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Printer, ArrowLeft, Loader2, ShieldCheck } from "lucide-react";

export default function ClearancePrintContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionParam = searchParams.get("session");
  const semesterParam = searchParams.get("semester");

  const [user, setUser] = useState<any>(null);
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const storedUser = JSON.parse(
        localStorage.getItem("gouni_current_user") || "null",
      );
      const studentId = storedUser?.regNumber || storedUser?.id;

      const allPayments = JSON.parse(
        localStorage.getItem("gouni_payments") || "[]",
      );
      const myPayments = allPayments.filter(
        (p: any) =>
          p.studentId === studentId &&
          p.session === sessionParam &&
          p.status === "Paid",
      );

      setUser(storedUser);
      setPayments(myPayments);
    }, 0);
    return () => clearTimeout(timer);
  }, [sessionParam, semesterParam]);

  if (!user)
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="animate-spin text-pink-700" />
      </div>
    );

  return (
    <div className="min-h-screen bg-pink-50 print:bg-white pb-20 font-sans">
      <div className="max-w-4xl mx-auto pt-8 px-4 print:hidden flex justify-between items-center mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-pink-900 font-bold hover:text-pink-700 transition-colors">
          <ArrowLeft size={18} /> Back
        </button>
        <button
          onClick={() => window.print()}
          className="bg-pink-700 text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-2 shadow-xl hover:bg-pink-800 transition-all">
          <Printer size={18} /> Print Slip
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-2xl print:shadow-none border-2 border-pink-100 p-8 sm:p-16 rounded-[2.5rem] print:rounded-none relative overflow-hidden">
        {/* Background Watermark */}
        <ShieldCheck className="absolute -right-20 -bottom-20 w-[400px] h-[400px] text-pink-50 opacity-50 pointer-events-none" />

        <div className="flex flex-col items-center text-center border-b-4 border-pink-700 pb-8 mb-10 relative z-10">
          <img
            src="/images/gouni_logo.svg"
            alt="GOUNI Logo"
            className="w-24 h-24 mb-4 drop-shadow-sm"
          />
          <h1 className="text-3xl font-black text-pink-950 uppercase tracking-tighter">
            Godfrey Okoye University
          </h1>
          <p className="text-pink-600 font-bold uppercase tracking-widest text-[10px] mt-1 italic">
            Financial & Academic Clearance
          </p>
          <div className="mt-6 bg-pink-700 text-white px-8 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-md">
            Exam Clearance Pass — {sessionParam}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-8 gap-x-12 mb-12 relative z-10">
          <div className="border-l-4 border-pink-200 pl-4">
            <label className="text-[9px] font-black text-pink-400 uppercase tracking-widest block mb-1">
              Student Name
            </label>
            <p className="text-lg font-black text-pink-950 uppercase leading-none">
              {user.name}
            </p>
          </div>
          <div className="border-l-4 border-pink-200 pl-4">
            <label className="text-[9px] font-black text-pink-400 uppercase tracking-widest block mb-1">
              Matriculation ID
            </label>
            <p className="text-lg font-mono font-black text-pink-700 tracking-tighter leading-none">
              {user.regNumber}
            </p>
          </div>
          <div className="border-l-4 border-pink-200 pl-4">
            <label className="text-[9px] font-black text-pink-400 uppercase tracking-widest block mb-1">
              Program
            </label>
            <p className="text-md font-bold text-pink-900 leading-none">
              {user.prog}
            </p>
          </div>
          <div className="border-l-4 border-pink-200 pl-4">
            <label className="text-[9px] font-black text-pink-400 uppercase tracking-widest block mb-1">
              Semester
            </label>
            <p className="text-md font-bold text-pink-900 leading-none">
              {semesterParam}
            </p>
          </div>
        </div>

        <div className="border-2 border-pink-100 rounded-3xl overflow-hidden mb-12 relative z-10 bg-white">
          <div className="p-4 bg-pink-50 border-b border-pink-100 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-pink-800">
              Verified Payment Records
            </p>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-pink-50">
                <th className="py-3 px-6 text-left text-[10px] font-black uppercase text-pink-400">
                  Payment Type
                </th>
                <th className="py-3 px-6 text-left text-[10px] font-black uppercase text-pink-400">
                  Reference No.
                </th>
                <th className="py-3 px-6 text-right text-[10px] font-black uppercase text-pink-400">
                  Amount (₦)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50">
              {payments.map((p: any, i: number) => (
                <tr key={i}>
                  <td className="py-4 px-6 text-sm font-bold text-pink-950">
                    {p.type}
                  </td>
                  <td className="py-4 px-6 text-xs font-mono text-pink-600">
                    {p.id}
                  </td>
                  <td className="py-4 px-6 text-sm font-black text-pink-900 text-right">
                    {Number(p.amount).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-2 gap-20 mt-16 px-4 relative z-10">
          <div className="text-center">
            <div className="h-px bg-pink-200 mb-4" />
            <p className="text-[10px] font-black uppercase text-pink-900 mb-1">
              Bursary Validation Stamp
            </p>
          </div>
          <div className="text-center">
            <div className="h-px bg-pink-200 mb-4" />
            <p className="text-[10px] font-black uppercase text-pink-900 mb-1">
              Chief Invigilator Sign
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            padding: 0 !important;
          }
          .max-w-4xl {
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
