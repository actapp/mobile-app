import { Platform, StyleSheet } from 'react-native';

export const Colors = {
    primary: '#304ffe',
    grayedOut: '#aaaa'
}

export const PlatformFonts = {
    light: Platform.OS === 'ios' ? 'Arial' : 'sans-serif-light'
}

export const PlatformIcons = {
    name: (baseName) => {
        return ios() ? "ios-" + baseName : "md-" + baseName
    }
}

export const CommonStyles = {
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#000000',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        flexWrap: 'wrap',
        color: 'white'
    },

    primaryButton: {
        backgroundColor: Colors.primary
    },

    textInput: {
        borderColor: 'white',
        borderWidth: 1,
        padding: 10,
        color: 'white',
        fontSize: 16
    }
}

function ios() {
    return Platform.OS === 'ios'
}