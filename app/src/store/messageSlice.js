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
      let newMessage
      
      if (typeof message === 'string') {
        // Handle plain text messages (usually local messages)
        newMessage = createMessage(message, local)
      } else {
        // Handle remote messages that come with additional metadata
        newMessage = { ...message, local }
      }
      
      if (memberId) {
        newMessage.memberId = memberId
      }
      
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
  clearMessages,
  setLoading,
  setError,
} = messageSlice.actions

// Selectors
export const selectMessages = (state) => state.messages.messages
export const selectIsLoading = (state) => state.messages.isLoading
export const selectError = (state) => state.messages.error

export default messageSlice.reducer 