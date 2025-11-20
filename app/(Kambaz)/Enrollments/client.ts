"use client";
import axios from "axios";

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;

export const findEnrollments = async (user?: string, course?: string) => {
  const response = await axios.get(ENROLLMENTS_API, {
    params: { user, course },
  });
  return response.data;
};

export const enrollUserInCourse = async (user: string, course: string) => {
  const response = await axios.post(ENROLLMENTS_API, { user, course });
  return response.data;
};

export const unenrollUserFromCourse = async (eid: string) => {
  const response = await axios.delete(`${ENROLLMENTS_API}/${eid}`);
  return response.data;
};
