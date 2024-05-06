import { ReportResult } from './reportResult'
export interface DatabaseProperties {
  database: string
  user: string
  password: string
  host: string
  port: number
}

export enum SaveInto {
  json = 'json',
  mysql = 'mysql'
}

export interface FetchDataFormSchema {
  response: ReportResult
  isFetching: boolean
  percentage: number
  canceled: boolean
  saveInto: SaveInto
  databaseProperties: DatabaseProperties
  done: boolean
}
