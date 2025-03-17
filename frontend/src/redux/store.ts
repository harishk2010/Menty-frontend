'use client';

import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import { combineReducers } from 'redux';
import userReducer from './slices/userSlice';
import instructorReducer from './slices/instructorSlice';
import adminReducer from './slices/adminSlice'

// Configure persistence
const userPersistConfig = {
  key: 'user',
  storage,
};
// Configure persistence
const instructorPersistConfig = {
  key: 'instructor',
  storage,
};
const adminPersistConfig = {
  key: 'admin',
  storage,
};

// Combine reducers (for scalability)
const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  instructor: persistReducer(instructorPersistConfig, instructorReducer),
  admin: persistReducer(adminPersistConfig, adminReducer),
});

// Wrap reducers with persistReducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist to work properly
    }),
});

// Types for store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;