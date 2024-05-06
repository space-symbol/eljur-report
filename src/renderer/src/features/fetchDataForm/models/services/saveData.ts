/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@renderer/shared/config/StoreConfig/StateSchema'
import { SaveInto } from '../types/fetchDataFormSchema'
import { SaveDialogOptions } from 'electron'
import { fetchDataFormActions } from '../slice/fetchDataFormSlice'

export const saveData = createAsyncThunk<void, ReportResult, ThunkConfig<string>>(
  'fetchDataForm/saveData',
  async (result, thunkAPI) => {
    const { _, rejectWithValue, dispatch, getState } = thunkAPI
    const state = getState().fetchDataForm

    if (state.canceled === true) return
    switch (state.saveInto) {
      case SaveInto.json:
        {
          const content = JSON.stringify(result, null, 2)
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
            window.api.showSaveDialog(content, options)
          } catch (err) {
            console.log(err)
          }
        }
        break
      case SaveInto.mysql: {
        window.api.insertReportIntoDB(state.databaseProperties, result).then(
          () => {
            dispatch(fetchDataFormActions.setDone(true))
          },
          () => rejectWithValue('Произошла ошибка при сохранении данных')
        )
        break
      }
    }
  }
)
