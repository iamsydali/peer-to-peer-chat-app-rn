import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { colors, spacing, typography, borderRadius } from '../theme'

const WelcomeScreen = ({
  isCreating,
  isJoining,
  roomTopicInput,
  handleCreate,
  handleJoin,
  updateRoomTopicInput,
}) => {
  return (
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
  )
}

const styles = StyleSheet.create({
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
})

export default WelcomeScreen 