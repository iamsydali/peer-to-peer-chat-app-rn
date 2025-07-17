import { useSelector, useDispatch } from 'react-redux'
import {
  selectMessages,
  selectAllMessages,
  selectHasMoreMessages,
  selectIsLoading,
  selectIsLoadingMore,
  selectError,
  selectMessageCount,
  addMessage,
  loadMoreMessages,
  initializeMessages,
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
  const allMessages = useSelector(selectAllMessages)
  const hasMoreMessages = useSelector(selectHasMoreMessages)
  const isLoading = useSelector(selectIsLoading)
  const isLoadingMore = useSelector(selectIsLoadingMore)
  const error = useSelector(selectError)
  const messageCount = useSelector(selectMessageCount)
  const dispatch = useDispatch()

  const addNewMessage = (message, isLocal = true, memberId = null) => {
    dispatch(addMessage({ message, local: isLocal, memberId }))
  }

  const loadMore = () => {
    dispatch(loadMoreMessages())
  }

  const initialize = () => {
    dispatch(initializeMessages())
  }

  const clearAllMessages = () => {
    dispatch(clearMessages())
  }

  return {
    messages,
    allMessages,
    hasMoreMessages,
    isLoading,
    isLoadingMore,
    error,
    messageCount,
    addMessage: addNewMessage,
    loadMoreMessages: loadMore,
    initializeMessages: initialize,
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