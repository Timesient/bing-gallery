import { configureStore } from '@reduxjs/toolkit';
import countryReducer from './countrySlice';
import imageDataReducer from './imageDataSlice';

export const store = configureStore({
  reducer: {
    country: countryReducer,
    imageData: imageDataReducer,
  },
});

export function makeStore() {
  return store;
}