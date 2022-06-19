import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentCountry: 'global'
};

export const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setCurrentCountry: (state, action) => {
      state.currentCountry  = action.payload;
    }
  }
});

export const { setCurrentCountry } = countrySlice.actions;

export const selectCurrentCountry = (state) => state.country.currentCountry;

export default countrySlice.reducer;
