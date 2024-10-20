import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import chatSlice from './chat-reducer'

const persistConfig = {
  key: 'chat',
  storage,
  version: 1,
  blacklist: ['register'],
}

const rootReducer = combineReducers({
  chat: chatSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: {
    chat: persistedReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST'], // Ignore redux-persist actions
      ignoredPaths: ['register'], // Ignore the path that contains non-serializable values
    },
  }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
