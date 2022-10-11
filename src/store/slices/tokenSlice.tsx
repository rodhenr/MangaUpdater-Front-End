import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Data {
  token: string;
}

const initialState: Data = {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2NjU0NDg5MTUsImV4cCI6MTY2NTQ1MjUxNX0.dDroPderh9vb12h9j9Hwq1qOop1xjbNUsg_DwEsqU9c",
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
