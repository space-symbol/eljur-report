import axios from 'axios'
import { API_TOKEN } from '@renderer/shared/const/localstorage'

export const $api = axios.create({
  baseURL: __API__,
  params: {
    devkey: import.meta.env.RENDERER_VITE_API_DEV_KEY,
    vendor: 'kmpo'
  },
})
$api.interceptors.request.use(
  async function (config) {
    let auth_token = localStorage.getItem(API_TOKEN)
    if (!auth_token) {
      auth_token = import.meta.env?.RENDERER_VITE_API_AUTH_KEY
      localStorage.setItem(API_TOKEN, auth_token || '')

      // try {
      // 	const res = await $api.get('/auth', {
      // 		params: {
      // 			...authConfig
      // 		}
      // 	})
      // 	token = res.data.response.result.auth_token;
      //
      // } catch (e) {
      // 	return Promise.reject(e);
      // }
    }
    config.params.auth_token = auth_token
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
