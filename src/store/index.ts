import { configureStore } from "@reduxjs/toolkit";
import scrollReducer from "./scrollHeightSlice";

const store = configureStore({
  reducer: {
    scroll: scrollReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;
