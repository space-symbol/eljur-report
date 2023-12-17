import { StateSchema } from '@renderer/shared/config/StoreConfig/StateSchema'

export const getUserAuthData = (state: StateSchema) => state.user.authData
export const getUserInited = (state: StateSchema) => state.user._inited
