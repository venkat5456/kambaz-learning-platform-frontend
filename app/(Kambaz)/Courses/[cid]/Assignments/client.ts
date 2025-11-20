"use client";
import axios from "axios";

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;

export interface Assignment {
  _id?: string;
  course: string;
  title: string;
  description?: string;
  points?: number;
  availableFrom?: string;
  dueDate?: string;
  untilDate?: string;
}

// GET assignments by course
export const findAssignments = async (course: string) => {
  const response = await axios.get(ASSIGNMENTS_API, {
    params: { course },
  });
  return response.data;
};

// GET one assignment
export const findAssignmentById = async (id: string) => {
  const response = await axios.get(`${ASSIGNMENTS_API}/${id}`);
  return response.data;
};

// CREATE assignment
export const createAssignment = async (assignment: Assignment) => {
  const response = await axios.post(ASSIGNMENTS_API, assignment);
  return response.data;
};

// UPDATE assignment
export const updateAssignment = async (id: string, assignment: Assignment) => {
  const response = await axios.put(`${ASSIGNMENTS_API}/${id}`, assignment);
  return response.data;
};

// DELETE assignment
export const deleteAssignmentById = async (id: string) => {
  const response = await axios.delete(`${ASSIGNMENTS_API}/${id}`);
  return response.data;
};
