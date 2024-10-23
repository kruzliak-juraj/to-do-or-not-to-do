import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { tasksErrorSlice } from "../features/to-do-list/tasksErrorSlice"
import { tasksApiSlice } from "../features/to-do-list/tasksApiSlice"

const rootReducer = combineSlices(tasksApiSlice, tasksErrorSlice)

export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,

    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat(tasksApiSlice.middleware)
    },
    preloadedState,
  })

  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()

export type AppStore = typeof store

export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
