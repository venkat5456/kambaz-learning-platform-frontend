"use client";

import { ReactNode } from "react";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import { courses as importedCourses } from "../../Database";
import { useParams } from "next/navigation";

// ✅ Define your course type
interface Course {
  _id: string;
  name: string;
  number?: string;
  term?: string;
  section?: string;
}

// ✅ Explicitly cast importedCourses to your Course[] type
const courses: Course[] = importedCourses as unknown as Course[];

export default function CoursesLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { cid } = useParams();

  // ✅ Safe find with type inference
  const course = courses.find((c) => c._id === cid);

  return (
    <div id="wd-courses" className="p-3">
      {/* Course header */}
      <h2 className="text-danger d-flex align-items-center">
        <FaAlignJustify className="me-3 fs-4 mb-1" />
        {course ? course.name : `Course ${cid}`}
      </h2>
      <hr />

      {/* Flexbox layout */}
      <div className="d-flex">
        {/* Sidebar navigation */}
        <div
          className="d-none d-md-block border-end me-3"
          style={{ width: "200px" }}
        >
          <CourseNavigation cid={cid as string} />
        </div>

        {/* Main content */}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
