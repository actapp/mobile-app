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
export const GET_ACCOUNT_ERROR = 'GET_ACCT_ERROR'
export const CREATE_MINISTRY_ERROR = 'CREATE_MINISTRY_ERROR'
export const GET_MINISTRY_ERROR = 'GET_MINISTRY_ERROR'

export const UNKNOWN_STATE_ERROR = 'UNKNOWN_STATE_ERROR'
export const UNKNOWN_ERROR = 'UNKNOWN_ERROR'

const breadcrumbs = []
export function logBreadcrumb(breadcrumb) {
    breadcrumbs.push(breadcrumb)
}

export default function handleError(name = GENERIC_ERROR, error, source) {
    console.log('Handling error: ' + name)

    StackTrace.fromError(error)
        .then(stack => {
            reportError(qualifiedErrorName(name, source), error.message, hashError(stackToStringArrays(stack)), stackToString(stack), collectBreadcrumbs())
        })
        .catch(stackError => {
            reportError(qualifiedErrorName(name, source), error.message, hashError(breadcrumbs), 'FAILED TO OBTAIN STACK!', collectBreadcrumbs())
        })

}

function qualifiedErrorName(errorName, source) {
    if (source) {
        return source + '/' + errorName
    }

    return errorName
}

function reportError(name, message, errorId, stack, breadcrumbs) {
    Analytics.trackEvent(
        name,
        {
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