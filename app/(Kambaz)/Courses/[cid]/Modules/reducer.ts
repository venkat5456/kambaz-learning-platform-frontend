import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { modules as initialModules } from "../../../Database";
import { v4 as uuidv4 } from "uuid";

// ✅ Define Lesson and Module interfaces
interface Lesson {
  _id?: string;
  name: string;
}

export interface Module {
  _id: string;
  name: string;
  course: string | string[] | undefined;
  editing?: boolean;
  lessons: Lesson[];
}

// ✅ Define State interface
interface ModulesState {
  modules: Module[];
}

// ✅ Initial state copied from the database (typed)
const initialState: ModulesState = {
  modules: initialModules as Module[],
};

// ✅ Slice for modules
const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    // ✅ Add new module
    addModule: (state, action: PayloadAction<{ name: string; course: string | string[] | undefined }>) => {
      const newModule: Module = {
        _id: uuidv4(),
        lessons: [],
        name: action.payload.name || "New Module",
        course: action.payload.course,
        editing: false,
      };
      state.modules.push(newModule);
    },

    // ✅ Delete a module by ID
    deleteModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.filter((m) => m._id !== action.payload);
    },

    // ✅ Update module’s data (e.g., name or editing flag)
    updateModule: (state, action: PayloadAction<Module>) => {
      state.modules = state.modules.map((m) =>
        m._id === action.payload._id ? action.payload : m
      );
    },

    // ✅ Enable editing mode
    editModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.map((m) =>
        m._id === action.payload ? { ...m, editing: true } : m
      );
    },
  },
});

// ✅ Export actions and reducer
export const { addModule, deleteModule, updateModule, editModule } = modulesSlice.actions;
export default modulesSlice.reducer;
