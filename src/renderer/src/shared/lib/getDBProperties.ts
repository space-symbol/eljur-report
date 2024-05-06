import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USER
} from '../const/localstorage'

export const getDBProperties = () => {
  return {
    database: localStorage.getItem(DATABASE_NAME) || '',
    host: localStorage.getItem(DATABASE_HOST) || '',
    user: localStorage.getItem(DATABASE_USER) || '',
    password: localStorage.getItem(DATABASE_PASSWORD) || '',
    port: Number(localStorage.getItem(DATABASE_PORT)) || 3306,
  }
}
