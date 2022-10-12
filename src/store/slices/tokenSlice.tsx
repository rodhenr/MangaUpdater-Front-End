import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Data {
  token: string;
}

const initialState: Data = {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2NjU1NDIwNTIsImV4cCI6MTY2NTU0NTY1Mn0.qEH1lvv8CHjOpmi6HjI-Q4f9IJ4gBwSA3XoPmT1zmJk",
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    addToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToken } = tokenSlice.actions;

export default tokenSlice.reducer;
