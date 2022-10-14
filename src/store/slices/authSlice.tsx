import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Data {
  token: string;
  user: string;
}

const initialState: Data = {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2NjU3MTM3NjEsImV4cCI6MTY2NTcxNzM2MX0.Ov5QxoZ5Yt3oHW3LEhmVSVNcHGqa2jE1quWlgeSNsBM",
  user: "",
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    removeToken: (state) => {
      state.token = "";
      state.user = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToken, removeToken } = tokenSlice.actions;

export default tokenSlice.reducer;
