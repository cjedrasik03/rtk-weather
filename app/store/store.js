import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './slices/getWeather'; 

const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});

export default store;