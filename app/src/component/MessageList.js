import React, { useRef, useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import MessageItem from './MessageItem'
import MessageListHeader from './MessageListHeader'
import { colors, spacing, typography } from '../theme'

const MessageList = ({ 
  messages, 
  roomTopic, 
  peersCount
}) => {
  const flashListRef = useRef(null)
  const shouldAutoScroll = useRef(true)

  // Auto-scroll to bottom when new messages arrive (only if user is at bottom)
  useEffect(() => {
    if (messages.length > 0 && flashListRef.current && shouldAutoScroll.current) {
      setTimeout(() => {
        flashListRef.current?.scrollToEnd({ animated: true })
      }, 100)
    }
  }, [messages.length])

  const renderItem = ({ item }) => {
    return (
      <MessageItem 
        type="message" 
        content={item} 
        isLocal={item.local}
      />
    )
  }

  return (
    <View style={styles.container}>
      <FlashList
        ref={flashListRef}
        data={messages}
        renderItem={renderItem}
        estimatedItemSize={70}
        keyExtractor={(item, index) => `message_${item.timestamp}_${index}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <MessageListHeader 
            roomTopic={roomTopic}
            peersCount={peersCount}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No messages yet</Text>
            <Text style={styles.emptySubtext}>Start a conversation!</Text>
          </View>
        }
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.sm,
  },
  emptySubtext: {
    color: colors.textTertiary,
    fontSize: typography.fontSize.md,
  },
})

export default React.memo(MessageList) 