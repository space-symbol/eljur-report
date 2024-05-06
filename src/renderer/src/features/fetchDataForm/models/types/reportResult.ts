export type Group = Record<string, Day[]>
export type Day = Record<string, DayInfo>
export type ReportResult = Group[]
interface Lesson {
  name: string
  num: string
  room: string
  teacher: string
  sort: string
  teacher_id: number
}
export interface DayInfo {
  name: string
  title: string
  items: Lesson[]
  items_extday?: string
  alert?: string
}
