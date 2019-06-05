import { getCurrentUser, setAuthenticationListener, startPhoneLogIn, verifyCode } from '../../core/LogInInteractor'

export default class LogInRedux {
    static reducer = (state = {
        logInState: LogInState.LOGGED_OUT,
        user: null,
        hasCheckedAuth: false,
        error: null,
        confirmation: null,
    }, action) => {
        if (!LogInRedux.isLogInAction(action)) {
            return state
        }

        const newState = { ...state, logInState: action.type, confirmation: null, error: null }

        switch (newState.logInState) {
            case LogInState.LOGGED_IN:
                return { ...newState, user: action.payload, hasCheckedAuth: true }
            case LogInState.LOGGED_OUT:
                return { ...newState, user: null, hasCheckedAuth: true }
            case LogInState.AWAITING_FIRST_AUTH_STATUS:
                return { ...newState, hasCheckedAuth: false }
            case LogInState.AWAITING_CODE:
                return { ...newState, confirmation: action.payload }
            case LogInState.LOG_IN_ERROR:
                return { ...newState, error: action.payload, hasCheckedAuth: true }
            default:
                return newState
        }
    }

    static isLogInAction = (action) => {
        return action.type.startsWith(LogInState.LOG_IN_PREFIX)
    }
}

export class LogInState {
    static LOG_IN_PREFIX = `log_in`

    static LOGGED_OUT = `${LogInState.LOG_IN_PREFIX}/logged_out`
    static LOGGING_IN = `${LogInState.LOG_IN_PREFIX}/logging_in`
    static LOGGED_IN = `${LogInState.LOG_IN_PREFIX}/logged_in`
    static AWAITING_FIRST_AUTH_STATUS = `${LogInState.LOG_IN_PREFIX}/checking_log_in`
    static AWAITING_CODE = `${LogInState.LOG_IN_PREFIX}/awaiting_code`
    static VERIFYING_CODE = `${LogInState.LOG_IN_PREFIX}/verifying_code`
    static LOG_IN_ERROR = `${LogInState.LOG_IN_PREFIX}/log_in_error`
}

let unsubscribeFromAuth = null

export class LogInActions {
    static checkForLogIn = () => {
        return function (dispatch) {
            console.log("Checking for log-in")
            const currentUser = getCurrentUser()

            if (currentUser !== null) {
                dispatch(LogInActions.loggedIn(currentUser))
            } else {
                dispatch(LogInActions.loggedOut())
            }
        }
    }

    static listenForAuthChanges = () => {
        return function (dispatch, getState) {
            if (unsubscribeFromAuth) {
                // Ignore -- already listening globally for auths
                return
            }

            console.log(`Listening for auth changes...`)

            const listener = (user) => {
                if (user == null) {
                    dispatch(LogInActions.loggedOut())
                } 
                
                else if (user.uid !== getState().uid) {
                    dispatch(LogInActions.loggedIn(user))
                }
            }

            dispatch(LogInActions.awaitingFirstAuthStatus())

            unsubscribeFromAuth = setAuthenticationListener(listener)
        }
    }

    static stopListeningForAuthChanges = () => {
        return function () {
            if (unsubscribeFromAuth != null) {
                unsubscribeFromAuth()
            }
        }
    }

    static awaitingFirstAuthStatus = () => ({
        type: LogInState.AWAITING_FIRST_AUTH_STATUS
    })

    static startPhoneLogIn = (mdn) => {
        return function (dispatch) {
            dispatch(LogInActions.loggingIn())

            startPhoneLogIn(mdn)
                .then(confirmation => {
                    const currentUser = getCurrentUser()
                    if (currentUser && currentUser.uid) {
                        // Auto-verification occurred by Google, just assume now logged in
                        dispatch(LogInActions.loggedIn(currentUser))
                    } else {
                        dispatch(LogInActions.awaitingCode(confirmation))
                    }
                })
                .catch(error => {
                    dispatch(LogInActions.logInError(error))
                })
        }
    }

    static verifyCode = (code, confirmation) => {
        return function (dispatch) {
            console.log(JSON.stringify(confirmation))

            dispatch(LogInActions.verifyingCode())

            verifyCode(code, confirmation)
                .then(user => {
                    dispatch(LogInActions.loggedIn(user))
                })
                .catch(error => {
                    dispatch(LogInActions.logInError(error))
                })
        }
    }

    static verifyingCode = () => ({
        type: LogInState.VERIFYING_CODE
    })

    static awaitingCode = (confirmation) => ({
        type: LogInState.AWAITING_CODE,
        payload: confirmation
    })

    static loggingIn = () => ({
        type: LogInState.LOGGING_IN
    })

    static loggedIn = (user) => {
        return {
            type: LogInState.LOGGED_IN,
            payload: user
        }
    }

    static loggedOut = () => {
        return {
            type: LogInState.LOGGED_OUT
        }
    }

    static logInError = (error) => ({
        type: LogInState.LOG_IN_ERROR,
        payload: error
    })
}