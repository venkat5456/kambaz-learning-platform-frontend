"use client";

import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import * as db from "../../Database";
import Home from "./Home/page";

// ✅ Define Enrollment type
interface Enrollment {
  _id?: string;
  user: string;
  course: string;
}

export default function CoursesPage() {
  const { cid } = useParams(); // e.g., "CS1234"
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

  // ✅ If not enrolled or not signed in
  if (!isEnrolled) {
    return (
      <div className="p-4 text-danger">
        <h3>You are not enrolled in this course.</h3>
        <p>Please sign in or enroll through your Dashboard to access this course.</p>
      </div>
    );
  }

  // ✅ If enrolled → render course normally
  return <Home />;
}