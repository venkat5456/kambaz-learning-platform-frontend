"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CoursesIndex() {
  const router = useRouter();

  useEffect(() => {
    // Get last visited course, or default to CS1234
    const lastCourse = localStorage.getItem("lastCourse") || "CS1234";
    router.replace(`/Courses/${lastCourse}/Home`);
  }, [router]);

  return (
    <div className="p-3">
      <p>Redirecting to your last visited course...</p>
    </div>
  );
}
