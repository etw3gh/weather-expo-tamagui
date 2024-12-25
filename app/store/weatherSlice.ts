import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Platform } from 'react-native';

type LatLng = {
  lat: string;
  lng: string;
}

export type WeatherSliceState = {
  keys: string[] | null;
  error: boolean,
  currentWeather: any | null;
  forecastDaily: any | null;
  forecastHourly: null | null;
}

const initialState: WeatherSliceState = {
  keys: null,
  error: false,
  currentWeather: null,
  forecastDaily: null,
  forecastHourly: null,
}

// these must not be destructured https://docs.expo.dev/guides/environment-variables/
const localService = process.env.EXPO_PUBLIC_LOCAL_WEATHER_SERVICE

const prodService = process.env.EXPO_PUBLIC_WEATHER_SERVICE

const isDev = process.env.NODE_ENV === 'development'

const isLocalWeb = isDev && Platform.OS === 'web'

const suffix = 'us-central1/weather'

const weatherService = isLocalWeb ? localService : prodService

export const getWeather: any = createAsyncThunk (
  'weather/getWeather',
  async (payload: LatLng, { rejectWithValue }) => {
    const { lat, lng } = payload

    const url = `${weatherService}/${suffix}?lat=${lat}&lng=${lng}`

    try {
      const resp = await fetch(url)
      const data = await resp.json()

      return data
    } catch (e) {
      console.log(e)
      return rejectWithValue(e)
    }
  }
)

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeather.fulfilled, (state, action) => {
        const {
          keys,
          currentWeather,
          forecastDaily,
          forecastHourly,
        } : WeatherSliceState = action.payload

        state.keys = keys
        state.currentWeather = currentWeather
        state.forecastDaily = forecastDaily
        state.forecastHourly = forecastHourly

      })
      .addCase(getWeather.rejected, (state, action) => {
        console.log('getWeather.rejected: ', action)
        state.error = true
      })
  },
})

export const {} = weatherSlice.actions

export default weatherSlice.reducer
