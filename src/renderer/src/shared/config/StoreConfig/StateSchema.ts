import { AxiosInstance } from 'axios'
import { NavigateOptions, To } from 'react-router-dom'
import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject
} from '@reduxjs/toolkit'
import { FetchDataFormSchema } from '@renderer/features/fetchDataForm'
import { GroupSchema } from '@renderer/entities/Group'
import { DateIntervalSchema } from '@renderer/entities/DateInterval'

export interface StateSchema {
  group: GroupSchema
  dateInterval: DateIntervalSchema
  fetchDataForm: FetchDataFormSchema
}

export type StateSchemaKey = keyof StateSchema

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
  add: (key: StateSchemaKey, reducer: Reducer) => void
  remove: (key: StateSchemaKey) => void
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager
}

export interface ThunkExtraArg {
  api: AxiosInstance
  navigate?: (to: To, options?: NavigateOptions) => void
}

export interface ThunkConfig<T> {
  rejectValue: T
  extra: ThunkExtraArg
  state: StateSchema
}
