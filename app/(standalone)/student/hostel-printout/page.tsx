"use client";
import dynamic from "next/dynamic";

const HostelPrintContent = dynamic(
  () => import("@/components/pages/core/student/hostel/HostelPrintContent"),
  { ssr: false },
);

export default function HostelPrintPage() {
  return <HostelPrintContent />;
}
