import { configureStore, combineReducers } from '@reduxjs/toolkit'

import microphoneReducer from './microphone/microphoneSlice';
import recordingReducer from './recording/recordingSlice';
import transcriptionReducer from './transcription/transcriptionSlice';
import resultReducer from './result/resultSlice';

// Persistance Code
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'
  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['result', 'transcription'],
  }
  

  const rootReducer = combineReducers({
        microphone: microphoneReducer,
        recording: recordingReducer,
        transcription: transcriptionReducer,
        result: resultReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })
  
  export let persistor = persistStore(store)