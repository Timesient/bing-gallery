import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  yPosition: 0
};

export const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    setYPosition: (state, action) => {
      state.yPosition  = action.payload;
    }
  }
});

export const { setYPosition } = scrollSlice.actions;

export const selectYPosition = (state) => state.scroll.yPosition;

export default scrollSlice.reducer;
