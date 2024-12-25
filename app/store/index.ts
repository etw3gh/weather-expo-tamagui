import { configureStore } from '@reduxjs/toolkit'
import weather from './weatherSlice'

const store = configureStore({
  devTools: true,
  reducer: {
    weather,
  },
})

export { store }
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
