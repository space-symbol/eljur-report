import axios, { AxiosError } from 'axios'
import { API_USER_DATA_KEY } from '@renderer/shared/const/localstorage'
import { decryptString } from '@renderer/shared/lib/crypto/crypto'
import { User } from '@renderer/entities/User/models/types/UserSchema'

export const $api = axios.create({
  baseURL: __API__,
  params: {
    vendor: import.meta.env.RENDERER_VITE_API_VENDOR,
    out_format: import.meta.env.RENDERER_VITE_API_OUT_FORMAT
  }
})

$api.interceptors.request.use(
  (config) => {
    const encryptedAuthData = localStorage.getItem(API_USER_DATA_KEY)
    if (!encryptedAuthData) {
      return config
    }
    const decryptedAuthData: User = JSON.parse(decryptString(encryptedAuthData, API_USER_DATA_KEY))
    config.params = {
      ...config.params,
      devkey: decryptedAuthData.devkey,
      auth_token: decryptedAuthData.authToken
    }
    return config
  },
  (error: AxiosError) => {
    if (error.status === 403) {
    }
  }
)
