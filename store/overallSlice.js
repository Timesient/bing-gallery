import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOverall: true
};

export const overallSlice = createSlice({
  name: 'overall',
  initialState,
  reducers: {
    setIsOverall: (state, action) => {
      state.isOverall = action.payload;
    }
  }
});

export const { setIsOverall } = overallSlice.actions;

export const selectIsOverall = (state) => state.overall.isOverall;

export default overallSlice.reducer;
