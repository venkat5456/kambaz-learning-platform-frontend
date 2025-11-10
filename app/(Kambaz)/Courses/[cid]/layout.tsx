"use client";

import { ReactNode, useState } from "react";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

// ✅ Define Course interface
interface Course {
  _id: string;
  name: string;
  number?: string;
  startDate?: string;
  endDate?: string;
  term?: string;
}

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();

  // ✅ Get all courses from Redux store
  const { courses } = useSelector((state: RootState) => state.coursesReducer);

  // ✅ Find the selected course (typed, no `any`)
  const course = (courses as Course[]).find((c) => c._id === cid);

  // ✅ Track sidebar visibility
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  return (
    <div id="wd-courses" className="p-3">
      {/* ✅ Header with toggle button */}
      <h2 className="text-danger d-flex align-items-center">
        <FaAlignJustify
          className="me-3 fs-4 mb-1"
          style={{ cursor: "pointer" }}
          onClick={() => setShowSidebar(!showSidebar)}
          title={showSidebar ? "Hide sidebar" : "Show sidebar"}
        />
        {course ? course.name : `Course ${cid}`}
      </h2>
      <hr />

      {/* ✅ Flexbox layout */}
      <div className="d-flex">
        {/* Sidebar navigation (toggleable) */}
        {showSidebar && (
          <div className="border-end me-3" style={{ width: "200px" }}>
            <CourseNavigation cid={cid as string} />
          </div>
        )}

        {/* Main content */}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}