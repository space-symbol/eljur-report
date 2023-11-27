import { StateSchema } from '@renderer/shared/config/StoreConfig/StateSchema'

export const getFetchDataFormData = (state: StateSchema) => state.fetchDataForm.response
export const getFetchDataFormIsLoading = (state: StateSchema) => state.fetchDataForm.isLoading
