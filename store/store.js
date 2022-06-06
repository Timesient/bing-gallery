import { configureStore } from '@reduxjs/toolkit';
import countryReducer from './countrySlice';
import scrollReducer from './scrollSlice';
import overallReducer from './overallSlice';

export const store = configureStore({
  reducer: {
    country: countryReducer,
    scroll: scrollReducer,
    overall: overallReducer,
  },
});

export function makeStore() {
  return store;
}