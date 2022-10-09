import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Sources {
  id: string;
  linkId: string;
  lastChapter: string;
  scan: string;
  date: Date;
}

export interface DataModal {
  image: string;
  name: string;
  author: string;
  sources: Sources[];
  follow: boolean;
}

interface InitialState {
  open: boolean;
  mangaId: string;
  data: DataModal;
}

const initialState: InitialState = {
  open: false,
  mangaId: "",
  data: {
    image: "",
    name: "",
    author: "",
    sources: [],
    follow: false,
  },
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    changeState: (state) => {
      state.open = !state.open;
    },
    setMangaId: (state, action: PayloadAction<string>) => {
      state.mangaId = action.payload;
    },
    addData: (state, action: PayloadAction<DataModal>) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addData, changeState, setMangaId } = modalSlice.actions;

export default modalSlice.reducer;
