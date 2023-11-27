import { StateSchema } from '@renderer/shared/config/StoreConfig/StateSchema'

export const getFromDate = (state: StateSchema) => state.dateInterval.fromDate
export const getToDate = (state: StateSchema) => state.dateInterval.toDate
