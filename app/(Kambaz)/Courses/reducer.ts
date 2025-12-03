import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { courses as initialCourses } from "../Database";
import { v4 as uuidv4 } from "uuid";


export interface Course {
  _id: string;            // required and safe
  name: string;

  number?: string;
  term?: string;
  startDate?: string;
  endDate?: string;
  credits?: number;

  // ➕ add these two so server data matches reducer
  description?: string;
  image?: string;
}


interface CoursesState {
  courses: Course[];
}


const initialState: CoursesState = {
  courses: initialCourses as Course[],
};


const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    // ➕ Add new course
    addNewCourse: (
      state,
      action: PayloadAction<Omit<Course, "_id">>
    ) => {
      const newCourse: Course = { ...action.payload, _id: uuidv4() };
      state.courses.push(newCourse);
    },

   
    deleteCourse: (state, action: PayloadAction<string>) => {
      state.courses = state.courses.filter(
        (course) => course._id !== action.payload
      );
    },

    // ✏️ Update existing course
    updateCourse: (state, action: PayloadAction<Course>) => {
      state.courses = state.courses.map((c) =>
        c._id === action.payload._id ? action.payload : c
      );
    },

    // 🔁 Replace all courses (optional helper)
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },
  },
});


export const { addNewCourse, deleteCourse, updateCourse, setCourses } =
  coursesSlice.actions;

// ✅ Export reducer to be added to the store
export default coursesSlice.reducer;