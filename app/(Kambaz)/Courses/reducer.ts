import { createSlice } from "@reduxjs/toolkit";
import { courses } from "../Database";
import { v4 as uuidv4 } from "uuid";

// ✅ Initial Redux state: copy of the database
const initialState = {
  courses: courses,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    // ➕ Add new course
    addNewCourse: (state, { payload: course }) => {
      const newCourse = { ...course, _id: uuidv4() };
      state.courses = [...state.courses, newCourse] as any;
    },

    // ❌ Delete a course
    deleteCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.filter(
        (course: any) => course._id !== courseId
      );
    },

    // ✏️ Update existing course
    updateCourse: (state, { payload: course }) => {
      state.courses = state.courses.map((c: any) =>
        c._id === course._id ? course : c
      ) as any;
    },

    // 🔁 Replace all courses (optional helper)
    setCourses: (state, { payload: courses }) => {
      state.courses = courses;
    },
  },
});

// ✅ Export reducer actions
export const { addNewCourse, deleteCourse, updateCourse, setCourses } =
  coursesSlice.actions;

// ✅ Export reducer to be added to the store
export default coursesSlice.reducer;