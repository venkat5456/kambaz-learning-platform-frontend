"use client";

import Modules from "./Modules";
import CourseStatus from "./CourseStatus";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useEffect, useState } from "react";

import {
  findEnrollments,
  enrollUserInCourse,
  unenrollUserFromCourse,
} from "../../../Enrollments/client";
export default function Home() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [enrollmentId, setEnrollmentId] = useState<string | null>(null);
  const isStudent = currentUser?.role === "STUDENT";

  const loadEnrollment = async () => {
    if (!currentUser) return;
    const enrollments = await findEnrollments(currentUser._id, cid as string);
    if (enrollments.length > 0) setEnrollmentId(enrollments[0]._id);
    else setEnrollmentId(null);
  };

  useEffect(() => {
    loadEnrollment();
  }, [currentUser, cid]);

  if (!currentUser) {
    return (
      <div className="d-flex justify-content-center align-items-center text-danger"
        style={{ height: "80vh", flexDirection: "column" }}>
        <h2>Please sign in to access the course.</h2>
      </div>
    );
  }

  const handleEnroll = async () => {
  if (!currentUser?._id || !cid) {
    alert("Please sign in first!");
    return;
  }

  const courseId = Array.isArray(cid) ? cid[0] : cid; // 👈 Force to string

  const result = await enrollUserInCourse(currentUser._id, courseId);
  setEnrollmentId(result._id);
};


  const handleUnenroll = async () => {
    if (!enrollmentId) return;
    await unenrollUserFromCourse(enrollmentId);
    setEnrollmentId(null);
  };

  // ⭐ SHOW COMPACT ENROLL BUTTON
  if (isStudent && !enrollmentId) {
    return (
      <div className="d-flex justify-content-center align-items-center text-danger"
        style={{ height: "80vh", flexDirection: "column" }}>
        <h2>Not Enrolled</h2>
        <button
          className="mt-3"
          onClick={handleEnroll}
          style={{
            border: "2px solid #2e7d32",
            background: "white",
            color: "#2e7d32",
            borderRadius: "8px",
            padding: "6px 18px",
            fontSize: "16px",
            fontWeight: 500,
            cursor: "pointer",
          }}>
          Enroll Now
        </button>
      </div>
    );
  }

  // ⭐ SHOW COMPACT UNENROLL BUTTON ABOVE COURSE
  return (
    <div id="wd-home" className="d-flex flex-column">
      {isStudent && (
        <div className="mb-3">
          <button
            onClick={handleUnenroll}
            style={{
              border: "2px solid #b22222",
              background: "transparent",
              color: "#b22222",
              borderRadius: "8px",
              padding: "6px 18px",
              fontSize: "16px",
              fontWeight: 500,
              cursor: "pointer",
            }}>
            Unenroll
          </button>
        </div>
      )}

      {/* Main Course Content */}
      <div className="d-flex">
        <div className="flex-fill me-3">
          <Modules />
        </div>

        <div className="d-none d-lg-block" style={{ width: "250px" }}>
          <CourseStatus />
        </div>
      </div>
    </div>
  );
}
