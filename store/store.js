import { configureStore } from '@reduxjs/toolkit'
import ConversationReducer from './conversationSlice'

export const store = configureStore({
  reducer: {
    conversation: ConversationReducer,
  },
})

