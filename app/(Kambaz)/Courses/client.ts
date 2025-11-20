"use client";

import axios from "axios";

// ⭐ Required to allow session cookies
const axiosWithCredentials = axios.create({
  withCredentials: true,
});

// Base URLs
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const COURSES_API = `${HTTP_SERVER}/api/courses`;
export const USERS_API = `${HTTP_SERVER}/api/users`;
export const MODULES_API = `${HTTP_SERVER}/api/modules`; // ⭐ NEW

//-----------------------------------
// COURSES CRUD
//-----------------------------------

// ⭐ Fetch courses user is enrolled in
export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/courses`
  );
  return data;
};

// ⭐ Fetch ALL courses (if needed)
export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

// ⭐ Create a course
export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/courses`,
    course
  );
  return data;
};

// ⭐ Delete a course
export const deleteCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${COURSES_API}/${courseId}`
  );
  return data;
};

// ⭐ Update a course
export const updateCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.put(
    `${COURSES_API}/${course._id}`,
    course
  );
  return data;
};

//-----------------------------------
// MODULES CRUD
//-----------------------------------

// ⭐ Get modules for a course
export const findModulesForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/modules`
  );
  return data;
};

// ⭐ Create a module for a course
export const createModuleForCourse = async (courseId: string, module: any) => {
  const { data } = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return data;
};

// ⭐ Update a module
export const updateModule = async (module: any) => {
  const { data } = await axiosWithCredentials.put(
    `${MODULES_API}/${module._id}`,
    module
  );
  return data;
};

// ⭐ Delete a module
export const deleteModule = async (moduleId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${MODULES_API}/${moduleId}`
  );
  return data;
};
