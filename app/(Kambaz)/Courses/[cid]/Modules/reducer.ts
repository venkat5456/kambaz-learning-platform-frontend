import { createSlice } from "@reduxjs/toolkit";
import { modules } from "../../../Database";
import { v4 as uuidv4 } from "uuid";

// ✅ Initial state copied from the database
const initialState = {
  modules: modules,
};

// ✅ Slice for modules
const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    // Add new module
    addModule: (state, { payload: module }) => {
      const newModule: any = {
        _id: uuidv4(),
        lessons: [],
        name: module.name || "New Module",
        course: module.course,
      };
      state.modules = [...state.modules, newModule] as any;
    },

    // Delete a module by ID
    deleteModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.filter((m: any) => m._id !== moduleId);
    },

    // Update module’s data (e.g., name or editing flag)
    updateModule: (state, { payload: module }) => {
      state.modules = state.modules.map((m: any) =>
        m._id === module._id ? module : m
      ) as any;
    },

    // Enable editing mode
    editModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.map((m: any) =>
        m._id === moduleId ? { ...m, editing: true } : m
      ) as any;
    },
  },
});

// ✅ Export actions and reducer
export const { addModule, deleteModule, updateModule, editModule } =
  modulesSlice.actions;
export default modulesSlice.reducer;