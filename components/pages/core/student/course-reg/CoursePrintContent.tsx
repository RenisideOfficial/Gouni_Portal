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
        <Loader2 className="animate-spin text-blue-900" />
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 print:bg-white pb-20 font-sans">
      <div className="max-w-4xl mx-auto pt-8 px-4 print:hidden flex justify-between items-center mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-600 font-bold hover:text-blue-900 transition-colors">
          <ArrowLeft size={18} /> Back
        </button>
        <button
          onClick={() => window.print()}
          className="bg-blue-900 text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-2 shadow-xl hover:bg-blue-800 transition-all">
          <Printer size={18} /> Print Course Form
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-2xl print:shadow-none border border-slate-200 p-8 sm:p-16 rounded-[2.5rem] print:rounded-none">
        <div className="flex flex-col items-center text-center border-b-4 border-blue-900 pb-8 mb-10">
          <img
            src="/images/gouni_logo.svg"
            alt="GOUNI Logo"
            className="w-24 h-24 mb-4"
          />
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
            Godfrey Okoye University, Enugu
          </h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1 italic">
            Unity of Knowledge and Character
          </p>
          <div className="mt-6 bg-blue-900 text-white px-8 py-2 rounded-full text-xs font-black uppercase tracking-widest">
            {data.semester} Course Form — {data.session}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-8 gap-x-12 mb-12">
          <div className="border-l-4 border-slate-100 pl-4">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">
              Full Student Name
            </label>
            <p className="text-lg font-black text-slate-900 uppercase leading-none">
              {user.name}
            </p>
          </div>
          <div className="border-l-4 border-slate-100 pl-4">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">
              Matriculation ID
            </label>
            <p className="text-lg font-mono font-black text-blue-900 tracking-tighter leading-none">
              {user.regNumber}
            </p>
          </div>
          <div className="border-l-4 border-slate-100 pl-4">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">
              Program of Study
            </label>
            <p className="text-md font-bold text-slate-700 leading-none">
              {user.prog}
            </p>
          </div>
          <div className="border-l-4 border-slate-100 pl-4">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">
              Year Level
            </label>
            <p className="text-md font-bold text-slate-700 leading-none">
              {user.level || "100L"}
            </p>
          </div>
        </div>

        <div className="border-2 border-slate-100 rounded-3xl overflow-hidden mb-12">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="py-4 px-6 text-left text-[10px] font-black uppercase text-slate-400 border-b border-slate-100 w-12">
                  #
                </th>
                <th className="py-4 px-6 text-left text-[10px] font-black uppercase text-slate-400 border-b border-slate-100">
                  Course Code
                </th>
                <th className="py-4 px-6 text-left text-[10px] font-black uppercase text-slate-400 border-b border-slate-100">
                  Course Description
                </th>
                <th className="py-4 px-6 text-right text-[10px] font-black uppercase text-slate-400 border-b border-slate-100">
                  Units
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.courses.map((c: any, i: number) => (
                <tr key={i}>
                  <td className="py-4 px-6 text-sm font-bold text-slate-300">
                    {i + 1}
                  </td>
                  <td className="py-4 px-6 text-sm font-black text-blue-900 font-mono">
                    {c.code}
                  </td>
                  <td className="py-4 px-6 text-sm font-bold text-slate-600">
                    {c.title}
                  </td>
                  <td className="py-4 px-6 text-sm font-black text-slate-900 text-right">
                    {c.units}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-900 text-white">
                <td
                  colSpan={3}
                  className="py-5 px-6 font-black uppercase text-right text-[10px] tracking-widest">
                  Total Credit Units
                </td>
                <td className="py-5 px-6 font-black text-right text-xl">
                  {data.courses.reduce(
                    (acc: number, curr: any) => acc + curr.units,
                    0,
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="grid grid-cols-2 gap-20 mt-16 px-4">
          <div className="text-center">
            <div className="h-px bg-slate-300 mb-4" />
            <p className="text-[10px] font-black uppercase text-slate-900 mb-1">
              Student's Signature
            </p>
          </div>
          <div className="text-center">
            <div className="h-px bg-slate-300 mb-4" />
            <p className="text-[10px] font-black uppercase text-slate-900 mb-1">
              Academic Adviser's Stamp
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
