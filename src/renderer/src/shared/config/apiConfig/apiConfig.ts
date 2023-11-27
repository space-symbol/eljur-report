export enum OutFormat {
  JSON = 'json',
  XML = 'xml'
}
export interface ApiParams {
  vendor: string
  out_format: OutFormat
  devkey: string
  token: string
}

export interface AuthParams {
  login: string
  password: string
}

export const authConfig: AuthParams = {
  login: import.meta.env.VITE_API_LOGIN,
  password: import.meta.env.VITE_API_PASSWORD
}
