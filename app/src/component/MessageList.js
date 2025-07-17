import React, { useRef, useEffect, useMemo } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import MessageItem from './MessageItem'

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
    
    // Add header data
    data.push(
      { id: 'topic', type: 'header', content: roomTopic },
      { id: 'peers', type: 'peers', content: peersCount }
    )
    
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
      case 'header':
        return (
          <View style={styles.headerItem}>
            <MessageItem type="header" content={item.content} />
          </View>
        )
      case 'peers':
        return (
          <View style={styles.headerItem}>
            <MessageItem type="peers" content={item.content} />
          </View>
        )
      case 'message':
        return (
          <View style={styles.messageItem}>
            <MessageItem 
              type="message" 
              content={item.content} 
              isLocal={item.content.local}
            />
          </View>
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
        showsVerticalScrollIndicator={true}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No messages yet</Text>
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
    paddingVertical: 10,
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
  headerItem: {
    marginBottom: 8,
  },
  messageItem: {
    marginBottom: 5,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
  },
})

export default React.memo(MessageList) 