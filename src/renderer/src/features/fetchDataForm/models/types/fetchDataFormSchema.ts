import { ReportResult } from './reportResult'

export interface FetchDataFormSchema {
  response: ReportResult
  isLoading: boolean
  percentage: number
  canceled: boolean
}
