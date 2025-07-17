import { configureStore } from '@reduxjs/toolkit'
import messageReducer from './messageSlice'
import roomReducer from './roomSlice'

export const store = configureStore({
  reducer: {
    messages: messageReducer,
    room: roomReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['messages/addMessage'],
        ignoredPaths: ['messages.messages.timestamp'],
      },
    }),
}) 