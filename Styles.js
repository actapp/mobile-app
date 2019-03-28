import { Platform, StyleSheet } from 'react-native';

export const Colors = {
    primary: '#304ffe'
}

export const PlatformFonts = {
    light: Platform.OS === 'ios' ? 'Arial' : 'sans-serif-light'
}

export const PlatformIcons = {
    name: (baseName) => {
        return ios() ? "ios-" + baseName : "md-" + baseName
    }
}

function ios() {
    return Platform.OS === 'ios'
}