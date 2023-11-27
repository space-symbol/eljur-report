import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GroupSchema } from '../types/GroupSchema'
import { fetchGroups } from '../services/fetchGroups/fetchGroups'

const initialState: GroupSchema = {
  groupsList: ['Пусто'],
  isLoading: false,
  selected: []
}
const groupSlice = createSlice({
  name: 'fetchDataForm',
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<string>) => {
      if (action.payload === 'Все') {
        state.selected = [action.payload]
      } else if (state.selected[0] === 'Все') {
        state.selected.pop()
        state.selected.push(action.payload)
      } else {
        state.selected.push(action.payload)
      }
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchGroups.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.groupsList = action.payload
        state.selected = [action.payload[0]]
        state.isLoading = false
      })
      .addCase(fetchGroups.rejected, (state) => {
        state.groupsList = ['Пусто']
        state.isLoading = false
      })
  }
})
export const { actions: groupActions, reducer: groupReducer } = groupSlice
