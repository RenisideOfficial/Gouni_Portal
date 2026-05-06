"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Printer, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";

export default function ReceiptPrintContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("id");

  const [payment, setPayment] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const storedUser = JSON.parse(
        localStorage.getItem("gouni_current_user") || "null",
      );
      const allPayments = JSON.parse(
        localStorage.getItem("gouni_payments") || "[]",
      );
      const currentPayment = allPayments.find((p: any) => p.id === paymentId);

      setUser(storedUser);
      setPayment(currentPayment);
    }, 0);
    return () => clearTimeout(timer);
  }, [paymentId]);

  if (!user || !payment)
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="animate-spin text-blue-900 w-8 h-8" />
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 print:bg-white pb-20 font-sans">
      <div className="max-w-3xl mx-auto pt-8 px-4 print:hidden flex justify-between items-center mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-600 font-bold hover:text-blue-900 transition-colors">
          <ArrowLeft size={18} /> Back
        </button>
        <button
          onClick={() => window.print()}
          className="bg-blue-900 text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-2 shadow-xl hover:bg-blue-800 transition-all">
          <Printer size={18} /> Print Receipt
        </button>
      </div>

      <div className="max-w-3xl mx-auto bg-white shadow-2xl print:shadow-none border-2 border-slate-100 p-8 sm:p-16 rounded-[2.5rem] print:rounded-none relative overflow-hidden">
        {/* Paid Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 pointer-events-none opacity-5">
          <span className="text-[10rem] font-black tracking-tighter text-green-700">
            PAID
          </span>
        </div>

        <div className="flex flex-col items-center text-center border-b-4 border-blue-900 pb-8 mb-10 relative z-10">
          <img
            src="/images/gouni_logo.svg"
            alt="GOUNI Logo"
            className="w-24 h-24 mb-4"
          />
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
            Godfrey Okoye University
          </h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1 italic">
            Office of the Bursar
          </p>
          <div className="mt-6 bg-slate-100 border border-slate-200 text-slate-900 px-8 py-2 rounded-full text-xs font-black uppercase tracking-widest">
            Official E-Receipt
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-8 gap-x-12 mb-12 relative z-10">
          <div className="border-l-4 border-blue-100 pl-4">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">
              Payer Name
            </label>
            <p className="text-lg font-black text-slate-900 uppercase leading-none">
              {user.name}
            </p>
          </div>
          <div className="border-l-4 border-blue-100 pl-4">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">
              Matriculation / Application No.
            </label>
            <p className="text-lg font-mono font-black text-blue-900 tracking-tighter leading-none">
              {user.regNumber || user.id}
            </p>
          </div>
          <div className="border-l-4 border-slate-100 pl-4">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">
              Academic Session
            </label>
            <p className="text-md font-bold text-slate-700 leading-none">
              {payment.session}
            </p>
          </div>
          <div className="border-l-4 border-slate-100 pl-4">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">
              Date of Payment
            </label>
            <p className="text-md font-bold text-slate-700 leading-none">
              {payment.date}
            </p>
          </div>
        </div>

        <div className="border-2 border-slate-900 rounded-2xl overflow-hidden mb-12 relative z-10">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="py-4 px-6 text-left text-[10px] font-black uppercase border-r border-slate-700">
                  Description
                </th>
                <th className="py-4 px-6 text-left text-[10px] font-black uppercase border-r border-slate-700 w-48">
                  Transaction Ref
                </th>
                <th className="py-4 px-6 text-right text-[10px] font-black uppercase w-48">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="py-6 px-6 text-sm font-black text-slate-900 uppercase border-r border-slate-200">
                  {payment.type}
                </td>
                <td className="py-6 px-6 text-xs font-mono font-bold text-slate-500 border-r border-slate-200">
                  {payment.id}
                </td>
                <td className="py-6 px-6 text-xl font-black text-slate-900 text-right">
                  ₦{Number(payment.amount).toLocaleString()}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-slate-50 border-t border-slate-300">
                <td
                  colSpan={2}
                  className="py-4 px-6 font-black uppercase text-right text-[10px] tracking-widest text-slate-500">
                  Total Amount Paid
                </td>
                <td className="py-4 px-6 font-black text-right text-xl text-green-700 flex justify-end items-center gap-2">
                  <CheckCircle2 size={18} /> ₦
                  {Number(payment.amount).toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          This is a computer-generated receipt. It requires no physical
          signature.
        </div>
      </div>
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            padding: 0 !important;
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
