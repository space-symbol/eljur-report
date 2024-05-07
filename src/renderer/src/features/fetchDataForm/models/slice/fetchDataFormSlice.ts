import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DatabaseProperties, FetchDataFormSchema, SaveInto } from '../types/fetchDataFormSchema'
import { fetchData } from '../services/fetchData/fetchData'
import {
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT
} from '@renderer/shared/const/localstorage'
import { setDBPropsToLocalStorage } from '@renderer/shared/lib/setDBPropsToLocalStorage'
import { saveData } from '../services/saveData'

const initialState: FetchDataFormSchema = {
  response: [],
  isFetching: false,
  percentage: 0,
  canceled: false,
  saveInto: SaveInto.json,
  done: false,

  databaseProperties: {
    database: localStorage.getItem(DATABASE_NAME) || '',
    user: localStorage.getItem(DATABASE_USER) || '',
    password: localStorage.getItem(DATABASE_PASSWORD) || '',
    host: localStorage.getItem(DATABASE_HOST) || 'localhost',
    port: Number(localStorage.getItem(DATABASE_PORT)) || 3306
  }
}

const fetchDataFormSlice = createSlice({
  name: 'fetchDataForm',
  initialState,
  reducers: {
    setPercentage: (state, action: PayloadAction<number>) => {
      state.percentage = action.payload
    },
    setCanceled: (state, action: PayloadAction<boolean>) => {
      state.canceled = action.payload
    },
    setSaveInto: (state, action: PayloadAction<SaveInto>) => {
      state.saveInto = action.payload
    },
    setDatabaseData: (state, action: PayloadAction<DatabaseProperties>) => {
      state.databaseProperties = action.payload
      setDBPropsToLocalStorage(action.payload)
    },
    setDone: (state, action: PayloadAction<boolean>) => {
      state.done = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isFetching = true
        state.canceled = false
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.response = action.payload
        state.isFetching = false
        state.percentage = 0
        state.canceled = false
      })
      .addCase(fetchData.rejected, (state) => {
        state.isFetching = false
      })
      .addCase(saveData.fulfilled, (state) => {
        state.done = true
      })
      .addCase(saveData.rejected, (state) => {
        state.done = false
      })
  }
})
export const { actions: fetchDataFormActions, reducer: fetchDataFormReducer } = fetchDataFormSlice
