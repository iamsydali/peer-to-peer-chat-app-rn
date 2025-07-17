import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  roomTopic: '',
  roomTopicInput: '',
  peersCount: 0,
  isConnected: false,
  isCreating: false,
  isJoining: false,
}

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoomTopic: (state, action) => {
      state.roomTopic = action.payload
      state.isConnected = !!action.payload
    },
    setRoomTopicInput: (state, action) => {
      state.roomTopicInput = action.payload
    },
    setPeersCount: (state, action) => {
      state.peersCount = action.payload
    },
    setIsCreating: (state, action) => {
      state.isCreating = action.payload
    },
    setIsJoining: (state, action) => {
      state.isJoining = action.payload
    },
    resetRoom: (state) => {
      state.roomTopic = ''
      state.roomTopicInput = ''
      state.peersCount = 0
      state.isConnected = false
      state.isCreating = false
      state.isJoining = false
    },
  },
})

export const {
  setRoomTopic,
  setRoomTopicInput,
  setPeersCount,
  setIsCreating,
  setIsJoining,
  resetRoom,
} = roomSlice.actions

// Selectors
export const selectRoomTopic = (state) => state.room.roomTopic
export const selectRoomTopicInput = (state) => state.room.roomTopicInput
export const selectPeersCount = (state) => state.room.peersCount
export const selectIsConnected = (state) => state.room.isConnected
export const selectIsCreating = (state) => state.room.isCreating
export const selectIsJoining = (state) => state.room.isJoining

export default roomSlice.reducer 