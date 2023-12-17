import { $api } from '@renderer/shared/api/api'
import { StateSchema, ThunkExtraArg } from '@renderer/shared/config/StoreConfig/StateSchema'
import { CombinedState, configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { createReducerManager } from './reducerManager'
import { groupReducer } from '@renderer/entities/Group'
import { fetchDataFormReducer } from '@renderer/features/fetchDataForm'
import { dateIntervalReducer } from '@renderer/entities/DateInterval/models/slice/dateIntervalSlice'
import { userReducer } from '@renderer/entities/User'

export const createReduxStore = (
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>
) => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    user: userReducer,
    group: groupReducer,
    fetchDataForm: fetchDataFormReducer,
    dateInterval: dateIntervalReducer
  }
  const reducerManager = createReducerManager(rootReducers)

  const extraArgs: ThunkExtraArg = {
    api: $api
  }

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: process.env.NODE_ENV === 'development',
    preloadedState: initialState,
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
