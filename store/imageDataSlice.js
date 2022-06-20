import { createSlice } from '@reduxjs/toolkit';

const initialState = {}

export const imageDataSlice = createSlice({
  name: 'imageData',
  initialState,
  reducers: {
    setImageData: (state, action) => {
      const {key, value} = action.payload;
      state[key] = value;
    }
  }
});

export const { setImageData } = imageDataSlice.actions;

export const selectImageData = (state) => state.imageData;

export default imageDataSlice.reducer;
