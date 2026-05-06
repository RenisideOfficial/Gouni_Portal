"use client";
import dynamic from "next/dynamic";

const ResultPrintContent = dynamic(
  () => import("@/components/pages/core/student/result/ResultPrintContent"),
  { ssr: false },
);

export default function ResultPrintPage() {
  return <ResultPrintContent />;
}
