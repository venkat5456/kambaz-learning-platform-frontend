"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function Breadcrumb({
  course,
}: {
  course: { name: string } | undefined;
}) {
  const pathname = usePathname();

  // Get the current section name (e.g., Home, Modules, Assignments)
  const section = pathname.split("/").pop();

  return (
    <span className="fw-semibold">
      {course ? course.name : "Course"} &nbsp;&gt;&nbsp; {section}
    </span>
  );
}