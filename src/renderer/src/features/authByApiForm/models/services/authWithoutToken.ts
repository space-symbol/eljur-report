import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@renderer/shared/config/StoreConfig/StateSchema'
import { API_USER_DATA_KEY } from '@renderer/shared/const/localstorage'
import { encryptString } from '@renderer/shared/lib/crypto/crypto'
import { userActions } from '@renderer/entities/User'
import { User } from '@renderer/entities/User/models/types/UserSchema'
import { authByApiActions } from '../slice/authByApiFormSlice'
import { AxiosError } from 'axios'

interface AuthWithoutTokenProps {
  login: string
  password: string
  devkey: string
}

export const authWithoutToken = createAsyncThunk<
  string,
  AuthWithoutTokenProps,
  ThunkConfig<string>
>('authByApiForm/authWithoutToken', async (args, thunkAPI) => {
  const { extra, rejectWithValue, fulfillWithValue, dispatch } = thunkAPI
  const { login, password, devkey } = args

  try {
    const result = await extra.api.get('/auth', {
      params: {
        login,
        password,
        devkey
      }
    })
    const authToken = result.data.response.result.token
    const authData: User = {
      login,
      password,
      devkey,
      authToken
    }
    const encryptedAuthData = encryptString(JSON.stringify(authData), API_USER_DATA_KEY)
    localStorage.setItem(API_USER_DATA_KEY, encryptedAuthData)
    dispatch(userActions.setAuthData(authData))
    return fulfillWithValue(authToken)
  } catch (err) {
    if (err instanceof AxiosError) {
      const error = `Произошла ошибка при авторизации: '${err.response!.data.response.error}'`
      dispatch(authByApiActions.setError(error))
      return rejectWithValue(error)
    }
    return rejectWithValue(`${err}`)
  }
})
