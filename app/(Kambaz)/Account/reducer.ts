import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ✅ Define a User interface with strong role typing
export interface User {
  _id?: string; 
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  dob?: string;
  role?: "USER" | "ADMIN" | "FACULTY" | "STUDENT";
}

// ✅ Define state type
interface AccountState {
  currentUser: User | null;
}

// ✅ Initial state
const initialState: AccountState = {
  currentUser: null,
};

// ✅ Slice definition
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    // Sets or clears the current user
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
  },
});

// ✅ Export actions and reducer
export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;