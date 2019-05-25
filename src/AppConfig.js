export default {
    DEFAULT_ANIM_DURATION: duration(1000),
    animDuration: duration
}

/**
 * Given a duration, will make it instantaneous if currently in DEV environment
 */
function duration(duration) {
    return (__DEV__) ? 1 : duration
}