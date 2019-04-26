import  { Platform } from 'react-native'
import Analytics from 'appcenter-analytics';

export const GENERIC_ERROR = 'GENERIC_ERROR'
export const AUTH_ERROR = 'AUTH_ERROR'
export const CONTACTS_ERROR = 'CONTACTS_ERROR'


export default function handleError(name = GENERIC_ERROR, error, params) {
    console.log('Handling error: ' + error)

    const errorHash = hashError(error)
    console.log('Generating error hash: ' + errorHash)

    Analytics.trackEvent(
        name,
        {
            ...params,
            errorId: errorHash,
            platform: Platform.OS
        }
    )
}

/**
 * Simple hash of stack string, provided by:
 * https://stackoverflow.com/a/7616484
 */
function hashError(error) {
    const stack = error.stack

    var hash = 0, i, chr;
    if (stack.length === 0) return hash;
    for (i = 0; i < stack.length; i++) {
        chr = stack.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }

    return hash;
};