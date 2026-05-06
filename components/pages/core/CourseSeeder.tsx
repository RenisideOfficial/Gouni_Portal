"use client";
import { useEffect } from "react";
import { courseMapping } from "@/lib/constants/course_data";

export default function CourseSeeder() {
  useEffect(() => {
    const existing = localStorage.getItem("gouni_master_courses");
    if (!existing) {
      // We store it as a flat array with metadata for easier CRUD operations
      const flatCourses: any[] = [];

      Object.entries(courseMapping).forEach(([dept, levels]) => {
        Object.entries(levels).forEach(([level, semesters]) => {
          Object.entries(semesters).forEach(([semester, courses]) => {
            courses.forEach((course) => {
              flatCourses.push({
                id: `${dept}-${level}-${semester}-${course.code}`.replace(
                  /\s+/g,
                  "-",
                ),
                dept,
                level,
                semester,
                ...course,
              });
            });
          });
        });
      });

      localStorage.setItem("gouni_master_courses", JSON.stringify(flatCourses));
      console.log("Master courses seeded to LocalStorage");
    }
  }, []);

  return null;
}
