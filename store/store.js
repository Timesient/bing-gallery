import { configureStore } from '@reduxjs/toolkit';
import countryReducer from './countrySlice';
import scrollReducer from './scrollSlice';

export const store = configureStore({
  reducer: {
    country: countryReducer,
    scroll: scrollReducer,
  },
});

export function makeStore() {
  return store;
}