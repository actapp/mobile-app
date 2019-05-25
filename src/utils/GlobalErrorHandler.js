import { Platform } from 'react-native'
import StackTrace from 'stacktrace-js'
import Analytics from 'appcenter-analytics';

export const GENERIC_ERROR = 'GENERIC_ERROR'
export const TIMEOUT_ERROR = 'TIMEOUT_ERROR'
export const AUTH_ERROR = 'AUTHENTICATION_ERROR'
export const CONTACTS_ERROR = 'CONTACTS_ERROR'
export const ADD_CONTACT_ERROR = 'ADD_CONTACT_ERROR'
export const UPDATE_CONTACT_ERROR = 'UPDATE_CONTACT_ERROR'
export const GET_STEPS_ERROR = 'GET_STEPS_ERROR'
export const GET_MINISTRY_STATUS_ERROR = 'GET_MINISTRY_STATUS_ERROR'
export const CHECK_ADMIN_ERROR = 'CHECK_ADMIN_ERROR'

export const ASSOCIATE_ACCOUNT_ERROR = 'ASSOCIATE_ACCT_ERROR'

const breadcrumbs = []
export function logBreadcrumb(breadcrumb) {
    breadcrumbs.push(breadcrumb)
}

export default function handleError(name = GENERIC_ERROR, error, params) {
    console.log('Handling error: ' + name)

    StackTrace.fromError(error)
        .then(stack => {
            reportError(name, error.message, params, hashError(stackToStringArrays(stack)), stackToString(stack), collectBreadcrumbs())
        })
        .catch(stackError => {
            reportError(name, error.message, params, hashError(breadcrumbs), 'FAILED TO OBTAIN STACK!', collectBreadcrumbs())
        })

}

function reportError(name, message, params, errorId, stack, breadcrumbs) {
    Analytics.trackEvent(
        name,
        {
            ...params,
            errorId: errorId,
            platform: Platform.OS,
            message: message,
            stack: stack,
            breadcrumbs: breadcrumbs
        }
    )
}

/**
 * Simple hash of stack string, provided by:
 * https://stackoverflow.com/a/7616484
 */
function hashError(stringArrays) {
    var hash = 0, i, chr;
    if (stringArrays.length === 0) return hash;
    for (i = 0; i < stringArrays.length; i++) {
        chr = stringArrays[i].charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }

    return hash;
};

function stackToStringArrays(stackFrames) {
    return stackFrames.map((frame) => {
        return frame.toString()
    })
}

function stackToString(stackFrames) {
    const stringifiedStack = stackToStringArrays(stackFrames).join('\n');

    console.log(stringifiedStack);

    return stringifiedStack
};

function collectBreadcrumbs() {
    const stringifiedBreadcrumbs = breadcrumbs.join('\n')

    // Clear breadcrumbs
    breadcrumbs.length = 0

    console.log(stringifiedBreadcrumbs)

    return stringifiedBreadcrumbs
}