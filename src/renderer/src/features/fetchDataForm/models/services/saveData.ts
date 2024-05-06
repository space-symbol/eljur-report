/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@renderer/shared/config/StoreConfig/StateSchema'
import { SaveInto } from '../types/fetchDataFormSchema'
import { SaveDialogOptions } from 'electron'

export const saveData = createAsyncThunk<void, ReportResult, ThunkConfig<string>>(
  'fetchDataForm/saveData',
  async (report, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI
    const state = getState().fetchDataForm
    console.log(state)
    if (state.canceled) {
      return rejectWithValue('Отменено пользователем')
    }
    switch (state.saveInto) {
      case SaveInto.json:
        {
          const content = JSON.stringify(report, null, 2)
          const options: SaveDialogOptions = {
            defaultPath: '/result',
            filters: [
              {
                name: 'Files',
                extensions: ['json']
              }
            ]
          }

          try {
            await window.api.showSaveDialog(content, options)
          } catch (err) {
            rejectWithValue(`Произошла ошибка при сохранении данных: ${err}`)
          }
        }
        break
      case SaveInto.mysql: {
        try {
          await window.api.insertReportIntoDB(state.databaseProperties, report)
        } catch (err) {
          rejectWithValue(`Произошла ошибка при сохранении данных ${err}`)
        }
        break
      }
    }
  }
)
