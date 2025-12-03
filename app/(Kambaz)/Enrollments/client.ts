"use client";
import axios from "axios";

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;

// OPTIONAL QUERY (user or course)
export const findEnrollments = async (user?: string, course?: string) => {
  const response = await axios.get(ENROLLMENTS_API, {
    params: { user, course },
    withCredentials: true,
  });
  return response.data;
};

// ⭐ FIXED — ENROLL USER (MongoDB version)
export const enrollUserInCourse = async (user: string, course: string) => {
  const response = await axios.post(
    ENROLLMENTS_API,
    { user, course },
    { withCredentials: true }
  );
  return response.data;
};

// ⭐ FIXED — UNENROLL USER FROM COURSE (MongoDB version)
export const unenrollUserFromCourse = async (user: string, course: string) => {
  const response = await axios.delete(ENROLLMENTS_API, {
    data: { user, course },
    withCredentials: true,
  });
  return response.data;
};
