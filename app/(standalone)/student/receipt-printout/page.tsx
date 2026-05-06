"use client";
import dynamic from "next/dynamic";

const ReceiptPrintContent = dynamic(
  () => import("@/components/pages/core/student/payments/ReceiptPrintContent"),
  { ssr: false },
);

export default function ReceiptPrintPage() {
  return <ReceiptPrintContent />;
}
