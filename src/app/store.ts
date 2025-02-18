import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/es/storage';
import loadingReducer from '@/components/loading/loadingSlice';
import notificationReducer from '@/components/notification/notificationSlice';
import authReducer from '@/features/auth/authSlice';
import itemReducer from '@/features/history/api/itemSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  whitelist: ['auth'],
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  item: itemReducer,
  loading: loadingReducer,
  notification: notificationReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
