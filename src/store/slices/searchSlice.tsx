import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface searchState {
  item: string;
}

const initialState: searchState = {
  item: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    changeSearch: (state, action: PayloadAction<string>) => {
      state.item = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeSearch } = searchSlice.actions;

export default searchSlice.reducer;
