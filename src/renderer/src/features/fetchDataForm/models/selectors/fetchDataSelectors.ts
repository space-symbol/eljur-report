import { StateSchema } from '@renderer/shared/config/StoreConfig/StateSchema'

export const getFetchDataFormData = (state: StateSchema) => state.fetchDataForm.response
export const getFetchDataFormIsLoading = (state: StateSchema) => state.fetchDataForm.isLoading
export const getFetchDataFormPercentage = (state: StateSchema) => state.fetchDataForm.percentage
export const getFetchDataFormCanceled = (state: StateSchema) => state.fetchDataForm.canceled
