import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state for weather data
const dataState = { 
  city: '',
  temperature: [],
  pressure: [],
  humidity: [],
  loading: false,
  error: null,
};

// First thunk: get lat/lon from city search
export const getLocation = createAsyncThunk(
  'weather/getLocation',
  async (city) => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );

      const data = response.data;

      if (!data || data.length === 0) {
        throw new Error('City not found, please double check.');
      }

      const { lat, lon, name } = data[0];
      return { lat, lon, city: name }; 
    } catch (error) {
      throw error;
    }
  }
);

// Second thunk: get forecast by lat/lon cords
export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async ({ lat, lon }) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=imperial`
    );

    return response.data; // all weather data returned
  }
);

// Slice: tracks location and weather data
const weatherSlice = createSlice({

  name: 'weather',
  initialState: dataState,
  reducers: {},
  extraReducers: (builder) => {
    
    builder
      // getLocation starts (is pending)
      .addCase(getLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // getLocation succeeds (is fulfilled)
      .addCase(getLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.city = action.payload.city;
      })

      // fetchWeather succeeds (is fulfilled)
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        const dataList = action.payload.list;

        state.temperature = dataList.map((item) => item.main.temp);
        state.pressure = dataList.map((item) => item.main.pressure);
        state.humidity = dataList.map((item) => item.main.humidity);
      })

      // if either fetch fails an error is thrown
      .addCase(getLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default weatherSlice.reducer;