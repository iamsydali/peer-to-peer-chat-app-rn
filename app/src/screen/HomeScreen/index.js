import { useState, useCallback } from'react'
import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import { useBackend } from '../../component/BareProvider'
import { useMessages, useRoom } from '../../hook/useRedux'
import MessageList from '../../component/MessageList'
import { colors, spacing, borderRadius, typography } from '../../theme'

export const HomeScreen = () => {
  const backend = useBackend()
  const [inputText, setInputText] = useState('')
  
  // Redux state
  const { 
    messages, 
    addMessage
  } = useMessages()
  
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
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
        {isConnected ? (
          <View style={styles.chatContainer}>
            <View style={styles.messageListContainer}>
              <MessageList
                messages={messages}
                roomTopic={roomTopic}
                peersCount={peersCount}
              />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.msgInput}
                  placeholder="Type a message..."
                  placeholderTextColor={colors.placeholder}
                  value={inputText}
                  onChangeText={setInputText}
                  multiline
                  maxLength={1000}
                />
                <TouchableOpacity 
                  style={[styles.sendButton, inputText.trim() ? styles.sendButtonActive : styles.sendButtonInactive]} 
                  onPress={handleSend}
                  disabled={!inputText.trim()}
                >
                  <MaterialIcons name="send" size={20} color={inputText.trim() ? colors.text : colors.textTertiary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.welcomeContainer}>
            <View style={styles.welcomeContent}>
              <Text style={styles.welcomeTitle}>Welcome to PearChat</Text>
              <Text style={styles.welcomeSubtitle}>A few steps below to help you getting started.</Text>
              
              <TouchableOpacity 
                style={[styles.actionButton, isCreating && styles.buttonDisabled]} 
                onPress={handleCreate}
                disabled={isCreating}
              >
                <MaterialIcons name="group-add" size={20} color={colors.buttonText} style={styles.buttonIcon} />
                <Text style={styles.buttonText}>{isCreating ? 'Creating...' : 'Create group chat'}</Text>
              </TouchableOpacity>
              
              <View style={styles.joinContainer}>
                <TextInput 
                  value={roomTopicInput} 
                  onChangeText={updateRoomTopicInput} 
                  style={styles.joinInput} 
                  placeholder="Enter room topic"
                  placeholderTextColor={colors.placeholder}
                />
                <TouchableOpacity 
                  style={[styles.actionButton, isJoining && styles.buttonDisabled]} 
                  onPress={handleJoin}
                  disabled={isJoining}
                >
                  <MaterialIcons name="login" size={20} color={colors.buttonText} style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>{isJoining ? 'Joining...' : 'Join group chat'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
  chatContainer: {
    flex: 1,
  },
  messageListContainer: {
    flex: 1,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  welcomeContent: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: typography.fontSize.huge,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: typography.fontSize.lg,
    color: colors.textSecondary,
    marginBottom: spacing.huge,
    textAlign: 'center',
    lineHeight: typography.lineHeight.relaxed,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.buttonPrimary,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
    width: '100%',
  },
  buttonIcon: {
    marginRight: spacing.sm,
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
  },
  buttonDisabled: {
    backgroundColor: colors.buttonDisabled,
  },
  joinContainer: {
    width: '100%',
    marginTop: spacing.xl,
  },
  joinInput: {
    backgroundColor: colors.inputBackground,
    color: colors.text,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    fontSize: typography.fontSize.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.inputBorder,
  },
  inputContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: colors.inputBackground,
    borderRadius: spacing.xl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.inputBorder,
  },
  msgInput: {
    flex: 1,
    color: colors.text,
    fontSize: typography.fontSize.lg,
    maxHeight: 100,
    paddingVertical: spacing.sm,
    paddingRight: spacing.md,
  },
  sendButton: {
    padding: spacing.sm,
    borderRadius: spacing.lg,
    marginLeft: spacing.sm,
  },
  sendButtonActive: {
    backgroundColor: colors.primary,
  },
  sendButtonInactive: {
    backgroundColor: 'transparent',
  },
})

export default HomeScreen
