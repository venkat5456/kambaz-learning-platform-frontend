"use client";

import Modules from "./Modules";
import CourseStatus from "./CourseStatus";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import * as db from "../../../Database";

// ✅ Define the structure of each enrollment record
interface Enrollment {
  _id?: string;
  user: string;
  course: string;
}

export default function Home() {
  const { cid } = useParams();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const { enrollments } = db;

  // ✅ Check if user is enrolled (typed)
  const isEnrolled = currentUser
    ? (enrollments as Enrollment[]).some(
        (enrollment) =>
          enrollment.user === currentUser._id && enrollment.course === cid
      )
    : false;

  // ✅ If not enrolled → show message instead of modules
  if (!isEnrolled) {
    return (
      <div
        className="d-flex justify-content-center align-items-center text-danger"
        style={{ height: "80vh", flexDirection: "column" }}
      >
        <h2>You are not enrolled in this course.</h2>
        <p className="text-muted">
          Please go back to your Dashboard and enroll to access this course.
        </p>
      </div>
    );
  }

  // ✅ Otherwise, render normal Home content
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