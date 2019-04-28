import Platform from '../../utils/Platform'

export const PlatformIcons = {
    name: (baseName) => {
        return Platform.isIos() ? "ios-" + baseName : "md-" + baseName
    }
}