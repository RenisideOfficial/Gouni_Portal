"use client";
import dynamic from "next/dynamic";

const ClearancePrintContent = dynamic(
  () =>
    import("@/components/pages/core/student/clearance/ClearancePrintContent"),
  { ssr: false },
);

export default function ClearancePrintPage() {
  return <ClearancePrintContent />;
}
