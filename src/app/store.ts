import { combineReducers, configureStore } from "@reduxjs/toolkit"
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist"
import storage from "redux-persist/es/storage"
import authReducer from "../features/auth/authSlice"
import { historySlice } from "../features/history/historySlice"
import itemsReducer from "../features/history/itemsSlice"

const persistConfig = {
  key: "root",
  version: 1,
  whitelist: ["auth"],
  storage,
}

const rootReducer = combineReducers({
  auth: authReducer,
  items: itemsReducer,
  [historySlice.reducerPath]: historySlice.reducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(historySlice.middleware),
})

export const persistor = persistStore(store)

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
