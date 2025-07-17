import React, { useRef, useEffect, useMemo } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import MessageItem from './MessageItem'
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

  // Memoize the data to prevent unnecessary re-renders
  const listData = useMemo(() => {
    const data = []
    
    // Add header with room info
    data.push({
      id: 'room_header',
      type: 'room_header',
      content: { roomTopic, peersCount }
    })
    
    // Add message data
    const messageData = messages.map((message, index) => ({
      id: `message_${message.timestamp}_${index}`,
      type: 'message',
      content: message,
      index
    }))
    
    data.push(...messageData)
    
    return data
  }, [messages, roomTopic, peersCount])

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'room_header':
        return (
          <View style={styles.headerContainer}>
            <View style={styles.headerContent}>
              <Text style={styles.roomTitle}>{item.content.roomTopic}</Text>
              <Text style={styles.memberCount}>
                {item.content.peersCount} member{item.content.peersCount !== 1 ? 's' : ''}
              </Text>
            </View>
          </View>
        )
      case 'message':
        return (
          <MessageItem 
            type="message" 
            content={item.content} 
            isLocal={item.content.local}
          />
        )
      default:
        return null
    }
  }

  return (
    <View style={styles.container}>
      <FlashList
        ref={flashListRef}
        data={listData}
        renderItem={renderItem}
        estimatedItemSize={70}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
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
  roomTitle: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  memberCount: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
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