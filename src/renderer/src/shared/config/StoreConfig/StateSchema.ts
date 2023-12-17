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
import { AuthByApiSchema } from '@renderer/features/authByApiForm/models/types/AuthByApiSchema'
import { UserSchema } from '@renderer/entities/User/models/types/UserSchema'

export interface StateSchema {
  user: UserSchema
  group: GroupSchema
  fetchDataForm: FetchDataFormSchema
  dateInterval: DateIntervalSchema

  authForm?: AuthByApiSchema
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
