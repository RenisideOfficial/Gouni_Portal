"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Printer, ArrowLeft, Loader2 } from "lucide-react";

export default function CoursePrintContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionParam = searchParams.get("session");
  const semesterParam = searchParams.get("semester");

  const [data, setData] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const storedUser = JSON.parse(
        localStorage.getItem("gouni_current_user") || "null",
      );
      const regs = JSON.parse(
        localStorage.getItem("gouni_registrations") || "[]",
      );

      const userReg = regs.find(
        (r: any) =>
          r.studentId === (storedUser?.regNumber || storedUser?.id) &&
          r.session === sessionParam &&
          r.semester === semesterParam,
      );

      setUser(storedUser);
      setData(userReg);
    }, 0);
    return () => clearTimeout(timer);
  }, [sessionParam, semesterParam]);

  if (!data || !user)
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="animate-spin text-blue-900 w-8 h-8" />
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 print:bg-white pb-10 font-sans">
      <div className="max-w-4xl mx-auto pt-6 px-4 print:hidden flex justify-between items-center mb-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-600 font-bold hover:text-blue-900 transition-colors">
          <ArrowLeft size={16} /> Back
        </button>
        <button
          onClick={() => window.print()}
          className="bg-blue-900 text-white px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-2 shadow-xl hover:bg-blue-800 transition-all">
          <Printer size={16} /> Print Course Form
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-2xl print:shadow-none border border-slate-200 p-6 sm:p-10 rounded-3xl print:rounded-none">
        {/* Compact Header */}
        <div className="flex flex-col items-center text-center border-b-2 border-blue-900 pb-4 mb-6">
          <img
            src="/images/gouni_logo.svg"
            alt="GOUNI Logo"
            className="w-16 h-16 mb-2"
          />
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
            Godfrey Okoye University, Enugu
          </h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[9px] mt-0.5 italic">
            Unity of Knowledge and Character
          </p>
          <div className="mt-3 bg-blue-900 text-white px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md">
            {data.semester} Course Form — {data.session}
          </div>
        </div>

        {/* Compact Student Info Grid */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-6">
          <div className="border-l-2 border-slate-200 pl-3">
            <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">
              Full Student Name
            </label>
            <p className="text-sm font-black text-slate-900 uppercase leading-none">
              {user.name}
            </p>
          </div>
          <div className="border-l-2 border-slate-200 pl-3">
            <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">
              Matriculation ID
            </label>
            <p className="text-sm font-mono font-black text-blue-900 tracking-tighter leading-none">
              {user.regNumber}
            </p>
          </div>
          <div className="border-l-2 border-slate-200 pl-3">
            <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">
              Program of Study
            </label>
            <p className="text-xs font-bold text-slate-700 leading-none">
              {user.prog}
            </p>
          </div>
          <div className="border-l-2 border-slate-200 pl-3">
            <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">
              Year Level
            </label>
            <p className="text-xs font-bold text-slate-700 leading-none">
              {user.level || "100L"}
            </p>
          </div>
        </div>

        {/* Compact Course Table */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden mb-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-2 px-4 text-left text-[9px] font-black uppercase text-slate-500 w-10">
                  #
                </th>
                <th className="py-2 px-4 text-left text-[9px] font-black uppercase text-slate-500 w-28">
                  Course Code
                </th>
                <th className="py-2 px-4 text-left text-[9px] font-black uppercase text-slate-500">
                  Course Description
                </th>
                <th className="py-2 px-4 text-right text-[9px] font-black uppercase text-slate-500 w-16">
                  Units
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.courses.map((c: any, i: number) => (
                <tr key={i} className="bg-white">
                  <td className="py-1.5 px-4 text-xs font-bold text-slate-400">
                    {i + 1}
                  </td>
                  <td className="py-1.5 px-4 text-xs font-black text-blue-900 font-mono">
                    {c.code}
                  </td>
                  <td className="py-1.5 px-4 text-xs font-bold text-slate-700">
                    {c.title}
                  </td>
                  <td className="py-1.5 px-4 text-xs font-black text-slate-900 text-right">
                    {c.units}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-900 text-white">
                <td
                  colSpan={3}
                  className="py-3 px-4 font-black uppercase text-right text-[10px] tracking-widest">
                  Total Credit Units
                </td>
                <td className="py-3 px-4 font-black text-right text-lg">
                  {data.courses.reduce(
                    (acc: number, curr: any) => acc + curr.units,
                    0,
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Compact Signatures */}
        <div className="grid grid-cols-2 gap-12 mt-8 px-4">
          <div className="text-center">
            <div className="h-px bg-slate-300 mb-2" />
            <p className="text-[8px] font-black uppercase text-slate-900 mb-1">
              Student's Signature
            </p>
          </div>
          <div className="text-center">
            <div className="h-px bg-slate-300 mb-2" />
            <p className="text-[8px] font-black uppercase text-slate-900 mb-1">
              Academic Adviser's Stamp
            </p>
          </div>
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
