"use client";

import { ReactNode } from "react";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation"; 

export default function CoursesLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { cid: string };
}) {
  const { cid } = params;

  return (
    <div id="wd-courses" className="p-3">
      {/* Course header */}
      <h2 className="text-danger d-flex align-items-center">
        <FaAlignJustify className="me-3 fs-4 mb-1" />
        Course {cid}
      </h2>
      <hr />

      {/* Flexbox layout */}
      <div className="d-flex">
        {/* Sidebar navigation */}
        <div className="d-none d-md-block border-end me-3" style={{ width: "200px" }}>
          <CourseNavigation cid={cid} /> 
        </div>

        {/* Main content */}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}

