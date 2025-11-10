import { createSlice } from "@reduxjs/toolkit";

// ✅ Initial state: no user is signed in
const initialState = {
  currentUser: null,
};

// ✅ Slice definition
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    // Sets or clears the current user
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

// ✅ Export actions and reducer
export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;