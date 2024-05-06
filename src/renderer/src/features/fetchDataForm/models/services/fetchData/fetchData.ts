import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@renderer/shared/config/StoreConfig/StateSchema'
import { Group, ReportResult } from '../../types/reportResult'
import { fetchDataFormActions } from '../../slice/fetchDataFormSlice'

interface FetchDataProps {
  selectedGroups: string[]
  groupsList: string[]
  fromDateValue: string
  toDateValue: string
}

export const fetchData = createAsyncThunk<ReportResult, FetchDataProps, ThunkConfig<string>>(
  'fetchDataForm/fetchData',
  async (fetchData, thunkAPI) => {
    const { extra, rejectWithValue, dispatch, getState } = thunkAPI
    const { selectedGroups, fromDateValue, toDateValue, groupsList } = fetchData
    const regexp = RegExp('-', 'g')
    const formattedFromDateValue = fromDateValue.replace(regexp, '')
    const formattedToDateValue = toDateValue.replace(regexp, '')
    const dateInterval = `${formattedFromDateValue}-${formattedToDateValue}`
    const groups = selectedGroups[0] === 'Все' ? groupsList.slice(1) : selectedGroups
    const result: ReportResult = []

    for (const group of groups) {
      try {
        const res = await extra.api.get('getschedule', {
          params: {
            class: group,
            days: dateInterval
          }
        })
        const daysStringList = res.data.response.result.days
        const outputData: Group = {
          [group]: []
        }

        for (const dateString in daysStringList) {
          const formattedDate = dateString.replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3')
          outputData[group].push({ [formattedDate]: daysStringList[dateString] })
        }
        result.push(outputData)
        const percentage = Math.round((result.length / groups.length) * 100)
        dispatch(fetchDataFormActions.setPercentage(percentage))

        await new Promise((resolve) => setTimeout(resolve, 1000)) // Ждём 1 секунду перед следующим запросом
      } catch (error) {
        console.log(error)
        return rejectWithValue(`Произошла ошибка при получении данных о группе ${group}: ${error}`)
      }
      const state = getState()
      if (state.fetchDataForm.canceled) {
        break
      }
    }
    dispatch(fetchDataFormActions.setCanceled(false))
    return result
  }
)
