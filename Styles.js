import { Platform, StyleSheet } from 'react-native';

export const PlatformFonts = {
    light: Platform.OS === 'ios' ? 'Arial' : 'sans-serif-light'
}