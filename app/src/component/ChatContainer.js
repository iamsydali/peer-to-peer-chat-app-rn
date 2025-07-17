import React from 'react'
import { View, StyleSheet } from 'react-native'
import MessageList from './MessageList'
import ChatInput from './ChatInput'

const ChatContainer = ({
  messages,
  roomTopic,
  peersCount,
  inputText,
  setInputText,
  handleSend,
  onExit,
}) => {
  return (
    <View style={styles.chatContainer}>
      <View style={styles.messageListContainer}>
        <MessageList
          messages={messages}
          roomTopic={roomTopic}
          peersCount={peersCount}
          onExit={onExit}
        />
      </View>
      <ChatInput
        inputText={inputText}
        setInputText={setInputText}
        handleSend={handleSend}
      />
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