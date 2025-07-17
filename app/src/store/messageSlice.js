import { createSlice } from '@reduxjs/toolkit'
import { createMessage } from '../../worklet/api.mjs'

const initialState = {
  messages: [],
  isLoading: false,
  error: null,
}

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const { message, local = false, memberId } = action.payload
      const newMessage = createMessage(message, local)
      if (memberId) {
        newMessage.memberId = memberId
      }
      state.messages.push(newMessage)
    },
    addLocalMessage: (state, action) => {
      const { message } = action.payload
      const newMessage = createMessage(message, true)
      state.messages.push(newMessage)
    },
    addRemoteMessage: (state, action) => {
      const { message, memberId } = action.payload
      const newMessage = { ...message, local: false, memberId }
      state.messages.push(newMessage)
    },
    clearMessages: (state) => {
      state.messages = []
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const {
  addMessage,
  addLocalMessage,
  addRemoteMessage,
  clearMessages,
  setLoading,
  setError,
} = messageSlice.actions

// Selectors
export const selectMessages = (state) => state.messages.messages
export const selectIsLoading = (state) => state.messages.isLoading
export const selectError = (state) => state.messages.error

export default messageSlice.reducer 