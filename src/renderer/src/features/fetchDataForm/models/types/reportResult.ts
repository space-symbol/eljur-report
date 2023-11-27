export type ReportResult = Group[]
export type Group = Record<string, Day[]>
export type Day = Record<string, DayInfo>

export interface DayInfo {
  name: string
  title: string
  items: string
  items_extday: string
}
