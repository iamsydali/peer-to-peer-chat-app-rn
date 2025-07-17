import React from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { colors, spacing, borderRadius } from '../theme'

const ChatInput = ({ 
  inputText, 
  setInputText, 
  handleSend 
}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.msgInput}
          placeholder="Send message to everyone"
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
          <MaterialIcons 
            name="send" 
            size={20} 
            color={inputText.trim() ? colors.text : colors.textTertiary} 
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
    fontSize: spacing.lg,
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

export default ChatInput 