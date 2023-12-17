import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserSchema, User } from '../types/UserSchema'
import { API_USER_DATA_KEY } from '@renderer/shared/const/localstorage'
import { decryptString } from '@renderer/shared/lib/crypto/crypto'

const initialState: UserSchema = {
  _inited: false
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload
    },
    initAuthData: (state) => {
      const user = localStorage.getItem(API_USER_DATA_KEY)
      if (user) {
        const decryptedAuthData = decryptString(user, API_USER_DATA_KEY)
        state.authData = JSON.parse(decryptedAuthData)
      }
      state._inited = true
    },
    logout: (state) => {
      state.authData = undefined
      localStorage.removeItem(API_USER_DATA_KEY)
    }
  }
})

export const { actions: userActions, reducer: userReducer } = userSlice
