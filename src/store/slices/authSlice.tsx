import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Payload {
  accessToken: string;
  user: string;
}

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
      const { accessToken, user } = action.payload;
      state.token = accessToken;
      state.user = user;
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
