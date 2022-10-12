import { combineReducers, configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";
import homeDataReducer from "./slices/homeData";
import modalReducer from "./slices/modalSlice";
import tokenReducer from "./slices/tokenSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  search: searchReducer,
  token: tokenReducer,
  homeData: homeDataReducer,
  modal: modalReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["search", "token"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
