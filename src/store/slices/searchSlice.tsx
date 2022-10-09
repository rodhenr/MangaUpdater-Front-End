import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Source {
  id: string;
  linkId: string;
  lastChapter: string;
  scan: string;
  date: Date;
}

interface Data {
  id: string;
  image: string;
  name: string;
  source: Source[];
}

export interface searchState {
  item: string;
  data: Data[];
}

const initialState: searchState = {
  item: "",
  data: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    changeSearch: (state, action: PayloadAction<string>) => {
      state.item = action.payload;
    },
    addSearchData: (state, action) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addSearchData, changeSearch } = searchSlice.actions;

export default searchSlice.reducer;
