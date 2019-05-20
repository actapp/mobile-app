import { Platform as PlatformRN } from 'react-native'

export default {
    isIos: () => (PlatformRN.OS === 'ios'),
    isAndroid: () => (PlatformRN.OS === 'android')
}