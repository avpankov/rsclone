import { createSlice } from "@reduxjs/toolkit";

type scrollState = {
  scrollHeight: number;
};

const initialState: scrollState = {
  scrollHeight: 0,
};

const scrollHeightSlice = createSlice({
  name: "scroll",
  initialState,
  reducers: {
    addScrollHeight(state, action) {
      state.scrollHeight = action.payload;
    },
  },
});

export const { addScrollHeight } = scrollHeightSlice.actions;

export default scrollHeightSlice.reducer;
