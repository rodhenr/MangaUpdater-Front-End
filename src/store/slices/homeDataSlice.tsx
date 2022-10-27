import { createSlice } from "@reduxjs/toolkit";

interface Sources {
  sourceID: string;
  pathID: string;
  chapter: string;
  date: Date;
  scanlator: string;
}
export interface Data {
  image: string;
  name: string;
  mangaID: string;
  sources: Sources[];
}

export interface Home {
  data: Data[];
}

const initialState: Home = {
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
