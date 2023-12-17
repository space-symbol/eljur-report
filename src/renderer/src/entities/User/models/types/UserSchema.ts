export interface User {
  login: string
  password: string
  devkey: string
  authToken: string
}

export interface UserSchema {
  authData?: User
  _inited: boolean
}
