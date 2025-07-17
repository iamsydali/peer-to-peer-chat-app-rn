import { addRemoteMessage } from './messageSlice'
import { setPeersCount } from './roomSlice'
import { CONNECTIONS_UI, RECEIVE_MESSAGE_UI } from '../lib/uiEvent'

// Redux middleware to handle RPC events
export const rpcMiddleware = (store) => (next) => (action) => {
  const result = next(action)
  
  // Handle any side effects here if needed
  return result
}

// Event handlers that dispatch Redux actions
export const setupRpcEventHandlers = (dispatch) => {
  // This will be called from the updated rpcHandler
  return {
    handleReceiveMessage: ({ memberId, message }) => {
      dispatch(addRemoteMessage({ message, memberId }))
    },
    handleConnectionsUpdate: (count) => {
      dispatch(setPeersCount(parseInt(count)))
    },
  }
} 