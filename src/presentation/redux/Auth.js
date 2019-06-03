import { getCurrentUser, setAuthenticationListener, startPhoneLogIn, verifyCode } from '../../core/LogInInteractor'

import { actionCreator } from './util/Util'

function authReducer(state = {
    status: AuthStatus.NOT_READY,
    user: null
}, action) {
    if (!isAuthAction(action)) {
        return state
    }

    const newState = { ...state, status: action.type, error: null }

    switch (action.type) {
        case AuthStatus.LOGGED_OUT:
            return { ...newState, user: null }
        case AuthStatus.LOGGED_IN:
            return { ...newState, user: action.payload, confirmationResult: null }
        case AuthStatus.AWAITING_CODE:
            return { ...newState, confirmationResult: action.payload }
        case AuthStatus.ERROR:
            return { ...newState, error: action.payload }
        default:
            return newState
    }
}

function isAuthAction(action) {
    if (action && action.type) {
        return action.type.startsWith('auth/')
    }

    return false
}

/**
 * Synonymous w/ action types
 */
class AuthStatus {
    static NOT_READY = 'auth/not_ready'
    static LOGGED_IN = 'auth/logged_in'
    static LOGGING_IN = 'auth/logging_in'
    static LOGGED_OUT = 'auth/logged_out'
    static AWAITING_CODE = 'auth/awaiting_code'
    static VERIFYING_CODE = 'auth/verifying_code'
    static ERROR = 'auth/error'
}

/**
* Internally dispatched
*/
class InternalActions {
    static loggedOut = () => actionCreator(AuthStatus.LOGGED_OUT)
    static loggingIn = () => actionCreator(AuthStatus.LOGGING_IN)
    static loggedIn = (user) => actionCreator(AuthStatus.LOGGED_IN, user)
    static awaitingCode = (confirmationResult) => actionCreator(AuthStatus.AWAITING_CODE, confirmationResult)
    static verifyingCode = () => actionCreator(AuthStatus.VERIFYING_CODE)
    static error = (error) => actionCreator(AuthStatus.ERROR, error)
}

/**
* Externally dispatched
*/
class AuthActions {
    static listenForAuthChanges = _listenForAuthChanges
    static stopListeningForAuthChanges = _stopListeningForAuthChanges

    static startPhoneLogIn = (mdn) => {
        return function (dispatch) {
            dispatch(InternalActions.loggingIn())

            startPhoneLogIn(mdn)
                .then(confirmation => {
                    const currentUser = getCurrentUser()
                    if (currentUser && currentUser.uid) {
                        // Auto-verification occurred by Google, just assume now logged in
                        dispatch(InternalActions.loggedIn(currentUser))
                    } else {
                        dispatch(InternalActions.awaitingCode(confirmation))
                    }
                })
                .catch(error => {
                    dispatch(InternalActions.error(error))
                })
        }
    }

    static verifyCode = (code) => {
        return function (dispatch, getState) {
            dispatch(InternalActions.verifyingCode())

            const confirmation = getState().auth.confirmationResult

            verifyCode(code, confirmation)
                .then(user => {
                    dispatch(InternalActions.loggedIn(user))
                })
                .catch(error => {
                    dispatch(InternalActions.error(error))
                })
        }
    }
}

let unsubscribeFromAuth = null
function _listenForAuthChanges() {
    return function (dispatch, getState) {
        if (unsubscribeFromAuth) {
            // Ignore -- already listening globally for auths
            return
        }

        console.log(`Listening for auth changes...`)

        const listener = (user) => {
            console.log('Auth user changed: ' + user)

            if (user == null) {
                dispatch(InternalActions.loggedOut())
            } else if (user.uid !== getUidFromState(getState())) {
                dispatch(InternalActions.loggedIn(user))
            }
        }

        unsubscribeFromAuth = setAuthenticationListener(listener)
    }
}

function getUidFromState(state) {
    if (state.user != null) {
        return state.user.uid
    }

    return null
}

function _stopListeningForAuthChanges() {
    return function () {
        if (unsubscribeFromAuth != null) {
            unsubscribeFromAuth()
            unsubscribeFromAuth = null
        }
    }
}

export { authReducer, AuthStatus, AuthActions }