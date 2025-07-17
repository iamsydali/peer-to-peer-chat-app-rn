import React from 'react'
import { View, StyleSheet } from 'react-native'
import MessageList from './MessageList'
import ChatInput from './ChatInput'

const ChatContainer = ({ onExit }) => {
  return (
    <View style={styles.chatContainer}>
      <View style={styles.messageListContainer}>
        <MessageList onExit={onExit} />
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