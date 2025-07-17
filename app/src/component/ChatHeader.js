import React, { memo } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import * as Clipboard from 'expo-clipboard'
import { useRoom } from '../hook/useRedux'
import { colors, spacing, typography } from '../theme'

const ChatHeader = memo(({ onExit }) => {
  const { roomTopic, peersCount } = useRoom()

  const handleCopyTopic = async () => {
    try {
      await Clipboard.setStringAsync(roomTopic)
      Alert.alert('Success', 'Room topic copied to clipboard')
    } catch (error) {
      Alert.alert('Error', 'Failed to copy room topic')
    }
  }

  const handleExit = () => {
    Alert.alert(
      'Leave Chat',
      'Are you sure you want to leave this chat?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Leave',
          onPress: onExit,
          style: 'destructive',
        },
      ],
      { cancelable: true }
    )
  }

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <TouchableOpacity 
          onPress={handleExit} 
          style={styles.exitButton}
        >
          <MaterialIcons 
            name="arrow-back" 
            size={24} 
            color={colors.textSecondary} 
          />
        </TouchableOpacity>
        <Text style={styles.roomTitle} numberOfLines={1} ellipsizeMode="tail">
          {roomTopic}
        </Text>
        <TouchableOpacity onPress={handleCopyTopic} style={styles.copyButton}>
          <MaterialIcons 
            name="content-copy" 
            size={20} 
            color={colors.textSecondary} 
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.memberCount}>
        {Math.max(1, peersCount)} member{Math.max(1, peersCount) !== 1 ? 's' : ''}
      </Text>
    </View>
  )
})

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: spacing.xl,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerContent: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  exitButton: {
    padding: spacing.sm,
  },
  roomTitle: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
    flex: 1,
    textAlign: 'center',
  },
  copyButton: {
    padding: spacing.sm,
  },
  memberCount: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    alignSelf: 'center'
  },
})

ChatHeader.displayName = 'ChatHeader'

export default ChatHeader 