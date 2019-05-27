const config = {
    mockFirebase: true
}

export const firebase = config.mockFirebase ? require('./mocks/react-native-firebase').firebase : require('react-native-firebase')