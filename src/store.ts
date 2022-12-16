import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { penguinApi } from 'apis/penguin'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PersistConfig,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import authSlice from 'stores/authSlice'

const rootReducer = combineReducers({
  auth: authSlice,
  [penguinApi.reducerPath]: penguinApi.reducer,
})
export type RootReducer = ReturnType<typeof rootReducer>

const persistConfig: PersistConfig<any> = {
  key: 'penguin-dashboard',
  storage,
  blacklist: [penguinApi.reducerPath],
}

const persistedReducer = persistReducer<RootReducer>(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(penguinApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
