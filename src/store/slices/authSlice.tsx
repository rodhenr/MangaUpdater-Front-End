import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

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

export const { addToken, removeToken } = tokenSlice.actions;
export const selectToken = (state: RootState) => state.auth.token;
export default tokenSlice.reducer;
