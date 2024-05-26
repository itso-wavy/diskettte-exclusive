import { configureStore } from '@reduxjs/toolkit';
import { themeReducer } from '.';

const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

export { store };
export type RootState = ReturnType<typeof store.getState>;

// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import { themeReducer } from '.';

// const rootReducer = combineReducers({
//   // auth: authReducer,
//   // user: userReducer,
//   theme: themeReducer,
// });

// const persistConfig = {
//   key: 'root',
//   storage: storage,
//   whitelist: ['theme'],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: false, // persist 에러 방지
//     }),
// });

// const persistor = persistStore(store);

// export { store, persistor };
// export type RootState = ReturnType<typeof rootReducer>;
