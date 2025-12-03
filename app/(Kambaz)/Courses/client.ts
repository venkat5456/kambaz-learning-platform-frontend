"use client";

import axios from "axios";

export interface Course {
  _id: string;               // MAKE THIS REQUIRED (important)
  name: string;
  description?: string;
  image?: string;
}


export interface Module {
  _id?: string;
  name: string;
  description?: string;
  course?: string;
}

// ---------- Axios Instance with Cookies ----------
const axiosWithCredentials = axios.create({
  withCredentials: true,
});

// ---------- Base URLs ----------
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const COURSES_API = `${HTTP_SERVER}/api/courses`;
export const USERS_API = `${HTTP_SERVER}/api/users`;
export const MODULES_API = `${HTTP_SERVER}/api/modules`;

// -----------------------------------
// COURSES CRUD
// -----------------------------------

// Fetch courses user is enrolled in
export const findMyCourses = async (): Promise<Course[]> => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
  return data;
};

// Fetch ALL courses (if needed)
export const fetchAllCourses = async (): Promise<Course[]> => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

// Create a new course
export const createCourse = async (course: Course): Promise<Course[]> => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/courses`,
    course
  );
  return data;
};

// Delete a course
export const deleteCourse = async (courseId: string): Promise<Course[]> => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${courseId}`);
  return data;
};

// Update a course
export const updateCourse = async (course: Course): Promise<Course[]> => {
  if (!course._id) throw new Error("Course _id is required for update");
  const { data } = await axiosWithCredentials.put(
    `${COURSES_API}/${course._id}`,
    course
  );
  return data;
};

// -----------------------------------
// MODULES CRUD
// -----------------------------------

export const findModulesForCourse = async (courseId: string): Promise<Module[]> => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/modules`
  );
  return data;
};

// Create module for a course
export const createModuleForCourse = async (
  courseId: string,
  module: Module
): Promise<Module[]> => {
  const { data } = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return data;
};

// Enroll user into a course
export const enrollIntoCourse = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/${userId}/courses/${courseId}`
  );
  return data;
};

// Unenroll user from a course
export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${USERS_API}/${userId}/courses/${courseId}`
  );
  return data;
};

// Update module
export const updateModule = async (module: Module): Promise<Module[]> => {
  if (!module._id) throw new Error("Module _id is required for update");
  const { data } = await axiosWithCredentials.put(
    `${MODULES_API}/${module._id}`,
    module
  );
  return data;
};

// Delete module
export const deleteModule = async (moduleId: string): Promise<Module[]> => {
  const { data } = await axiosWithCredentials.delete(`${MODULES_API}/${moduleId}`);
  return data;
};

// -----------------------------------
// ⭐️ 6.4.3.5 — GET USERS ENROLLED IN A COURSE
// -----------------------------------
export const findUsersForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/users`);
  return data;
};
