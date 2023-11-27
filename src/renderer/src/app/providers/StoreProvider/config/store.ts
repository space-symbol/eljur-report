import { $api } from '@renderer/shared/api/api'
import { StateSchema, ThunkExtraArg } from '@renderer/shared/config/StoreConfig/StateSchema'
import { CombinedState, configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { createReducerManager } from './reducerManager'
import { groupReducer } from '@renderer/entities/Group'
import { fetchDataFormReducer } from '@renderer/features/fetchDataForm'
import { dateIntervalReducer } from '@renderer/entities/DateInterval'

export const createReduxStore = () => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    group: groupReducer,
    dateInterval: dateIntervalReducer,
    fetchDataForm: fetchDataFormReducer
  }
  const reducerManager = createReducerManager(rootReducers)

  const extraArgs: ThunkExtraArg = {
    api: $api
  }

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: process.env.NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArgs
        }
      })
  })

  // @ts-ignore
  store.reducerManager = reducerManager
  return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
