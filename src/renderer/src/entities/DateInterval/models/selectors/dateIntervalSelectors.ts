import { StateSchema } from '@renderer/shared/config/StoreConfig/StateSchema'

export const getDateIntervalFromDateValue = (state: StateSchema) => state.dateInterval.fromDateValue
export const getDateIntervalToDateValue = (state: StateSchema) => state.dateInterval.toDateValue
export const getDateIntervalIsValid = (state: StateSchema) => state.dateInterval.isValid
export const getDateIntervalError = (state: StateSchema) => state.dateInterval.error
