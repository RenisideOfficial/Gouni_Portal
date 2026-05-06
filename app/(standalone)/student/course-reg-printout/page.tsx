"use client";
import dynamic from "next/dynamic";

const CoursePrintContent = dynamic(
  () => import("@/components/pages/core/student/course-reg/CoursePrintContent"),
  { ssr: false },
);

export default function CoursePrintPage() {
  return <CoursePrintContent />;
}
