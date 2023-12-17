import { createSlice } from '@reduxjs/toolkit'
import { DateIntervalSchema } from '../types/DateIntervalSchema'

const currentDate = new Date()
const previousDate = new Date(new Date().setDate(currentDate.getDate() - 1))

const formattedDefaultFromDate = previousDate.toISOString().substring(0, 10)
const formattedDefaultToDate = currentDate.toISOString().substring(0, 10)

const initialState: DateIntervalSchema = {
  fromDateValue: formattedDefaultFromDate,
  toDateValue: formattedDefaultToDate,
  isValid: true,
  error: ''
}

const dateIntervalSlice = createSlice({
  name: 'dateIntervalSlice',
  initialState,
  reducers: {
    setFromDateValue: (state, action) => {
      state.fromDateValue = action.payload
    },
    setToDateValue: (state, action) => {
      state.toDateValue = action.payload
    },
    setIsValid: (state, action) => {
      state.isValid = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    }
  }
})

export const { reducer: dateIntervalReducer, actions: dateIntervalActions } = dateIntervalSlice
