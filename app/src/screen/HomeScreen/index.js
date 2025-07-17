import { useCallback } from 'react'
import { StyleSheet, Platform, SafeAreaView, KeyboardAvoidingView, Keyboard } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useBackend } from '../../component/BareProvider'
import { useMessages, useRoom } from '../../hook/useRedux'
import WelcomeScreen from '../../component/WelcomeScreen'
import ChatContainer from '../../component/ChatContainer'
import { colors } from '../../theme'

export const HomeScreen = () => {
  const backend = useBackend()
  const { clearAllMessages } = useMessages()
  
  const {
    roomTopicInput,
    isConnected,
    isCreating,
    isJoining,
    updateRoomTopic,
    updateRoomTopicInput,
    setCreating,
    setJoining,
    resetRoomState,
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
    Keyboard.dismiss()
  }, [backend, roomTopicInput, handleTopic, setJoining])

  const handleExit = useCallback(() => {
    resetRoomState()
    clearAllMessages()
  }, [resetRoomState, clearAllMessages])

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {isConnected ? (
          <ChatContainer onExit={handleExit} />
        ) : (
          <WelcomeScreen
            isCreating={isCreating}
            isJoining={isJoining}
            roomTopicInput={roomTopicInput}
            handleCreate={handleCreate}
            handleJoin={handleJoin}
            updateRoomTopicInput={updateRoomTopicInput}
          />
        )}
        <StatusBar style="light" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
})

export default HomeScreen
