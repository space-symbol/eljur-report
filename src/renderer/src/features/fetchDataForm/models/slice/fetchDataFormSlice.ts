import { createSlice } from '@reduxjs/toolkit'
import { FetchDataFormSchema } from '../types/fetchDataFormSchema'
import { fetchData } from '../services/fetchData/fetchData'

const initialState: FetchDataFormSchema = {
  response: [],
  isLoading: false,
  percentage: 0,
  canceled: false
}

const fetchDataFormSlice = createSlice({
  name: 'fetchDataForm',
  initialState,
  reducers: {
    setPercentage: (state, action) => {
      state.percentage = action.payload
    },
    setCanceled: (state, action) => {
      state.canceled = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.response = action.payload
        state.isLoading = false
        state.percentage = 0
      })
      .addCase(fetchData.rejected, (state) => {
        state.isLoading = false
      })
  }
})
export const { actions: fetchDataFormActions, reducer: fetchDataFormReducer } = fetchDataFormSlice
