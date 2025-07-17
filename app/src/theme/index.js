// Theme configuration for PearChat
export const colors = {
  // Background colors
  background: '#1a1a1a',
  surface: '#2a2a2a',
  surfaceVariant: '#333',
  
  // Text colors
  text: '#fff',
  textSecondary: '#888',
  textTertiary: '#666',
  placeholder: '#666',
  
  // Primary colors
  primary: '#007AFF',
  primaryDark: '#0056CC',
  
  // Message colors
  localMessage: '#007AFF',
  localMessageBorder: '#0056CC',
  remoteMessage: '#2a2a2a',
  remoteMessageBorder: '#333',
  
  // Input colors
  inputBackground: '#2a2a2a',
  inputBorder: '#333',
  
  // Button colors
  buttonPrimary: '#007AFF',
  buttonDisabled: '#333',
  buttonText: '#fff',
  
  // Border colors
  border: '#333',
  
  // Timestamp colors
  timestamp: '#888',
  timestampLocal: 'rgba(255, 255, 255, 0.7)',
  
  // Status colors
  success: '#34C759',
  error: '#FF3B30',
  warning: '#FF9500',
}

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
}

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 18,
  xxl: 20,
  round: 50,
}

export const typography = {
  // Font sizes
  fontSize: {
    xs: 11,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
    xxxl: 24,
    huge: 28,
  },
  
  // Font weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  // Line heights
  lineHeight: {
    tight: 16,
    normal: 20,
    relaxed: 22,
    loose: 24,
  },
}

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
}

export const theme = {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
}

export default theme 