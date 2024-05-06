import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USER
} from '../const/localstorage'

export const setDBPropsToLocalStorage = (dbProps: DatabaseProperties) => {
  localStorage.setItem(DATABASE_NAME, dbProps.database),
    localStorage.setItem(DATABASE_USER, dbProps.user),
    localStorage.setItem(DATABASE_PASSWORD, dbProps.password),
    localStorage.setItem(DATABASE_HOST, dbProps.host),
    localStorage.setItem(DATABASE_PORT, dbProps.port.toString())
}
