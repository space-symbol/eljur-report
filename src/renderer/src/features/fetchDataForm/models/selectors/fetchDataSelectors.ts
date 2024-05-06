import { StateSchema } from '@renderer/shared/config/StoreConfig/StateSchema'

export const getFetchDataFormData = (state: StateSchema) => state.fetchDataForm.response
export const getFetchDataFormIsFetching = (state: StateSchema) => state.fetchDataForm.isFetching
export const getFetchDataFormPercentage = (state: StateSchema) => state.fetchDataForm.percentage
export const getFetchDataFormCanceled = (state: StateSchema) => state.fetchDataForm.canceled
export const getFetchDataFormSaveInto = (state: StateSchema) => state.fetchDataForm.saveInto
export const getFetchDataFormDone = (state: StateSchema) => state.fetchDataForm.done
export const getFetchDataFormDatabaseProperties = (state: StateSchema) =>
  state.fetchDataForm.databaseProperties
