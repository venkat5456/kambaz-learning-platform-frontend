"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Home from "./Home/page";

import {
  findEnrollments,
  enrollUserInCourse,
  unenrollUserFromCourse,
} from "../../Enrollments/client";




export default function CoursesPage() {
  const { cid } = useParams(); // course ID
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const [enrollmentId, setEnrollmentId] = useState<string | null>(null);
  const isStudent = currentUser?.role === "STUDENT";

  const loadEnrollment = async () => {
    if (!currentUser) return;
    const enrollments = await findEnrollments(currentUser._id, cid as string);

    if (enrollments.length > 0) {
      setEnrollmentId(enrollments[0]._id);
    } else {
      setEnrollmentId(null);
    }
  };

  useEffect(() => {
    loadEnrollment();
  }, [currentUser, cid]);

  if (!currentUser) {
    return (
      <div className="p-4 text-danger">
        <h3>Please sign in to access courses.</h3>
      </div>
    );
  }

  const handleEnroll = async () => {
    const result = await enrollUserInCourse(currentUser._id, cid as string);
    setEnrollmentId(result._id);
  };

  const handleUnenroll = async () => {
    if (!enrollmentId) return;
    await unenrollUserFromCourse(enrollmentId);
    setEnrollmentId(null);
  };

  // ⭐ Show enroll/unenroll controls
  if (!enrollmentId) {
    return (
      <div className="p-4">
        <h3>You are not enrolled in this course.</h3>
        {isStudent ? (
          <button className="btn btn-success mt-3" onClick={handleEnroll}>
            Enroll Now
          </button>
        ) : (
          <p className="text-danger mt-3">
            Faculty cannot enroll in courses.
          </p>
        )}
      </div>
    );
  }

  // ⭐ When enrolled → render the course content
  return (
    <div className="p-4">
      {isStudent && (
        <button
          className="btn btn-outline-danger mb-3"
          onClick={handleUnenroll}
        >
          Unenroll
        </button>
      )}

      <Home />
    </div>
  );
}
