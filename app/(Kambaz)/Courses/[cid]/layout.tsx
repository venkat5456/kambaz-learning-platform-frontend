"use client";

import { ReactNode } from "react";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import { courses } from "../../Database";
import { useParams } from "next/navigation";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams(); // ✅ useParams() replaces destructuring from props

  // ✅ Find the course by ID from your courses.json
  const course = courses.find((course) => course._id === cid);

  return (
    <div id="wd-courses" className="p-3">
      {/* Course header */}
      <h2 className="text-danger d-flex align-items-center">
        <FaAlignJustify className="me-3 fs-4 mb-1" />
        {course ? course.name : `Course ${cid}`} {/* ✅ Dynamic name */}
      </h2>
      <hr />

      {/* Flexbox layout */}
      <div className="d-flex">
        {/* Sidebar navigation */}
        <div
          className="d-none d-md-block border-end me-3"
          style={{ width: "200px" }}
        >
          <CourseNavigation cid={cid as string} /> {/* ✅ Ensure correct type */}
        </div>

        {/* Main content */}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
