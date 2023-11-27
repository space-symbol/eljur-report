import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FetchDataFormSchema } from '../types/fetchDataFormSchema'
import { fetchData } from '../services/fetchData'

const initialState: FetchDataFormSchema = {
  response: [],
  isLoading: false
}

const fetchDataFormSlice = createSlice({
  name: 'fetchDataForm',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<any>) => {
        state.response = action.payload
        state.isLoading = false
      })
      .addCase(fetchData.rejected, (state) => {
        state.isLoading = false
      })
  }
})
export const { actions: fetchDataFormActions, reducer: fetchDataFormReducer } = fetchDataFormSlice
