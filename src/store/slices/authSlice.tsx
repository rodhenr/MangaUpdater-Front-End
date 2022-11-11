import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Data {
  token: string;
  user: string;
  userAvatar: string;
}

const initialState: Data = {
  token: "",
  user: "",
  userAvatar: "",
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    addToken: (state, action) => {
      const { accessToken, user, userAvatar } = action.payload;
      state.token = accessToken;
      state.user = user;
      state.userAvatar = userAvatar;
    },
    removeToken: (state) => {
      state.token = "";
      state.user = "";
      state.userAvatar = "";
    },
  },
});

export const { addToken, removeToken } = tokenSlice.actions;
export const selectToken = (state: RootState) => state.auth.token;
export default tokenSlice.reducer;
