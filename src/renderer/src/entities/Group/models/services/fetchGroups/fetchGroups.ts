import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@renderer/shared/config/StoreConfig/StateSchema'

export const fetchGroups = createAsyncThunk<string[], void, ThunkConfig<string>>(
  'group/fetchGroups',
  async (_, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI
    try {
      const res = await extra.api.get('getrules')
      const groups = res.data.response.result.relations.groups
      const groupsList: string[] = ['Все']

      for (const group in groups) {
        groupsList.push(group)
      }
      return groupsList
    } catch (e) {
      return rejectWithValue(`Ошибка при отправке запроса: ${e}`)
    }
  }
)
