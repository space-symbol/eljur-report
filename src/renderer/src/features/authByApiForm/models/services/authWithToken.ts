import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@renderer/shared/config/StoreConfig/StateSchema'
import { API_USER_DATA_KEY } from '@renderer/shared/const/localstorage'
import { encryptString } from '@renderer/shared/lib/crypto/crypto'
import { userActions } from '@renderer/entities/User'
import { User } from '@renderer/entities/User/models/types/UserSchema'
import { authByApiActions } from '../slice/authByApiFormSlice'
import { AxiosError } from 'axios'

interface AuthByApiWithAuthTokenProps {
  login: string
  password: string
  devkey: string
  authToken: string
}

export const authWithToken = createAsyncThunk<
  User,
  AuthByApiWithAuthTokenProps,
  ThunkConfig<string>
>('authByApiForm/authWithToken', async (args, thunkAPI) => {
  const { extra, rejectWithValue, fulfillWithValue, dispatch } = thunkAPI
  const { login, password, devkey, authToken } = args

  try {
    await extra.api.get('/getrules', {
      params: {
        devkey,
        auth_token: authToken
      }
    })

    const authData: User = {
      login,
      password,
      devkey,
      authToken
    }
    console.log(authToken)
    const encryptedAuthData = encryptString(JSON.stringify(authData), API_USER_DATA_KEY)
    localStorage.setItem(API_USER_DATA_KEY, encryptedAuthData)
    dispatch(userActions.setAuthData(authData))
    return fulfillWithValue(authData)
  } catch (err) {
    if (err instanceof AxiosError) {
      const error = `Произошла ошибка при авторизации: "${err.response!.data.response.error}"`
      dispatch(authByApiActions.setError(error))
      return rejectWithValue(error)
    }
    return rejectWithValue(`${err}`)
  }
})
