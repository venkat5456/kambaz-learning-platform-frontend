"use client";

import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./Courses/reducer";
import modulesReducer from "./Courses/[cid]/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/[cid]/Assignments/reducer"; // ✅ new import

// ✅ Combine all reducers
const store = configureStore({
  reducer: {
    coursesReducer,
    modulesReducer,
    accountReducer,
    assignmentsReducer, // ✅ add to global state
  },
});

// ✅ Type definitions
export type RootState = ReturnType<typeof store.getState>;
export default store;