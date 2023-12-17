import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GroupSchema } from '../types/GroupSchema'
import { fetchGroups } from '../services/fetchGroups/fetchGroups'

const initialState: GroupSchema = {
  groupsList: [],
  selectedGroupsList: [],
  filteredGroupsList: [],
  isLoading: false,
  error: '',
  isValid: false
}
const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    setSelectedGroups: (state, action: PayloadAction<string>) => {
      const group = action.payload
      if (group === 'Все') {
        state.selectedGroupsList = state.groupsList
        state.filteredGroupsList = []
      } else {
        state.selectedGroupsList.push(group)
        if (state.selectedGroupsList.length === state.groupsList.length - 1) {
          state.filteredGroupsList = []
          state.selectedGroupsList = state.groupsList
        }
        const filteredGroupsList = state.filteredGroupsList
        for (let i = 0; i < state.filteredGroupsList.length; i++) {
          if (group === filteredGroupsList[i]) {
            state.filteredGroupsList.splice(i, 1)
          }
        }
      }
      if (state.selectedGroupsList.length > 0) {
        state.error = ''
        state.isValid = true
      }
    },

    filterGroupsList: (state, action) => {
      const value = action.payload
      state.filteredGroupsList = state.groupsList.filter((el) => {
        const selectedGroupsList = state.selectedGroupsList
        for (const group of selectedGroupsList) {
          if (group === el) {
            return false
          }
        }
        return el.includes(value)
      })
    },

    removeSelectedGroup: (state, action) => {
      const group = action.payload
      const selectedGroupsList = state.selectedGroupsList
      if (group === 'Все') {
        state.filteredGroupsList = state.groupsList
        state.selectedGroupsList = []
        state.error = 'Выберите хотя бы одну группу'
        state.isValid = false
        return
      } else {
        const list = selectedGroupsList[0] === 'Все' ? selectedGroupsList.splice(0, 1) : []
        state.filteredGroupsList.push(...list)
      }
      for (let i = 0; i < selectedGroupsList.length; i++) {
        if (selectedGroupsList[i] === group) {
          const list = selectedGroupsList.splice(i, 1)
          state.filteredGroupsList.push(...list)
        }
      }
      if (selectedGroupsList.length === 0) {
        state.error = 'Выберите хотя бы одну группу'
        state.isValid = false
      }
    },
    setGroupsList: (state, action) => {
      state.groupsList = action.payload
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchGroups.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.groupsList = action.payload
        state.selectedGroupsList = action.payload
        state.isLoading = false
        state.isValid = true
      })
      .addCase(fetchGroups.rejected, (state) => {
        state.groupsList = ['Пусто']
        state.isLoading = false
      })
  }
})
export const { actions: groupActions, reducer: groupReducer } = groupSlice
