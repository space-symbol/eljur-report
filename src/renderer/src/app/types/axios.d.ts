import { AxiosRequestConfig as Config } from 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig extends Config {
    _retry?: boolean
  }
}
