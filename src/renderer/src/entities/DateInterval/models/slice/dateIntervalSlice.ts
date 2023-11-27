import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DateIntervalSchema } from '../types/DateIntervalSchema'

const currentDate = new Date().toISOString().substring(0, 10)
const initialState: DateIntervalSchema = {
  fromDate: currentDate,
  toDate: currentDate
}
const dateIntervalSlice = createSlice({
  name: 'fetchDataForm',
  initialState,
  reducers: {
    setFromDate: (state, action: PayloadAction<string>) => {
      const toDay = new Date()
      const newDate = new Date(action.payload)
      if (toDay < newDate) {
        state.fromDate = toDay.toISOString().substring(0, 10)
      } else {
        state.fromDate = action.payload
      }
    },
    setToDate: (state, action: PayloadAction<string>) => {
      const toDay = new Date()
      const newDate = new Date(action.payload)
      if (toDay < newDate) {
        state.toDate = toDay.toISOString().substring(0, 10)
      } else {
        state.toDate = action.payload
      }
    }
  }
})
export const { actions: dateIntervalActions, reducer: dateIntervalReducer } = dateIntervalSlice
