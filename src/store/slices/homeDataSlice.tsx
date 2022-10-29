import { createSlice } from "@reduxjs/toolkit";
import { Data } from "../api/homeDataApiSlice";

interface HomeData {
  data: Data[];
}

const initialState: HomeData = {
  data: [],
};

export const homeDataSlice = createSlice({
  name: "homeData",
  initialState,
  reducers: {
    addData: (state, action) => {
      state.data = action.payload;
    },
    removeData: (state) => {
      state.data = [];
    },
  },
});

export const { addData, removeData } = homeDataSlice.actions;
export default homeDataSlice.reducer;
