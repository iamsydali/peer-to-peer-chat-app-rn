import b4a from 'b4a'
import { store } from '../store'
import { addMessage } from '../store/messageSlice'
import { setPeersCount } from '../store/roomSlice'

import {
  API_PING,
  API_REVERSE,
  API_CREATE_ROOM,
  API_JOIN_ROOM,
  API_SEND_MESSAGE,
  API_RECEIVE_MESSAGE,
  API_UPDATE_CONNECTIONS,
} from '../../worklet/api.mjs'

// RPCs receiver from worklet to UI - now with Redux integration
export const rpcHandler = async (req) => {
  console.log('from worklet:', req.command)
  
  switch(req.command) {
    case API_RECEIVE_MESSAGE:
      const data = JSON.parse(b4a.toString(req.data, 'utf8'))
      const message = JSON.parse(data?.event)
      const memberId = data?.memberId
      console.log('got message:', message)
      
      // Dispatch to Redux store using simplified action
      store.dispatch(addMessage({ message, local: false, memberId }))
      break
      
    case API_UPDATE_CONNECTIONS:
      const count = b4a.toString(req.data, 'utf8')
      console.log('current peer cnt:', count)
      
      // Add 1 to include the local user in the count
      store.dispatch(setPeersCount(parseInt(count) + 1))
      break
      
    default:
      break
  }
}

// RPCs call from UI to worklet - enhanced with Redux integration
export const getBackend = (rpc) => ({
  ping: (callback) => {
    if (!rpc || !callback) return
    const req = rpc.request(API_PING)
    req.send('Hello from RN UI!')
    req.reply('utf8').then((res) => callback(res))
  },
  reverse: (callback) => {
    if (!rpc || !callback) return
    const req = rpc.request(API_REVERSE)
    req.send('Reverse RN UI!')
    req.reply('utf8').then((res) => callback(res))
  },
  createRoom: (callback) => {
    if (!rpc || !callback) return
    const req = rpc.request(API_CREATE_ROOM)
    req.send('Create Room!')
    req.reply('utf8').then((res) => {
      const {done, topic} = JSON.parse(res)
      console.log(done ? `[info] Created new chat room: ${topic}`:`[info] Create fail`)
      callback(topic)
    })
  },
  joinRoom: (topic, callback) => {
    if (!rpc || !callback || !topic) return
    const req = rpc.request(API_JOIN_ROOM)
    req.send(topic)
    req.reply('utf8').then((res) => {
      const {done, topic} = JSON.parse(res)
      console.log(done ? `[info] Joined chat room`:`[info] Joined fail`)
      callback(topic)
    })
  },
  sendMessage: (message, callback) => {
    if (!rpc || !callback || !message) return
    const req = rpc.request(API_SEND_MESSAGE)
    req.send(message)
    req.reply('utf8').then((res) => callback(res, true))
  },
}) 