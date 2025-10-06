"use client";

import Modules from "./Modules";
import CourseStatus from "./CourseStatus";

export default function Home() {
  return (
    <div id="wd-home" className="d-flex">
      {/* Main content */}
      <div className="flex-fill me-3">
        <Modules />
      </div>

      {/* Course Status (only visible on lg and above) */}
      <div className="d-none d-lg-block" style={{ width: "250px" }}>
        <CourseStatus />
      </div>
    </div>
  );
}
