import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@renderer/shared/config/StoreConfig/StateSchema'
import { Group, ReportResult } from '../types/reportResult'
import { SaveDialogOptions } from 'electron'

interface FetchDataProps {
  selectedGroups: string[]
  dateInterval: string
  groupsList: string[]
}

export const fetchData = createAsyncThunk<ReportResult, FetchDataProps, ThunkConfig<string>>(
  'fetchDataForm/fetchData',
  async (fetchData, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI
    const { selectedGroups, dateInterval, groupsList } = fetchData

    const groups = selectedGroups[0] === 'Все' ? groupsList : selectedGroups
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
        console.log(JSON.stringify(res.data.response, null, 2))
        const outputData: Group = {
          [group]: []
        }

        for (const dateString in daysStringList) {
          const formattedDate = dateString.replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3')
          outputData[group].push({ [formattedDate]: daysStringList[dateString] })
        }
        result.push(outputData)
        console.log(`Данные группы ${group} получены`)
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Ждём 1 секунду перед следующим запросом
      } catch (error) {
        console.log(error)
        return rejectWithValue(`Произошла ошибка при получении данных о группе ${group}: ${error}`)
      }
    }

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
      const filePath = window.api.showSaveDialog(content, options)
      console.log(filePath)
    } catch (err) {
      console.log(err)
      return rejectWithValue(`При записи данных в файл возникла ошибка: ${err}`)
    }

    return result
  }
)
