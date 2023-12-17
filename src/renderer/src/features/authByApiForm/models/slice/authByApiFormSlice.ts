import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthByApiSchema } from '../types/AuthByApiSchema'
import { authWithoutToken } from '../services/authWithoutToken'
import { authWithToken } from '../services/authWithToken'

const initialState: AuthByApiSchema = {
  login: '',
  password: '',
  devkey: '',
  authToken: '',
  error: '',
  isLoading: false,
  isRequiredFilled: false
}

const authByApiFormSlice = createSlice({
  name: 'authByApiFormSlice',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<string>) => {
      state.login = action.payload
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload
    },
    setDevkey: (state, action: PayloadAction<string>) => {
      state.devkey = action.payload
    },
    setApiToken: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload
    },
    setIsValid: (state, action) => {
      state.isRequiredFilled = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(authWithoutToken.pending, (state) => {
        state.isLoading = true
      })
      .addCase(authWithoutToken.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(authWithoutToken.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(authWithToken.pending, (state) => {
        state.isLoading = true
      })
      .addCase(authWithToken.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(authWithToken.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export const { actions: authByApiActions, reducer: authByApiReducer } = authByApiFormSlice
