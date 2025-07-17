import React from 'react'
import { View, StyleSheet } from 'react-native'
import MessageList from './MessageList'
import ChatInput from './ChatInput'
import ChatHeader from './ChatHeader'

const ChatContainer = ({ onExit }) => {
  return (
    <View style={styles.chatContainer}>
      <ChatHeader onExit={onExit} />
      <View style={styles.messageListContainer}>
        <MessageList />
      </View>
      <ChatInput />
    </View>
  )
}

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
  },
  messageListContainer: {
    flex: 1,
  },
})

export default ChatContainer 