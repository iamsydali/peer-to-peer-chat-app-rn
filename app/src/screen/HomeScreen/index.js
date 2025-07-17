import { useState, useCallback, useEffect } from'react'
import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import { useBackend } from '../../component/BareProvider'
import { useMessages, useRoom } from '../../hook/useRedux'
import { getBackend } from '../../lib/rpcRedux'

export const HomeScreen = () => {
  const backend = useBackend()
  const [inputText, setInputText] = useState('')
  
  // Redux state
  const { messages, addMessage } = useMessages()
  const {
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
  } = useRoom()

  const handleTopic = useCallback(topic => {
    updateRoomTopic(topic)
  }, [updateRoomTopic])

  const handleCreate = useCallback(() => {
    if (!backend) return
    setCreating(true)
    backend.createRoom((topic) => {
      handleTopic(topic)
      setCreating(false)
    })
  }, [backend, handleTopic, setCreating])

  const handleJoin = useCallback(() => {
    if (!backend) return
    console.log('join room with topic:', roomTopicInput)
    const topic = roomTopicInput.replace('Topic: ', '')
    setJoining(true)
    backend.joinRoom(topic, (joinedTopic) => {
      handleTopic(joinedTopic)
      setJoining(false)
    })
  }, [backend, roomTopicInput, handleTopic, setJoining])

  const handleSend = () => {
    if (inputText.trim() && backend) {
      backend.sendMessage(inputText, (response, isLocal) => {
        if (isLocal) {
          addMessage(inputText)
        }
      })
      setInputText('')
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
      {isConnected ? (
      <>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            <View style={styles.messageList}>
              <Text selectable>Topic: {roomTopic}</Text>
              <Text>Peers: {peersCount}</Text>
              {messages && messages.map((event, idx) => (
                <View key={idx} style={event.local ? [styles.message, styles.myMessage] : styles.message}>
                  <Text style={styles.member}>{event?.memberId ?? 'You'}</Text>
                  <Text selectable>{event.message}</Text>
                </View>)
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.msgInput}
            placeholder="Say something"
            value={inputText}
            onChangeText={setInputText} />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend} >
            <MaterialIcons name="send" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </>
      ) : (
      <View style={styles.innerContainer}>
        <View style={styles.info}>
          <Text>Open up src/screen/HomeScreen.js to start working on your app!</Text>
          <Text>FYR lib/rpc and worklet/app.cjs has related backend code.</Text>
        </View>
        <TouchableOpacity 
          style={[styles.message, styles.sendButton, isCreating && styles.buttonDisabled]} 
          onPress={handleCreate}
          disabled={isCreating}
        >
          <Text>{isCreating ? 'Creating...' : 'Create Room'}</Text>
        </TouchableOpacity>
        <Text>
          Or
        </Text>
        <View style={styles.buttonGroup}>
          <TextInput 
            value={roomTopicInput} 
            onChangeText={updateRoomTopicInput} 
            style={styles.textInput} 
            placeholder="Enter room topic"
          />
          <TouchableOpacity 
            style={[styles.message, styles.sendButton, isJoining && styles.buttonDisabled]} 
            onPress={handleJoin}
            disabled={isJoining}
          >
            <Text>{isJoining ? 'Joining...' : 'Join Room'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )}
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    padding: 10,
  },
  messageList: {
    paddingVertical: 10,
  },
  message: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#AAA',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  msgInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: '#f9f9f9',
  },
  sendButton: {
    backgroundColor: '#0aa',
    padding: 10,
    borderRadius: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    width: '100%',
    gap: 8
  },
  textInput: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    flex: 1
  },
  buttonDisabled: {
    backgroundColor: 'grey',
  },
  info: {
    backgroundColor: '#EEE',
    padding: 10,
    borderRadius: 5,
    gap: 8,
  },
})

export default HomeScreen
