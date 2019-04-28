import { Platform as PlatformRN } from 'react-native'

export default class Platform {
    static isIos = () => (PlatformRN.OS === 'ios')
    static isAndroid = () => (PlatformRN.OS === 'android')
}