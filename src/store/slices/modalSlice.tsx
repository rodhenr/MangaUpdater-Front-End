import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Sources {
  sourceID: string;
  pathID: string;
  chapter: string;
  date: Date;
  scanlator: string;
  follow: boolean;
}

export interface DataModal {
  id: string;
  image: string;
  name: string;
  author: string;
  genres: string;
  sources: Sources[];
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
    id: "",
    image: "",
    name: "",
    author: "",
    genres: "",
    sources: [],
  },
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    changeState: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
    setMangaId: (state, action: PayloadAction<string>) => {
      state.mangaId = action.payload;
    },
    addModalData: (state, action: PayloadAction<DataModal>) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addModalData, changeState, setMangaId } = modalSlice.actions;

export default modalSlice.reducer;
