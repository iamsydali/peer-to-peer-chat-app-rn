import React, { memo } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import * as Clipboard from 'expo-clipboard'
import { colors, spacing, typography } from '../theme'

const MessageListHeader = memo(({ roomTopic, peersCount }) => {
  const handleCopyTopic = async () => {
    try {
      await Clipboard.setStringAsync(roomTopic)
      Alert.alert('Success', 'Room topic copied to clipboard')
    } catch (error) {
      Alert.alert('Error', 'Failed to copy room topic')
    }
  }

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <View style={styles.topicContainer}>
          <Text style={styles.roomTitle} numberOfLines={1} ellipsizeMode="tail">
            {roomTopic}
          </Text>
          <TouchableOpacity onPress={handleCopyTopic} style={styles.copyButton}>
            <MaterialIcons name="content-copy" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
        <Text style={styles.memberCount}>
          {Math.max(1, peersCount)} member{Math.max(1, peersCount) !== 1 ? 's' : ''}
        </Text>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: spacing.xl,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: spacing.lg,
  },
  headerContent: {
    alignItems: 'center',
  },
  topicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    maxWidth: '100%',
  },
  roomTitle: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
    flex: 1,
  },
  copyButton: {
    padding: spacing.sm,
    marginLeft: spacing.sm,
  },
  memberCount: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
})

MessageListHeader.displayName = 'MessageListHeader'

export default MessageListHeader 