import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer, userReducer, themeReducer } from '.';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  theme: themeReducer,
});

const persistConfig = {
  key: 'diskettte-exclusive',
  storage: storage,
  whitelist: ['auth', 'user', 'theme'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // persist 에러 방지
    }),
});

const persistor = persistStore(store);

export { store, persistor };
export type RootState = ReturnType<typeof store.getState>;
