import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";
import homeDataReducer from "./slices/homeData";
import modalReducer from "./slices/modalSlice";
import tokenReducer from "./slices/tokenSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    homeData: homeDataReducer,
    modal: modalReducer,
    token: tokenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
