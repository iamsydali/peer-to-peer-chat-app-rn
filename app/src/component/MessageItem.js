import React, { memo } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const MessageItem = memo(({ type, content, isLocal }) => {
  if (type === 'header') {
    return (
      <Text style={styles.headerText} selectable>
        Topic: {content}
      </Text>
    )
  }

  if (type === 'peers') {
    return (
      <Text style={styles.peersText}>
        Peers: {content}
      </Text>
    )
  }

  if (type === 'message') {
    return (
      <View style={[styles.messageContainer, isLocal && styles.localMessage]}>
        <Text style={styles.memberText}>
          {content?.memberId ?? 'You'}
        </Text>
        <Text style={styles.messageText} selectable>
          {content.message}
        </Text>
        {content.timestamp && (
          <Text style={styles.timestampText}>
            {new Date(content.timestamp).toLocaleTimeString()}
          </Text>
        )}
      </View>
    )
  }

  return null
})

const styles = StyleSheet.create({
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  peersText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  messageContainer: {
    padding: 12,
    marginVertical: 2,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    alignSelf: 'flex-start',
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  localMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  memberText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 20,
  },
  timestampText: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
    textAlign: 'right',
  },
})

// Add display name for debugging
MessageItem.displayName = 'MessageItem'

export default MessageItem 