"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Printer, ArrowLeft, Loader2 } from "lucide-react";

export default function ResultPrintContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionParam = searchParams.get("session");
  const semesterParam = searchParams.get("semester");

  const [user, setUser] = useState<any>(null);
  const [results, setResults] = useState<any[]>([]);

  const calculateGrade = (ca: number, exam: number) => {
    const total = ca + exam;
    if (total >= 70) return { total, grade: "A", points: 5 };
    if (total >= 60) return { total, grade: "B", points: 4 };
    if (total >= 50) return { total, grade: "C", points: 3 };
    if (total >= 45) return { total, grade: "D", points: 2 };
    if (total >= 40) return { total, grade: "E", points: 1 };
    return { total, grade: "F", points: 0 };
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const storedUser = JSON.parse(
        localStorage.getItem("gouni_current_user") || "null",
      );
      const studentId = storedUser?.regNumber || storedUser?.id;

      const allRegs = JSON.parse(
        localStorage.getItem("gouni_registrations") || "[]",
      );
      const allResults = JSON.parse(
        localStorage.getItem("gouni_results") || "{}",
      );

      const currentReg = allRegs.find(
        (r: any) =>
          r.studentId === studentId &&
          r.session === sessionParam &&
          r.semester === semesterParam,
      );

      if (currentReg && currentReg.courses) {
        const compiledResults = currentReg.courses.map((course: any) => {
          const courseResults = allResults[course.code] || {};
          const myScore = courseResults[studentId];
          if (myScore) {
            const { total, grade, points } = calculateGrade(
              Number(myScore.ca),
              Number(myScore.exam),
            );
            return {
              ...course,
              ca: myScore.ca,
              exam: myScore.exam,
              total,
              grade,
              points,
              published: true,
            };
          }
          return {
            ...course,
            ca: "-",
            exam: "-",
            total: "-",
            grade: "PENDING",
            points: 0,
            published: false,
          };
        });
        setResults(compiledResults);
      }
      setUser(storedUser);
    }, 0);
    return () => clearTimeout(timer);
  }, [sessionParam, semesterParam]);

  if (!user)
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="animate-spin text-blue-900 w-8 h-8" />
      </div>
    );

  // Calculate Semester GPA
  const validResults = results.filter((r) => r.published);
  const totalUnits = validResults.reduce((acc, curr) => acc + curr.units, 0);
  const totalQualityPoints = validResults.reduce(
    (acc, curr) => acc + curr.units * curr.points,
    0,
  );
  const gpa =
    totalUnits > 0 ? (totalQualityPoints / totalUnits).toFixed(2) : "0.00";

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
          <Printer size={18} /> Print Statement
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-2xl print:shadow-none border border-slate-200 p-8 sm:p-16 rounded-[2.5rem] print:rounded-none">
        {/* Formal Header Without Profile Picture */}
        <div className="flex flex-col items-center text-center border-b-4 border-slate-900 pb-8 mb-10">
          <img
            src="/images/gouni_logo.svg"
            alt="GOUNI Logo"
            className="w-24 h-24 mb-4"
          />
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
            Godfrey Okoye University, Enugu
          </h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1 italic">
            Office of the Registrar (Academic Affairs)
          </p>
          <div className="mt-6 bg-slate-100 text-slate-900 border border-slate-300 px-8 py-2 rounded-full text-xs font-black uppercase tracking-widest">
            Statement of Academic Result
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-8 gap-x-12 mb-12">
          <div className="border-l-4 border-slate-200 pl-4">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">
              Student Name
            </label>
            <p className="text-lg font-black text-slate-900 uppercase leading-none">
              {user.name}
            </p>
          </div>
          <div className="border-l-4 border-slate-200 pl-4">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">
              Matriculation Number
            </label>
            <p className="text-lg font-mono font-black text-slate-900 tracking-tighter leading-none">
              {user.regNumber}
            </p>
          </div>
          <div className="border-l-4 border-slate-200 pl-4">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">
              Program of Study
            </label>
            <p className="text-md font-bold text-slate-700 leading-none">
              {user.prog}
            </p>
          </div>
          <div className="border-l-4 border-slate-200 pl-4">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">
              Session / Semester
            </label>
            <p className="text-md font-bold text-slate-700 leading-none">
              {sessionParam} — {semesterParam}
            </p>
          </div>
        </div>

        <div className="border-2 border-slate-900 rounded-xl overflow-hidden mb-12">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-900">
                <th className="py-3 px-4 text-left text-[10px] font-black uppercase text-white border-r border-slate-700 w-24">
                  Course Code
                </th>
                <th className="py-3 px-4 text-left text-[10px] font-black uppercase text-white border-r border-slate-700">
                  Course Title
                </th>
                <th className="py-3 px-4 text-center text-[10px] font-black uppercase text-white border-r border-slate-700 w-16">
                  Units
                </th>
                <th className="py-3 px-4 text-center text-[10px] font-black uppercase text-white border-r border-slate-700 w-16">
                  CA
                </th>
                <th className="py-3 px-4 text-center text-[10px] font-black uppercase text-white border-r border-slate-700 w-16">
                  Exam
                </th>
                <th className="py-3 px-4 text-center text-[10px] font-black uppercase text-white border-r border-slate-700 w-16">
                  Total
                </th>
                <th className="py-3 px-4 text-center text-[10px] font-black uppercase text-white w-16">
                  Grade
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {results.map((r: any, i: number) => (
                <tr key={i} className="bg-white">
                  <td className="py-3 px-4 text-sm font-bold text-slate-900 font-mono border-r border-slate-200">
                    {r.code}
                  </td>
                  <td className="py-3 px-4 text-sm font-bold text-slate-700 border-r border-slate-200">
                    {r.title}
                  </td>
                  <td className="py-3 px-4 text-sm font-black text-slate-900 text-center border-r border-slate-200">
                    {r.units}
                  </td>
                  <td className="py-3 px-4 text-sm font-bold text-slate-600 text-center border-r border-slate-200">
                    {r.ca}
                  </td>
                  <td className="py-3 px-4 text-sm font-bold text-slate-600 text-center border-r border-slate-200">
                    {r.exam}
                  </td>
                  <td className="py-3 px-4 text-sm font-black text-slate-900 text-center border-r border-slate-200">
                    {r.total}
                  </td>
                  <td
                    className={`py-3 px-4 text-sm font-black text-center ${!r.published ? "text-amber-600 text-[10px]" : "text-slate-900"}`}>
                    {r.grade}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="bg-slate-50 p-4 border-t-2 border-slate-900 flex justify-end gap-12">
            <div className="text-right">
              <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">
                Total Units Registered
              </p>
              <p className="text-2xl font-black text-slate-900">{totalUnits}</p>
            </div>
            <div className="text-right border-l-2 border-slate-300 pl-12">
              <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">
                Semester GPA
              </p>
              <p className="text-2xl font-black text-slate-900">{gpa}</p>
            </div>
          </div>
        </div>

        <div className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Any alteration or erasure renders this document invalid. This is an
          electronically generated statement.
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
