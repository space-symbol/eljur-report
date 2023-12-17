import { StateSchema } from '@renderer/shared/config/StoreConfig/StateSchema'

export const getAuthByApiFormLogin = (state: StateSchema) => state?.authForm?.login || ''
export const getAuthByApiFormPassword = (state: StateSchema) => state?.authForm?.password || ''
export const getAuthByApiFormDevkey = (state: StateSchema) => state?.authForm?.devkey || ''
export const getAuthByApiFormAuthToken = (state: StateSchema) => state?.authForm?.authToken || ''
export const getAuthByApiFormIsValid = (state: StateSchema) =>
  state?.authForm?.isRequiredFilled || false
export const getAuthByApiFormError = (state: StateSchema) => state?.authForm?.error || ''
