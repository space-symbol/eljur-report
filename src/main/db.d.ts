interface DatabaseProperties {
  database: string
  user: string
  password: string
  host: string
  port: number
  tableName?: string
}

type Group = Record<string, Day[]>
type Day = Record<string, DayInfo>
type ReportResult = Group[]
interface Lesson {
  name: string
  num: string
  room: string
  teacher: string
  sort: string
  teacher_id: number
}
interface DayInfo {
  name: string
  title: string
  items: Lesson[]
  items_extday?: string
  alert?: string
}
