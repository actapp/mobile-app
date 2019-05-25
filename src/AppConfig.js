import { logOut } from './core/LogInInteractor'

export default AppConfig = {
    initialize: initializeConfiguration,

    // Authentication
    FORCE_LOGOUT: __DEV__,

    // Animation
    DEFAULT_ANIM_DURATION: duration(1000),
    animDuration: duration
}

/**
 * Run any custom initialization 
 */
function initializeConfiguration() {
    if (AppConfig.FORCE_LOGOUT) {
        logOut().then().catch(error => { console.log(error) })
    }
}

/**
 * Given a duration, will make it instantaneous if currently in DEV environment
 */
function duration(duration) {
    return (__DEV__) ? 1 : duration
}