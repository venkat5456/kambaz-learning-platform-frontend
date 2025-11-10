import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as db from "../../../Database";

export interface Assignment {
  _id: string;
  course: string;
  title: string;
  description?: string;
  points?: number;
  availableFrom?: string;
  dueDate?: string;
}

const initialState = {
  assignments: db.assignments as Assignment[],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, action: PayloadAction<Assignment>) => {
      state.assignments.push(action.payload);
    },
    deleteAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(
        (a) => a._id !== action.payload
      );
    },
    updateAssignment: (state, action: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((a) =>
        a._id === action.payload._id ? { ...a, ...action.payload } : a
      );
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;