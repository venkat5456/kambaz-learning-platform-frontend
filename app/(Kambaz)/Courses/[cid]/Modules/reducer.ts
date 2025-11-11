import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { modules as initialModules } from "../../../Database";
import { v4 as uuidv4 } from "uuid";

/** ✅ Represents a lesson inside a module */
interface Lesson {
  _id?: string;
  name: string;
}

/** ✅ Represents a course module */
export interface Module {
  _id: string;
  name: string;
  course: string | string[] | undefined;
  editing?: boolean;
  lessons?: Lesson[]; // ✅ made optional (safe and realistic)
}

/** ✅ The Redux state shape for modules */
interface ModulesState {
  modules: Module[];
}

/** ✅ Initial state, typed to match database */
const initialState: ModulesState = {
  modules: initialModules as Module[],
};

/** ✅ Slice definition */
const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    /** ➕ Add a new module */
    addModule: (
      state,
      action: PayloadAction<{ name: string; course: string | string[] | undefined }>
    ) => {
      const newModule: Module = {
        _id: uuidv4(),
        name: action.payload.name || "New Module",
        course: action.payload.course,
        lessons: [], // always start empty
        editing: false,
      };
      state.modules.push(newModule);
    },

    /** ❌ Delete a module by ID */
    deleteModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.filter((m) => m._id !== action.payload);
    },

    /** ✏️ Update module (e.g., name or editing flag) */
    updateModule: (state, action: PayloadAction<Module>) => {
      state.modules = state.modules.map((m) =>
        m._id === action.payload._id ? action.payload : m
      );
    },

    /** 🖊️ Enable editing mode for a module */
    editModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.map((m) =>
        m._id === action.payload ? { ...m, editing: true } : m
      );
    },
  },
});

/** ✅ Export actions and reducer */
export const { addModule, deleteModule, updateModule, editModule } =
  modulesSlice.actions;
export default modulesSlice.reducer;
