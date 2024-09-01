import { configureStore } from '@reduxjs/toolkit'
import {pizzaSlice} from './pizzaSlice'

export const resetStore = () => configureStore({
  reducer: {
  [pizzaSlice.reducerPath]: pizzaSlice.reducer
    // add your reducer(s) here
  },
  middleware: getDefault => getDefault().concat(
    pizzaSlice.middleware
    // if using RTK Query for your networking: add your middleware here
    // if using Redux Thunk for your networking: you can ignore this
  ),
})

export const store = resetStore()