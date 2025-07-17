import React, { memo } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors, spacing, borderRadius, typography } from '../theme'

const MessageItem = memo(({ type, content, isLocal }) => {
  if (type === 'message') {
    return (
      <View style={[styles.messageWrapper, isLocal && styles.localMessageWrapper]}>
        <View style={[styles.messageContainer, isLocal && styles.localMessage]}>
          <Text style={[styles.messageText, isLocal && styles.localMessageText]} selectable>
            {content.message}
          </Text>
          {content.timestamp && (
            <Text style={[styles.timestampText, isLocal && styles.localTimestampText]}>
              {new Date(content.timestamp).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </Text>
          )}
        </View>
      </View>
    )
  }

  return null
})

const styles = StyleSheet.create({
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  localMessageWrapper: {
    justifyContent: 'flex-end',
  },
  messageContainer: {
    maxWidth: '75%',
    backgroundColor: colors.remoteMessage,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.remoteMessageBorder,
  },
  localMessage: {
    backgroundColor: colors.localMessage,
    borderColor: colors.localMessageBorder,
  },
  messageText: {
    fontSize: typography.fontSize.lg,
    color: colors.text,
    lineHeight: typography.lineHeight.normal,
  },
  localMessageText: {
    color: colors.text,
  },
  timestampText: {
    fontSize: typography.fontSize.xs,
    color: colors.timestamp,
    marginTop: spacing.xs,
    textAlign: 'right',
  },
  localTimestampText: {
    color: colors.timestampLocal,
  },
})

// Add display name for debugging
MessageItem.displayName = 'MessageItem'

export default MessageItem 