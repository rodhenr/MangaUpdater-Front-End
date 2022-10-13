import { createSlice } from "@reduxjs/toolkit";

export interface Data {
  image: string;
  name: string;
  author: string;
  sources: {
    mangaId: string;
    chapter: string;
    id: string;
    linkId: string;
    lastChapter: string;
    scan: string;
    date: Date;
  };
}

export interface Home {
  data: Data[];
  err: string;
}

const initialState: Home = {
  data: [],
  err: "",
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
    addHomeErr: (state, action) => {
      state.err = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addData, removeData, addHomeErr } = homeDataSlice.actions;

export default homeDataSlice.reducer;
