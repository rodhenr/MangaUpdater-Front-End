import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Data {
  token: string;
  user: string;
}

const initialState: Data = {
  token: "",
  user: "",
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.token = action.payload;
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
