import { useSelector, useDispatch } from 'react-redux'
import {
  selectMessages,
  selectIsLoading,
  selectError,
  addLocalMessage,
  clearMessages,
} from '../store/messageSlice'
import {
  selectRoomTopic,
  selectRoomTopicInput,
  selectPeersCount,
  selectIsConnected,
  selectIsCreating,
  selectIsJoining,
  setRoomTopic,
  setRoomTopicInput,
  setIsCreating,
  setIsJoining,
  resetRoom,
} from '../store/roomSlice'

// Message hooks
export const useMessages = () => {
  const messages = useSelector(selectMessages)
  const isLoading = useSelector(selectIsLoading)
  const error = useSelector(selectError)
  const dispatch = useDispatch()

  const addMessage = (message) => {
    dispatch(addLocalMessage({ message }))
  }

  const clearAllMessages = () => {
    dispatch(clearMessages())
  }

  return {
    messages,
    isLoading,
    error,
    addMessage,
    clearAllMessages,
  }
}

// Room hooks
export const useRoom = () => {
  const roomTopic = useSelector(selectRoomTopic)
  const roomTopicInput = useSelector(selectRoomTopicInput)
  const peersCount = useSelector(selectPeersCount)
  const isConnected = useSelector(selectIsConnected)
  const isCreating = useSelector(selectIsCreating)
  const isJoining = useSelector(selectIsJoining)
  const dispatch = useDispatch()

  const updateRoomTopic = (topic) => {
    dispatch(setRoomTopic(topic))
  }

  const updateRoomTopicInput = (input) => {
    dispatch(setRoomTopicInput(input))
  }

  const setCreating = (creating) => {
    dispatch(setIsCreating(creating))
  }

  const setJoining = (joining) => {
    dispatch(setIsJoining(joining))
  }

  const resetRoomState = () => {
    dispatch(resetRoom())
  }

  return {
    roomTopic,
    roomTopicInput,
    peersCount,
    isConnected,
    isCreating,
    isJoining,
    updateRoomTopic,
    updateRoomTopicInput,
    setCreating,
    setJoining,
    resetRoomState,
  }
} 